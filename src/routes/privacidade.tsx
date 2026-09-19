import { createFileRoute } from "@tanstack/react-router";

import { LegalBlocks, PageShell } from "@/components/landing/PageShell";

const title = "Política de privacidade";
const description = "Como a Lançapp trata os dados do seu projeto e da sua conta.";

export const Route = createFileRoute("/privacidade")({
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
    title: "Dados que coletamos",
    body: "Dados da conta (nome e e-mail), dados dos projetos que você cadastra (nome, endereço público, construtor utilizado) e resultados das verificações realizadas.",
  },
  {
    title: "Evidências das análises",
    body: "Guardamos apenas o necessário para explicar cada achado: caminhos, metadados e trechos com valores sensíveis mascarados. Não armazenamos o conteúdo completo de repositórios.",
  },
  {
    title: "Credenciais e integrações",
    body: "Tokens de integração nunca são enviados ao navegador e ficam sob um mecanismo seguro de segredos no servidor. Você pode revogar qualquer integração a qualquer momento.",
  },
  {
    title: "Compartilhamento",
    body: "Não vendemos dados. Compartilhamos apenas com provedores necessários para operar o serviço, como hospedagem, pagamentos e envio de e-mails.",
  },
  {
    title: "Seus direitos",
    body: "Você pode exportar os dados da conta, corrigir informações e solicitar a exclusão da conta. A exclusão remove projetos, análises e achados associados.",
  },
  {
    title: "Contato",
    body: "Dúvidas sobre privacidade podem ser enviadas para contato@lancapp.com.br.",
  },
];

function Page() {
  return (
    <PageShell eyebrow="Legal" title={title} description={description}>
      <LegalBlocks blocks={blocks} />
    </PageShell>
  );
}
