import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/landing/PageShell";
import { CategoriesSection, HowItWorksSection } from "@/components/landing/sections";

const title = "Como funciona a Lançapp";
const description =
  "Três passos para diagnosticar seu SaaS: adicionar o projeto, receber o diagnóstico e corrigir antes do lançamento.";

export const Route = createFileRoute("/como-funciona")({
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
    <PageShell eyebrow="Como funciona" title={title} description={description}>
      <div className="-mx-[calc((100vw-100%)/2)]">
        <HowItWorksSection />
        <CategoriesSection />
      </div>
    </PageShell>
  );
}
