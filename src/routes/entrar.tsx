import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell } from "@/components/landing/PageShell";

const title = "Entrar na Lançapp";
const description = "Acesse sua conta Lançapp para ver diagnósticos, achados e correções.";

export const Route = createFileRoute("/entrar")({
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

function Page() {
  return (
    <PageShell eyebrow="Conta" title={title} description={description}>
      <div className="surface-card max-w-md p-6">
        <h2 className="text-base font-semibold">Contas ainda não estão ativas</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O sistema de contas da Lançapp está sendo configurado. Nenhum login está disponível ainda —
          não vamos fingir que funciona.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Enquanto isso, veja{" "}
          <Link to="/relatorio-exemplo" className="text-primary underline underline-offset-4">
            o relatório de exemplo
          </Link>{" "}
          ou{" "}
          <Link to="/precos" className="text-primary underline underline-offset-4">
            os planos
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
