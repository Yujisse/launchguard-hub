import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteNav } from "@/components/landing/SiteNav";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { HeroScanCard } from "@/components/landing/HeroScanCard";
import { BackgroundBeams } from "@/components/effects/BackgroundBeams";
import { Reveal } from "@/components/effects/Reveal";
import { UrlScanForm } from "@/components/landing/UrlScanForm";
import {
  CategoriesSection,
  FaqSection,
  FinalCtaSection,
  HowItWorksSection,
  PlatformsSection,
  PricingSection,
  ProblemSection,
  ReportPreviewSection,
} from "@/components/landing/sections";

const title = "Lançapp — Seu SaaS pronto para ir ao ar";
const description =
  "Diagnóstico de prontidão para lançamento de apps criados com IA: segurança, banco de dados, pagamentos, fluxos, mobile e conformidade.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main id="conteudo">
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <BackgroundBeams className="opacity-60 lg:opacity-100" />
          <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="enter-stage font-mono text-xs uppercase tracking-widest text-primary [animation-delay:150ms]">
                Pré-lançamento para apps criados com IA
              </p>
              <h1 className="enter-stage [animation-delay:250ms] mt-4 text-balance text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
                Seu SaaS parece pronto.
                <br />
                A Lançapp <span className="text-primary">prova se está</span>.
              </h1>
              <p className="enter-stage [animation-delay:400ms] mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Encontre falhas de segurança, pagamentos, banco de dados e experiência antes que seus
                usuários encontrem.
              </p>
              <div className="enter-stage [animation-delay:550ms] mt-8 max-w-xl">
                <UrlScanForm />
              </div>
              <p className="enter-stage [animation-delay:600ms] mt-6 text-sm">
                <Link
                  to="/relatorio-exemplo"
                  className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Ver relatório de exemplo
                </Link>
              </p>
            </div>
            <div className="enter-stage [animation-delay:650ms] lg:pl-4">
              <HeroScanCard />
            </div>
          </div>
        </section>

        <Reveal><ProblemSection /></Reveal>
        <Reveal><HowItWorksSection /></Reveal>
        <Reveal><CategoriesSection /></Reveal>
        <Reveal><ReportPreviewSection /></Reveal>
        <Reveal><PlatformsSection /></Reveal>
        <Reveal><PricingSection /></Reveal>
        <Reveal><FaqSection /></Reveal>
        <Reveal><FinalCtaSection /></Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
