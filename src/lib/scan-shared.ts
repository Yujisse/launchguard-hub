// Client-safe helpers shared between the scanner and the UI.

export const SEVERITY_ORDER = ["critico", "alto", "medio", "baixo", "info", "nao_verificado"] as const;
export type Severity = (typeof SEVERITY_ORDER)[number];

export const SEVERITY_LABEL: Record<Severity, string> = {
  critico: "Crítico",
  alto: "Alto",
  medio: "Médio",
  baixo: "Baixo",
  info: "Informação",
  nao_verificado: "Não foi possível verificar",
};

export const SEVERITY_CLASS: Record<Severity, string> = {
  critico: "border-critical/40 bg-critical/10 text-critical",
  alto: "border-warning/40 bg-warning/10 text-warning",
  medio: "border-info/40 bg-info/10 text-info",
  baixo: "border-border-subtle bg-elevated text-muted-foreground",
  info: "border-border-subtle bg-elevated text-muted-foreground",
  nao_verificado: "border-border-subtle bg-elevated text-muted-foreground",
};

export const CATEGORY_LABEL: Record<string, string> = {
  security: "Segurança e segredos",
  auth_database: "Autenticação e banco de dados",
  payments: "Pagamentos e planos",
  flows: "Fluxos e funcionalidades",
  mobile_performance: "Mobile e desempenho",
  legal_observability: "Legal e observabilidade",
};

export const BUILDERS = [
  { value: "lovable", label: "Lovable" },
  { value: "bolt", label: "Bolt" },
  { value: "base44", label: "Base44" },
  { value: "replit", label: "Replit" },
  { value: "cursor", label: "Cursor" },
  { value: "outro", label: "Outro" },
] as const;

export function verdictFor(score: number): string {
  if (score < 50) return "Não está pronto";
  if (score < 70) return "Risco alto";
  if (score < 85) return "Quase pronto";
  if (score < 95) return "Pronto para testes finais";
  return "Verificações essenciais aprovadas";
}

export function verdictClass(verdict: string | null): string {
  switch (verdict) {
    case "Não está pronto":
      return "text-critical";
    case "Risco alto":
      return "text-warning";
    case "Quase pronto":
      return "text-info";
    default:
      return "text-primary";
  }
}

export function normalizeUrlInput(value: string): string {
  const v = value.trim();
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

/** Rejects non-public destinations (SSRF defence). Returns an error message or null. */
export function validatePublicUrl(raw: string): string | null {
  let u: URL;
  try {
    u = new URL(normalizeUrlInput(raw));
  } catch {
    return "Endereço inválido.";
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return "Use apenas http ou https.";
  const host = u.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (!host.includes(".") && !host.includes(":")) return "Informe um domínio público válido.";
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host === "metadata.google.internal"
  ) {
    return "Endereços internos não podem ser analisados.";
  }
  // IPv4 literals
  const m = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    if (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127) ||
      a >= 224
    ) {
      return "Endereços internos ou privados não podem ser analisados.";
    }
  }
  // IPv6 literals: only allow nothing (too risky to resolve here)
  if (host.includes(":")) return "Endereços IPv6 diretos não são analisados nesta versão.";
  return null;
}
