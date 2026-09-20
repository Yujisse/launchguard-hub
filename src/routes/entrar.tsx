import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { AuthShell, GoogleButton } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

const title = "Entrar na Lançapp";
const description = "Acesse sua conta para ver diagnósticos, achados e correções.";

export const Route = createFileRoute("/entrar")({
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

const schema = z.object({
  email: z.string().trim().email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha precisa ter ao menos 6 caracteres."),
});

function Page() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dados inválidos.");
      return;
    }
    setError(null);
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (signInError) {
      setError(
        signInError.message.includes("Invalid login")
          ? "E-mail ou senha incorretos."
          : signInError.message.includes("Email not confirmed")
            ? "Confirme seu e-mail antes de entrar."
            : "Não foi possível entrar agora. Tente novamente.",
      );
      return;
    }
    toast.success("Bem-vindo de volta.");
    navigate({ to: "/app" });
  };

  const onGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      setError("Não foi possível entrar com o Google agora.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/app" });
  };

  return (
    <AuthShell
      title={title}
      description={description}
      footer={
        <>
          Não tem conta?{" "}
          <Link to="/criar-conta" className="text-primary underline underline-offset-4">
            Criar conta
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link
              to="/recuperar-senha"
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Esqueci minha senha
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12"
          />
        </div>
        {error ? (
          <p role="alert" className="text-sm text-critical">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : null}
          Entrar
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border-subtle" />
        ou
        <span className="h-px flex-1 bg-border-subtle" />
      </div>

      <GoogleButton onClick={onGoogle} disabled={loading} label="Continuar com Google" />
    </AuthShell>
  );
}
