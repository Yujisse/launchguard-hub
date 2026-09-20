import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Radar } from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Painel — Lançapp" },
      { name: "description", content: "Seu painel de prontidão de lançamento na Lançapp." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  const { user } = Route.useRouteContext();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const firstName =
    profile?.full_name?.trim().split(" ")[0] ?? user.email?.split("@")[0] ?? "por aqui";

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <header>
          {isLoading ? (
            <Skeleton className="h-9 w-72" />
          ) : (
            <h1 className="text-2xl font-semibold sm:text-3xl">Bom te ver, {firstName}.</h1>
          )}
          <p className="mt-2 text-muted-foreground">
            Veja o que precisa de atenção antes do próximo lançamento.
          </p>
        </header>

        <section className="surface-card mt-8 flex flex-col items-start gap-4 p-8">
          <span className="flex size-12 items-center justify-center rounded-[10px] border border-border-subtle bg-elevated">
            <Radar className="size-5 text-primary" />
          </span>
          <div>
            <h2 className="text-lg font-semibold">Seu primeiro diagnóstico começa com uma URL.</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              A criação de projetos e o diagnóstico passivo estão sendo construídos nesta etapa.
              Ainda não há nenhum resultado para mostrar — e não vamos exibir números inventados.
            </p>
          </div>
          <Button disabled size="lg">
            Adicionar projeto (em breve)
          </Button>
        </section>

        <p className="mt-6 text-xs text-muted-foreground">
          A Lançapp reduz riscos conhecidos, mas nenhuma análise automatizada garante segurança
          absoluta. Veja{" "}
          <Link to="/como-funciona" className="underline underline-offset-4">
            como funciona
          </Link>
          .
        </p>
      </div>
    </AppShell>
  );
}
