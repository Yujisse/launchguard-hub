import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/Logo";

const groups: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Produto",
    links: [
      { label: "Como funciona", to: "/como-funciona" },
      { label: "Preços", to: "/precos" },
      { label: "Relatório de exemplo", to: "/relatorio-exemplo" },
    ],
  },
  {
    title: "Conta",
    links: [
      { label: "Entrar", to: "/entrar" },
      { label: "Criar conta", to: "/criar-conta" },
      { label: "Recuperar senha", to: "/recuperar-senha" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos", to: "/termos" },
      { label: "Privacidade", to: "/privacidade" },
      { label: "Uso aceitável", to: "/uso-aceitavel" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-sidebar">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Seu SaaS pronto para ir ao ar. Verificações passivas de prontidão para lançamento.
          </p>
          <p className="mt-4 font-mono text-xs text-muted-foreground">contato@lancapp.com.br</p>
        </div>
        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h2 className="text-sm font-semibold">{g.title}</h2>
            <ul className="mt-4 space-y-2">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border-subtle">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Lançapp</p>
          <p className="max-w-xl">
            A Lançapp reduz riscos conhecidos, mas nenhuma análise automatizada garante segurança
            absoluta.
          </p>
        </div>
      </div>
    </footer>
  );
}
