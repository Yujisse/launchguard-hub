import { createFileRoute } from "@tanstack/react-router";

import { LegalBlocks, PageShell } from "@/components/landing/PageShell";

const title = "Termos de uso";
const description = "Condições de uso da plataforma Lançapp.";

export const Route = createFileRoute("/termos")({
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
    title: "1. O que a Lançapp faz",
    body: "A Lançapp executa verificações passivas e somente de leitura em endereços públicos informados por você, além de análises adicionais em repositórios e projetos que você conectar e autorizar explicitamente.",
  },
  {
    title: "2. Autorização obrigatória",
    body: "Você só pode solicitar a análise de projetos dos quais é proprietário ou para os quais possui autorização por escrito. Solicitações fora dessa condição violam estes termos e podem ser bloqueadas.",
  },
  {
    title: "3. Limites do serviço",
    body: "Nenhuma análise automatizada garante segurança absoluta. Os resultados indicam riscos conhecidos e não substituem auditoria profissional nem responsabilidade jurídica sobre o seu produto.",
  },
  {
    title: "4. Planos e pagamentos",
    body: "Os planos são cobrados em reais conforme a página de preços. O acesso pago é liberado somente após confirmação do provedor de pagamento. O cancelamento vale até o fim do período já pago.",
  },
  {
    title: "5. Uso indevido",
    body: "Contas que tentarem usar a plataforma para escanear sistemas de terceiros sem autorização, burlar limites ou automatizar abuso podem ser suspensas.",
  },
  {
    title: "6. Alterações",
    body: "Estes termos podem ser atualizados. Mudanças relevantes serão comunicadas pelo e-mail cadastrado antes de entrarem em vigor.",
  },
];

function Page() {
  return (
    <PageShell eyebrow="Legal" title={title} description={description}>
      <LegalBlocks blocks={blocks} />
    </PageShell>
  );
}
