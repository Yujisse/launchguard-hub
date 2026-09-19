import { createFileRoute } from "@tanstack/react-router";

import { LegalBlocks, PageShell } from "@/components/landing/PageShell";

const title = "Política de uso aceitável";
const description = "Regras claras sobre o que pode e o que não pode ser analisado na Lançapp.";

export const Route = createFileRoute("/uso-aceitavel")({
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

const blocks = [
  {
    title: "Somente projetos autorizados",
    body: "Antes de iniciar qualquer diagnóstico você precisa confirmar que é proprietário do projeto ou que possui autorização para analisá-lo. Sem essa confirmação, a análise não começa.",
  },
  {
    title: "Verificações passivas",
    body: "A Lançapp apenas observa o que já está publicamente disponível e o que você autorizou. Não realizamos testes destrutivos, força bruta, ataques a credenciais nem exploração de vulnerabilidades.",
  },
  {
    title: "Endereços bloqueados",
    body: "Recusamos endereços internos, locais, de redes privadas e de metadados de nuvem. Isso protege tanto você quanto terceiros.",
  },
  {
    title: "Correções no GitHub",
    body: "Qualquer correção assistida exige sua permissão explícita, cria um branch separado e abre um pull request para revisão. Nunca enviamos alterações direto para o branch de produção.",
  },
  {
    title: "Limites e abuso",
    body: "Há limites de uso por conta e por origem. Tentativas de abuso são registradas e podem resultar em bloqueio.",
  },
];

function Page() {
  return (
    <PageShell eyebrow="Legal" title={title} description={description}>
      <LegalBlocks blocks={blocks} />
    </PageShell>
  );
}
