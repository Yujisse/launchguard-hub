import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell } from "@/components/landing/PageShell";

const title = "Criar conta na Lançapp";
const description = "Crie sua conta para diagnosticar a prontidão de lançamento do seu SaaS.";

export const Route = createFileRoute("/criar-conta")({
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
        <h2 className="text-base font-semibold">Cadastro em configuração</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O cadastro de contas ainda não está ligado. Assim que estiver, você poderá adicionar um
          projeto, confirmar a autorização de análise e iniciar o primeiro diagnóstico.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Conheça antes{" "}
          <Link to="/como-funciona" className="text-primary underline underline-offset-4">
            como funciona
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
