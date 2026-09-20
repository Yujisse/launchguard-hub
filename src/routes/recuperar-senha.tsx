import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, MailCheck } from "lucide-react";
import { z } from "zod";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const title = "Recuperar senha";
const description = "Enviaremos um link para você criar uma nova senha.";

export const Route = createFileRoute("/recuperar-senha")({
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

const schema = z.string().trim().email("Informe um e-mail válido.");

function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "E-mail inválido.");
      return;
    }
    setError(null);
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    });
    setLoading(false);
    if (resetError) {
      setError("Não foi possível enviar o link agora. Tente novamente.");
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <AuthShell
        title="Verifique seu e-mail"
        description="Se existir uma conta com este endereço, o link de recuperação chegará em instantes."
      >
        <div className="flex items-start gap-3 rounded-[10px] border border-border-subtle bg-elevated p-4 text-sm text-muted-foreground">
          <MailCheck className="mt-0.5 size-4 shrink-0 text-primary" />
          <p>
            Enviado para <span className="font-mono text-foreground">{email}</span>.
          </p>
        </div>
        <div className="mt-6">
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link to="/entrar">Voltar ao login</Link>
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
        <Link to="/entrar" className="text-primary underline underline-offset-4">
          Voltar ao login
        </Link>
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
        {error ? (
          <p role="alert" className="text-sm text-critical">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : null}
          Enviar link
        </Button>
      </form>
    </AuthShell>
  );
}
