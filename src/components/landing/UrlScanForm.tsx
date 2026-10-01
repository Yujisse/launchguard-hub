import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const urlSchema = z
  .string()
  .trim()
  .min(1, "Informe o endereço do seu SaaS.")
  .transform((v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`))
  .refine((v) => {
    try {
      const u = new URL(v);
      return (
        (u.protocol === "http:" || u.protocol === "https:") &&
        u.hostname.includes(".") &&
        !/^(localhost|127\.|10\.|192\.168\.|169\.254\.)/i.test(u.hostname)
      );
    } catch {
      return false;
    }
  }, "Use um endereço público válido, como https://seu-saas.com");

export function UrlScanForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = urlSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Endereço inválido.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      sessionStorage.setItem("lancapp:pending-url", parsed.data);
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        await navigate({ to: "/app/analisar", search: { url: parsed.data } });
      } else {
        await navigate({ to: "/criar-conta" });
      }
    } catch {
      setError("Não foi possível continuar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
        (u.protocol === "http:" || u.protocol === "https:") &&
        u.hostname.includes(".") &&
        !/^(localhost|127\.|10\.|192\.168\.|169\.254\.)/i.test(u.hostname)
      );
    } catch {
      return false;
    }
  }, "Use um endereço público válido, como https://seu-saas.com");

export function UrlScanForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = urlSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Endereço inválido.");
      return;
    }
    setError(null);
    setLoading(true);
    // O diagnóstico real roda no servidor após a criação da conta (próxima etapa do build).
    window.setTimeout(() => {
      setLoading(false);
      toast("Crie sua conta para iniciar o diagnóstico", {
        description: "A verificação passiva roda no servidor e exige confirmação de autorização.",
      });
    }, 400);
  };

  return (
    <form id="analisar" onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="scan-url" className="sr-only">
            Endereço do seu SaaS
          </label>
          <Input
            id="scan-url"
            type="url"
            inputMode="url"
            placeholder="https://seu-saas.com"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? "scan-url-error" : undefined}
            className="h-12 rounded-lg bg-card font-mono text-sm sm:h-[52px]"
          />
        </div>
        <Button type="submit" variant="hero" size="xl" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
          Analisar gratuitamente
        </Button>
      </div>
      {error ? (
        <p id="scan-url-error" role="alert" className="mt-2 text-sm text-critical">
          {error}
        </p>
      ) : null}
      <p className="mt-3 text-xs text-muted-foreground">
        Verificação passiva • Não alteramos seu projeto • Resultado inicial em minutos
      </p>
    </form>
  );
}
