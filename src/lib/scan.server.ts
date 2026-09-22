// Server-only passive URL checks. No invasive testing: GET/HEAD requests only.
import { validatePublicUrl, normalizeUrlInput, type Severity } from "./scan-shared";

export type RawFinding = {
  check_code: string;
  category: string;
  severity: Severity;
  title: string;
  summary: string;
  safe_evidence?: string | null;
  impact?: string | null;
  remediation?: string | null;
  affected_resource?: string | null;
  confidence?: string;
};

const TIMEOUT_MS = 12_000;
const MAX_REDIRECTS = 5;
const MAX_BYTES = 1_500_000;
const MAX_LINK_CHECKS = 10;

async function timedFetch(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      ...init,
      redirect: "manual",
      signal: controller.signal,
      headers: { "user-agent": "LancappBot/1.0 (+https://lancapp.com.br)", accept: "text/html,*/*" },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function readLimited(response: Response): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let total = 0;
  let out = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BYTES) {
      await reader.cancel();
      break;
    }
    out += decoder.decode(value, { stream: true });
  }
  return out;
}

export type ScanOutcome = {
  findings: RawFinding[];
  score: number;
  finalUrl: string | null;
  failure?: string;
};

const SEVERITY_WEIGHT: Partial<Record<Severity, number>> = {
  critico: 20,
  alto: 10,
  medio: 5,
  baixo: 2,
};

const UNVERIFIABLE: RawFinding[] = [
  {
    check_code: "code_access_required",
    category: "security",
    severity: "nao_verificado",
    title: "Segredos e configuração do código-fonte",
    summary:
      "Esta verificação exige acesso autorizado ao repositório. Nada foi aprovado nem reprovado.",
    remediation: "Conecte um repositório autorizado em uma próxima etapa para habilitar esta análise.",
  },
  {
    check_code: "database_access_required",
    category: "auth_database",
    severity: "nao_verificado",
    title: "Regras de acesso ao banco de dados (RLS)",
    summary:
      "Sem acesso autorizado ao banco de dados não é possível confirmar as regras de acesso das tabelas.",
    remediation: "Conecte o banco de dados com autorização explícita para habilitar esta análise.",
  },
  {
    check_code: "payments_access_required",
    category: "payments",
    severity: "nao_verificado",
    title: "Pagamentos, planos e webhooks",
    summary:
      "A verificação de cobrança depende do código e das credenciais do provedor de pagamento.",
    remediation: "Disponível quando a análise de código autorizada estiver ativa.",
  },
];

export async function runPassiveScan(inputUrl: string): Promise<ScanOutcome> {
  const invalid = validatePublicUrl(inputUrl);
  if (invalid) return { findings: [], score: 0, finalUrl: null, failure: invalid };

  const startUrl = normalizeUrlInput(inputUrl);
  const findings: RawFinding[] = [];
  const chain: string[] = [];
  let current = startUrl;
  let response: Response | null = null;

  try {
    for (let i = 0; i <= MAX_REDIRECTS; i++) {
      chain.push(current);
      const res = await timedFetch(current, { method: "GET" });
      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get("location");
        if (!location) {
          response = res;
          break;
        }
        const next = new URL(location, current).toString();
        const bad = validatePublicUrl(next);
        if (bad) {
          return {
            findings: [],
            score: 0,
            finalUrl: current,
            failure: `O endereço redirecionou para um destino não permitido. ${bad}`,
          };
        }
        if (i === MAX_REDIRECTS) {
          return {
            findings: [],
            score: 0,
            finalUrl: current,
            failure: "Muitos redirecionamentos. A análise foi interrompida por segurança.",
          };
        }
        current = next;
        continue;
      }
      response = res;
      break;
    }
  } catch (e) {
    const msg = e instanceof Error && e.name === "AbortError"
      ? "O site não respondeu dentro do tempo limite."
      : "Não conseguimos conectar ao endereço informado.";
    return { findings: [], score: 0, finalUrl: null, failure: msg };
  }

  if (!response) {
    return { findings: [], score: 0, finalUrl: null, failure: "Não houve resposta do endereço informado." };
  }

  const finalUrl = current;
  const finalIsHttps = new URL(finalUrl).protocol === "https:";

  // 1. Disponibilidade e código de resposta
  if (response.status >= 500) {
    findings.push({
      check_code: "http_status_5xx",
      category: "flows",
      severity: "critico",
      title: `O site respondeu com erro ${response.status}`,
      summary: "A página inicial retornou um erro de servidor no momento da verificação.",
      safe_evidence: `HTTP ${response.status} em ${finalUrl}`,
      impact: "Visitantes podem encontrar o site fora do ar.",
      remediation: "Verifique os registros do servidor e corrija a falha antes de divulgar o endereço.",
      affected_resource: finalUrl,
    });
  } else if (response.status >= 400) {
    findings.push({
      check_code: "http_status_4xx",
      category: "flows",
      severity: "alto",
      title: `O site respondeu com ${response.status}`,
      summary: "A página inicial não retornou uma resposta de sucesso.",
      safe_evidence: `HTTP ${response.status} em ${finalUrl}`,
      impact: "O endereço público pode estar incorreto ou protegido.",
      remediation: "Confirme se este é o endereço público correto do projeto.",
      affected_resource: finalUrl,
    });
  } else {
    findings.push({
      check_code: "http_status_ok",
      category: "flows",
      severity: "info",
      title: "Site disponível",
      summary: `A página inicial respondeu com HTTP ${response.status}.`,
      safe_evidence: `HTTP ${response.status} em ${finalUrl}`,
    });
  }

  // 2. HTTPS
  if (!finalIsHttps) {
    findings.push({
      check_code: "no_https",
      category: "security",
      severity: "critico",
      title: "O site não usa HTTPS",
      summary: "A conexão final foi feita em HTTP, sem criptografia.",
      safe_evidence: finalUrl,
      impact: "Dados enviados pelos usuários podem ser lidos ou alterados no caminho.",
      remediation: "Ative um certificado TLS e redirecione todo o tráfego HTTP para HTTPS.",
      affected_resource: finalUrl,
    });
  }

  // 3. Redirecionamentos
  if (chain.length > 1) {
    findings.push({
      check_code: "redirect_chain",
      category: "mobile_performance",
      severity: chain.length > 3 ? "baixo" : "info",
      title: `Foram seguidos ${chain.length - 1} redirecionamento(s)`,
      summary: "Cadeia de redirecionamentos observada até chegar à página final.",
      safe_evidence: chain.join(" → "),
      remediation:
        chain.length > 3
          ? "Reduza a cadeia de redirecionamentos para acelerar o primeiro carregamento."
          : null,
    });
  }

  // 4. Cabeçalhos de segurança
  const h = response.headers;
  const headerChecks: {
    code: string;
    name: string;
    present: boolean;
    severity: Severity;
    title: string;
    why: string;
    fix: string;
  }[] = [
    {
      code: "header_hsts",
      name: "Strict-Transport-Security",
      present: !!h.get("strict-transport-security"),
      severity: finalIsHttps ? "medio" : "alto",
      title: "Sem HSTS (Strict-Transport-Security)",
      why: "Sem esse cabeçalho, o navegador pode tentar acessar o site por HTTP antes de ser redirecionado.",
      fix: "Envie Strict-Transport-Security: max-age=31536000; includeSubDomains.",
    },
    {
      code: "header_csp",
      name: "Content-Security-Policy",
      present: !!h.get("content-security-policy"),
      severity: "medio",
      title: "Sem Content-Security-Policy",
      why: "Essa política limita de onde scripts podem ser carregados, reduzindo o risco de injeção de código.",
      fix: "Defina uma Content-Security-Policy começando por default-src 'self'.",
    },
    {
      code: "header_xcto",
      name: "X-Content-Type-Options",
      present: !!h.get("x-content-type-options"),
      severity: "baixo",
      title: "Sem X-Content-Type-Options",
      why: "O navegador pode interpretar arquivos com um tipo diferente do declarado.",
      fix: "Envie X-Content-Type-Options: nosniff.",
    },
    {
      code: "header_referrer",
      name: "Referrer-Policy",
      present: !!h.get("referrer-policy"),
      severity: "baixo",
      title: "Sem Referrer-Policy",
      why: "Endereços internos podem vazar para sites externos na navegação.",
      fix: "Envie Referrer-Policy: strict-origin-when-cross-origin.",
    },
    {
      code: "header_frame",
      name: "Proteção contra enquadramento",
      present:
        !!h.get("x-frame-options") ||
        (h.get("content-security-policy") ?? "").includes("frame-ancestors"),
      severity: "medio",
      title: "Sem proteção contra enquadramento (clickjacking)",
      why: "Seu site pode ser embutido em outra página para enganar usuários.",
      fix: "Envie X-Frame-Options: DENY ou defina frame-ancestors na CSP.",
    },
  ];

  for (const c of headerChecks) {
    if (c.present) {
      findings.push({
        check_code: `${c.code}_ok`,
        category: "security",
        severity: "info",
        title: `${c.name} configurado`,
        summary: "O cabeçalho foi encontrado na resposta.",
        safe_evidence: c.name,
      });
    } else {
      findings.push({
        check_code: c.code,
        category: "security",
        severity: c.severity,
        title: c.title,
        summary: `O cabeçalho ${c.name} não foi encontrado na resposta da página inicial.`,
        safe_evidence: `${c.name}: ausente`,
        impact: c.why,
        remediation: c.fix,
        affected_resource: finalUrl,
      });
    }
  }

  // Cookies sem flags seguras
  const setCookie = h.get("set-cookie");
  if (setCookie) {
    const missing: string[] = [];
    if (!/;\s*secure/i.test(setCookie)) missing.push("Secure");
    if (!/;\s*httponly/i.test(setCookie)) missing.push("HttpOnly");
    if (missing.length) {
      findings.push({
        check_code: "cookie_flags",
        category: "security",
        severity: "medio",
        title: `Cookie sem ${missing.join(" e ")}`,
        summary: "Um cookie enviado pela página inicial não usa todos os atributos de proteção.",
        safe_evidence: `Atributos ausentes: ${missing.join(", ")}`,
        impact: "Cookies de sessão podem ser lidos por scripts ou trafegar sem criptografia.",
        remediation: "Defina os atributos Secure, HttpOnly e SameSite nos cookies de sessão.",
        affected_resource: finalUrl,
      });
    }
  }

  // 5. Conteúdo: viewport mobile e links internos quebrados
  const contentType = h.get("content-type") ?? "";
  if (contentType.includes("text/html") && response.status < 400) {
    const html = await readLimited(response);

    if (!/<meta[^>]+name=["']viewport["']/i.test(html)) {
      findings.push({
        check_code: "no_viewport",
        category: "mobile_performance",
        severity: "medio",
        title: "Sem meta viewport",
        summary: "A página inicial não declara a meta tag viewport.",
        impact: "O site pode ficar desproporcional em celulares.",
        remediation:
          'Adicione <meta name="viewport" content="width=device-width, initial-scale=1" /> ao HTML.',
        affected_resource: finalUrl,
      });
    }

    if (finalIsHttps) {
      const mixed = html.match(/(?:src|href)=["']http:\/\/[^"']+/gi) ?? [];
      if (mixed.length) {
        findings.push({
          check_code: "mixed_content",
          category: "security",
          severity: "alto",
          title: "Conteúdo misto (recursos em HTTP)",
          summary: `Foram encontradas ${mixed.length} referência(s) a recursos sem HTTPS.`,
          safe_evidence: mixed.slice(0, 3).join("\n"),
          impact: "Navegadores podem bloquear esses recursos e a página pode quebrar.",
          remediation: "Atualize essas referências para HTTPS.",
          affected_resource: finalUrl,
        });
      }
    }

    // Links internos
    const origin = new URL(finalUrl).origin;
    const hrefs = [...html.matchAll(/href=["']([^"'#]+)["']/gi)]
      .map((m) => m[1]!)
      .filter((href) => !/^(mailto:|tel:|javascript:|data:)/i.test(href));
    const internal = [
      ...new Set(
        hrefs
          .map((href) => {
            try {
              return new URL(href, finalUrl).toString();
            } catch {
              return null;
            }
          })
          .filter((u): u is string => !!u && u.startsWith(origin) && u !== finalUrl),
      ),
    ].slice(0, MAX_LINK_CHECKS);

    const broken: string[] = [];
    for (const link of internal) {
      try {
        const res = await timedFetch(link, { method: "GET" });
        if (res.status >= 400) broken.push(`${res.status} — ${link}`);
        await res.body?.cancel();
      } catch {
        broken.push(`sem resposta — ${link}`);
      }
    }

    if (internal.length === 0) {
      findings.push({
        check_code: "links_none",
        category: "flows",
        severity: "info",
        title: "Nenhum link interno encontrado para verificar",
        summary: "A página inicial não expôs links internos analisáveis nesta versão.",
      });
    } else if (broken.length) {
      findings.push({
        check_code: "broken_links",
        category: "flows",
        severity: "alto",
        title: `${broken.length} link(s) interno(s) com erro`,
        summary: `Foram verificados ${internal.length} links internos da página inicial.`,
        safe_evidence: broken.slice(0, 5).join("\n"),
        impact: "Visitantes podem chegar a páginas quebradas.",
        remediation: "Corrija ou remova esses links.",
        affected_resource: finalUrl,
      });
    } else {
      findings.push({
        check_code: "links_ok",
        category: "flows",
        severity: "info",
        title: `${internal.length} link(s) interno(s) verificados sem erro`,
        summary: "Nenhum problema desta categoria foi encontrado nas verificações realizadas.",
      });
    }

    // Páginas legais (apenas indício a partir dos links da home)
    const legalHit = hrefs.some((href) => /(termos|terms|privacidade|privacy)/i.test(href));
    if (!legalHit) {
      findings.push({
        check_code: "legal_links_missing",
        category: "legal_observability",
        severity: "medio",
        title: "Não encontramos links para termos ou privacidade",
        summary: "A página inicial não apresenta links visíveis para termos de uso ou política de privacidade.",
        impact: "Além de afetar a confiança, isso pode gerar problemas de conformidade.",
        remediation: "Publique e vincule as páginas de termos de uso e política de privacidade.",
        affected_resource: finalUrl,
      });
    }
  } else {
    await response.body?.cancel();
  }

  findings.push(...UNVERIFIABLE);

  let score = 100;
  for (const f of findings) score -= SEVERITY_WEIGHT[f.severity] ?? 0;
  score = Math.max(0, Math.min(100, score));

  return { findings, score, finalUrl };
}
