import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, Loader2, RotateCw, ShieldCheck } from "lucide-react";
import { z } from "zod";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProject, getScanReport } from "@/lib/projects.functions";
import { startScan } from "@/lib/scan.functions";
import {
  CATEGORY_LABEL,
  SEVERITY_CLASS,
  SEVERITY_LABEL,
  normalizeUrlInput,
  validatePublicUrl,
  verdictClass,
  type Severity,
} from "@/lib/scan-shared";

export const PENDING_URL_KEY = "lancapp:pending-url";

export const Route = createFileRoute("/_authenticated/app_/analisar")({
  validateSearch: (s: Record<string, unknown>) =>
    z.object({ url: z.string().max(300).optional() }).parse(s),
  head: () => ({
    meta: [
      { title: "Analisar URL — Lançapp" },
      { name: "description", content: "Diagnóstico passivo da URL pública do seu SaaS." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

type Report = NonNullable<Awaited<ReturnType<typeof getScanReport>>>;

function Page() {
  const search = Route.useSearch();
  const [url, setUrl] = useState(search.url ?? "");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);

  const createFn = useServerFn(createProject);
  const scanFn = useServerFn(startScan);
  const reportFn = useServerFn(getScanReport);

  useEffect(() => {
    if (search.url) return;
    const pending = localStorage.getItem(PENDING_URL_KEY);
    if (pending) setUrl(pending);
  }, [search.url]);

  async function run(pid: string) {
    const res = await scanFn({ data: { projectId: pid } });
    if (res.status === "error") throw new Error(res.message);
    const r = await reportFn({ data: { scanId: res.scanId } });
    if (!r) throw new Error("Não encontramos o relatório salvo.");
    setReport(r);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const invalid = url.trim() ? validatePublicUrl(url) : "Informe o endereço do seu SaaS.";
    if (invalid) return setError(invalid);
    if (!authorized) return setError("Confirme que você tem autorização para analisar este endereço.");
    setError(null);
    setLoading(true);
    setReport(null);
    try {
      const normalized = normalizeUrlInput(url);
      const { id } = await createFn({
        data: {
          name: new URL(normalized).hostname.slice(0, 80),
          publicUrl: normalized,
          builder: "outro",
          environment: "production",
          authorizationConfirmed: true,
        },
      });
      setProjectId(id);
      localStorage.removeItem(PENDING_URL_KEY);
      await run(id);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Não foi possível concluir a análise.");
    } finally {
      setLoading(false);
    }
  }

  async function rescan() {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      await run(projectId);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Não foi possível concluir a análise.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold sm:text-3xl">Analisar uma URL pública</h1>
        <p className="mt-2 text-muted-foreground">
          Verificação passiva: lemos apenas a resposta pública do site. Não alteramos nada.
        </p>

        <form onSubmit={onSubmit} noValidate className="surface-card mt-6 space-y-4 p-6">
          <div>
            <Label htmlFor="url">Endereço do seu SaaS</Label>
            <Input
              id="url"
              className="mt-2 h-12 font-mono text-sm"
              placeholder="https://seu-saas.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="auth"
              checked={authorized}
              onCheckedChange={(v) => setAuthorized(v === true)}
              disabled={loading}
            />
            <Label htmlFor="auth" className="text-sm leading-snug font-normal">
              Confirmo que sou proprietário deste projeto ou tenho autorização para analisá-lo
            </Label>
          </div>
          {error ? (
            <p role="alert" className="flex items-start gap-2 text-sm text-critical">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" /> {error}
            </p>
          ) : null}
          <Button type="submit" variant="hero" size="lg" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
            {loading ? "Estamos verificando seu projeto sem alterar nada…" : "Iniciar diagnóstico"}
          </Button>
        </form>

        {report ? <ReportView report={report} onRescan={rescan} loading={loading} /> : null}
      </div>
    </AppShell>
  );
}

function ReportView({ report, onRescan, loading }: { report: Report; onRescan: () => void; loading: boolean }) {
  const { scan, findings } = report;
  const verified = findings.filter((f) => f.severity !== "nao_verificado");
  const unverified = findings.filter((f) => f.severity === "nao_verificado");

  return (
    <section className="mt-8 space-y-6" aria-live="polite">
      <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <p className="text-xs text-muted-foreground">
            {report.project?.public_url} • {new Date(scan.created_at).toLocaleString("pt-BR")}
          </p>
          {scan.status === "failed" ? (
            <>
              <h2 className="mt-1 text-lg font-semibold text-critical">A análise não pôde ser concluída</h2>
              <p className="mt-1 text-sm text-muted-foreground">{scan.failure_message}</p>
            </>
          ) : (
            <>
              <p className="mt-1 font-mono text-4xl font-semibold">{scan.overall_score}<span className="text-base text-muted-foreground">/100</span></p>
              <p className={`text-sm font-medium ${verdictClass(scan.verdict)}`}>{scan.verdict}</p>
              <p className="mt-1 max-w-md text-xs text-muted-foreground">
                Score da URL pública: considera apenas as verificações executadas abaixo. Código, banco de dados e pagamentos não foram analisados e não entram na conta — este número não indica que eles estão aprovados.
              </p>
            </>
          )}
        </div>
        <Button variant="outline" onClick={onRescan} disabled={loading}>
          <RotateCw className={loading ? "animate-spin" : ""} /> Verificar novamente
        </Button>
      </div>

      {verified.length ? (
        <h3 className="text-sm font-semibold text-muted-foreground">Verificações executadas na URL pública</h3>
      ) : null}
      {verified.length ? (
        <ul className="space-y-3">
          {verified.map((f) => (
            <li key={f.id} className="surface-card p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-md border px-2 py-0.5 text-xs ${SEVERITY_CLASS[f.severity as Severity]}`}>
                  {SEVERITY_LABEL[f.severity as Severity]}
                </span>
                <span className="text-xs text-muted-foreground">{CATEGORY_LABEL[f.category] ?? f.category}</span>
              </div>
              <h3 className="mt-2 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.summary}</p>
              {f.safe_evidence ? (
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-md bg-elevated p-3 font-mono text-xs">
                  {f.safe_evidence}
                </pre>
              ) : null}
              {f.impact ? <p className="mt-3 text-sm"><strong>Risco:</strong> {f.impact}</p> : null}
              {f.remediation ? <p className="mt-1 text-sm"><strong>Como corrigir:</strong> {f.remediation}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}

      {unverified.length ? (
        <div className="surface-card p-5">
          <h3 className="font-semibold">Não foi possível verificar</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Não tivemos acesso suficiente para confirmar estas configurações. Nada foi aprovado nem reprovado.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {unverified.map((f) => (
              <li key={f.id}>• <strong>{f.title}</strong> — {f.summary}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
