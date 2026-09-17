import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#analises", label: "O que analisamos" },
  { href: "#relatorio", label: "Relatório" },
  { href: "#precos", label: "Preços" },
  { href: "#faq", label: "FAQ" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border-subtle bg-background/80 backdrop-blur-xl" : "",
      )}
    >
      <nav
        aria-label="Navegação principal"
        className="container-page flex h-16 items-center justify-between gap-4"
      >
        <Link to="/" aria-label="Início Lançapp">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/entrar">Entrar</Link>
          </Button>
          <Button asChild variant="hero" size="sm">
            <a href="#analisar">Analisar meu SaaS</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-sidebar">
              <SheetTitle className="font-display text-base">Navegação</SheetTitle>
              <ul className="mt-6 space-y-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="block rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-elevated hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    to="/entrar"
                    className="block rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-elevated hover:text-foreground"
                  >
                    Entrar
                  </Link>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
