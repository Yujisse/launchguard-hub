import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const title = "Criar nova senha";
const description = "Defina uma nova senha para sua conta Lançapp.";

export const Route = createFileRoute("/redefinir-senha")({
  ssr: false,
  head: () => ({
    meta: [
      { title: `${title} — Lançapp` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — Lançapp` },
      { property: "og:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

const schema = z.string().min(8, "Use ao menos 8 caracteres.");

function Page() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(password);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Senha inválida.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não são iguais.");
      return;
    }
    setError(null);
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password: parsed.data });
    setLoading(false);
    if (updateError) {
      setError(
        "Não foi possível atualizar a senha. O link pode ter expirado — peça um novo em Recuperar senha.",
      );
      return;
    }
    toast.success("Senha atualizada.");
    navigate({ to: "/app" });
  };

  return (
    <AuthShell
      title={title}
      description={description}
      footer={
        <Link to="/recuperar-senha" className="text-primary underline underline-offset-4">
          Pedir um novo link
        </Link>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Nova senha</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Repetir senha</Label>
          <Input
            id="confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
          Salvar nova senha
        </Button>
      </form>
    </AuthShell>
  );
}
