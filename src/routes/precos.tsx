import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/landing/PageShell";
import { FaqSection, PricingSection } from "@/components/landing/sections";

const title = "Preços da Lançapp";
const description =
  "Planos em reais para diagnosticar e monitorar seu SaaS: grátis, relatório único de R$147, Guard R$79/mês e Agência R$297/mês.";

export const Route = createFileRoute("/precos")({
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
    <PageShell eyebrow="Preços" title={title} description={description}>
      <div className="-mx-[calc((100vw-100%)/2)]">
        <PricingSection />
        <FaqSection />
      </div>
    </PageShell>
  );
}
