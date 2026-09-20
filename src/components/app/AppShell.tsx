import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  Bell,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Plug,
  Settings,
  User,
} from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";

const groups: { label: string; items: { label: string; icon: typeof LayoutDashboard }[] }[] = [
  {
    label: "Visão geral",
    items: [
      { label: "Dashboard", icon: LayoutDashboard },
      { label: "Projetos", icon: FolderKanban },
      { label: "Novo scan", icon: BarChart3 },
    ],
  },
  {
    label: "Conta",
    items: [
      { label: "Integrações", icon: Plug },
      { label: "Notificações", icon: Bell },
      { label: "Plano", icon: CreditCard },
      { label: "Perfil", icon: User },
      { label: "Configurações", icon: Settings },
    ],
  },
];

function NavContent({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 py-5">
        <Link to="/app" aria-label="Painel Lançapp">
          <Logo />
        </Link>
      </div>
      <nav aria-label="Navegação do painel" className="flex-1 space-y-6 px-3">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-3 pb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isDashboard = item.label === "Dashboard";
                return (
                  <li key={item.label}>
                    {isDashboard ? (
                      <Link
                        to="/app"
                        className="flex items-center gap-2 rounded-[10px] bg-elevated px-3 py-2 text-sm text-foreground"
                      >
                        <Icon className="size-4 text-primary" />
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        aria-disabled="true"
                        title="Em construção"
                        className="flex cursor-not-allowed items-center gap-2 rounded-[10px] px-3 py-2 text-sm text-muted-foreground/60"
                      >
                        <Icon className="size-4" />
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="p-3">
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={onSignOut}>
          <LogOut className="size-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/entrar", replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-[236px] border-r border-border-subtle bg-sidebar lg:block">
        <NavContent onSignOut={handleSignOut} />
      </aside>

      <div className="lg:pl-[236px]">
        <header className="flex h-16 items-center justify-between gap-3 border-b border-border-subtle px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" aria-label="Abrir navegação">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[260px] bg-sidebar p-0">
                <SheetTitle className="sr-only">Navegação do painel</SheetTitle>
                <NavContent onSignOut={handleSignOut} />
              </SheetContent>
            </Sheet>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Painel
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="hidden lg:inline-flex">
            <LogOut className="size-4" />
            Sair
          </Button>
        </header>
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
