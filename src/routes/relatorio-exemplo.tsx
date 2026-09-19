import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/landing/PageShell";
import { ReportPreviewSection } from "@/components/landing/sections";

const title = "Relatório de exemplo";
const description =
  "Veja o formato do diagnóstico da Lançapp: score de prontidão, veredito honesto, notas por categoria e achados priorizados.";

export const Route = createFileRoute("/relatorio-exemplo")({
  head: () => ({
    meta: [
      { title: `${title} — Lançapp` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — Lançapp` },
      { property: "og:description", content: description },
    ],
  }),
  component: Page,
});

const findings = [
  {
    severity: "Crítico",
    tone: "text-critical border-critical/40 bg-critical/10",
    title: "Chave de serviço visível no front-end",
    summary:
      "Uma credencial administrativa aparece no código entregue ao navegador. Quem abrir o site consegue copiá-la.",
  },
  {
    severity: "Crítico",
    tone: "text-critical border-critical/40 bg-critical/10",
    title: "Webhook de pagamento sem verificação de assinatura",
    summary:
      "O acesso pago é liberado sem confirmar que a notificação veio mesmo do provedor de pagamento.",
  },
  {
    severity: "Alto",
    tone: "text-warning border-warning/40 bg-warning/10",
    title: "Tabela exposta sem regras de acesso",
    summary: "Uma tabela pública permite leitura de dados que deveriam ser apenas do próprio usuário.",
  },
  {
    severity: "Médio",
    tone: "text-info border-info/40 bg-info/10",
    title: "Cabeçalhos de segurança ausentes",
    summary: "Faltam proteções básicas contra carregamento do site dentro de páginas de terceiros.",
  },
  {
    severity: "Não foi possível verificar",
    tone: "text-muted-foreground border-border bg-elevated",
    title: "Regras do banco de dados",
    summary:
      "Não tivemos acesso suficiente para confirmar esta configuração. Conecte o projeto autorizado para aprofundar.",
  },
];

function Page() {
  return (
    <PageShell
      eyebrow="Projeto de demonstração"
      title={title}
      description={description}
    >
      <div className="-mx-[calc((100vw-100%)/2)]">
        <ReportPreviewSection />
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Achados do projeto de demonstração</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Dados de exemplo. Em um projeto real, cada achado traz evidência com valores sensíveis
          ocultos, passo a passo de correção e um prompt pronto para seu construtor.
        </p>
        <ul className="mt-8 space-y-3">
          {findings.map((f) => (
            <li key={f.title} className="surface-card p-5">
              <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] ${f.tone}`}>
                {f.severity}
              </span>
              <h3 className="mt-3 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.summary}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted-foreground">
          A Lançapp reduz riscos conhecidos, mas nenhuma análise automatizada garante segurança
          absoluta.
        </p>
      </section>
    </PageShell>
  );
}
