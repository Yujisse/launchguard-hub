import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell } from "@/components/landing/PageShell";

const title = "Recuperar senha";
const description = "Recupere o acesso à sua conta Lançapp.";

export const Route = createFileRoute("/recuperar-senha")({
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
        <h2 className="text-base font-semibold">Recuperação indisponível no momento</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Como o sistema de contas ainda está sendo configurado, não há senhas a recuperar.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Voltar para{" "}
          <Link to="/" className="text-primary underline underline-offset-4">
            a página inicial
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
