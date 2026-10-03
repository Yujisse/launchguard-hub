import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, MailCheck } from "lucide-react";
import { z } from "zod";

import { AuthShell, GoogleButton } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

const title = "Criar conta na Lançapp";
const description = "Crie sua conta para diagnosticar a prontidão de lançamento do seu SaaS.";

export const Route = createFileRoute("/criar-conta")({
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
  fullName: z.string().trim().min(2, "Informe seu nome."),
  email: z.string().trim().email("Informe um e-mail válido."),
  password: z.string().min(8, "Use ao menos 8 caracteres."),
});

function Page() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ fullName, email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dados inválidos.");
      return;
    }
    setError(null);
    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/entrar`,
        data: { full_name: parsed.data.fullName },
      },
    });
    setLoading(false);
    if (signUpError) {
      setError(
        signUpError.message.includes("already registered")
          ? "Já existe uma conta com este e-mail."
          : "Não foi possível criar a conta agora. Tente novamente.",
      );
      return;
    }
    if (data.session) {
      navigate({ to: "/app" });
      return;
    }
    setSent(true);
  };

  const onGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/entrar`,
    });
    if (result.error) {
      setLoading(false);
      setError("Não foi possível continuar com o Google agora.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/app" });
  };

  if (sent) {
    return (
      <AuthShell
        title="Confirme seu e-mail"
        description="Enviamos um link de confirmação. Abra o e-mail para ativar sua conta."
      >
        <div className="flex items-start gap-3 rounded-[10px] border border-border-subtle bg-elevated p-4 text-sm text-muted-foreground">
          <MailCheck className="mt-0.5 size-4 shrink-0 text-primary" />
          <p>
            Enviamos para <span className="font-mono text-foreground">{email}</span>. Se não
            aparecer em alguns minutos, verifique a caixa de spam.
          </p>
        </div>
        <div className="mt-6">
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link to="/entrar">Ir para o login</Link>
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={title}
      description={description}
      footer={
        <>
          Já tem conta?{" "}
          <Link to="/entrar" className="text-primary underline underline-offset-4">
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome</Label>
          <Input
            id="fullName"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-12"
          />
        </div>
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
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12"
          />
          <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres.</p>
        </div>
        {error ? (
          <p role="alert" className="text-sm text-critical">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : null}
          Criar conta
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border-subtle" />
        ou
        <span className="h-px flex-1 bg-border-subtle" />
      </div>

      <GoogleButton onClick={onGoogle} disabled={loading} label="Continuar com Google" />

      <p className="mt-6 text-xs text-muted-foreground">
        Ao criar a conta você concorda com os{" "}
        <Link to="/termos" className="underline underline-offset-4">
          termos
        </Link>{" "}
        e a{" "}
        <Link to="/privacidade" className="underline underline-offset-4">
          política de privacidade
        </Link>
        .
      </p>
    </AuthShell>
  );
}
