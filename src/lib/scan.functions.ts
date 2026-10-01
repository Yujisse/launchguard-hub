import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { verdictFor } from "./scan-shared";

export const startScan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ projectId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id, public_url, authorization_confirmed")
      .eq("id", data.projectId)
      .maybeSingle();
    if (projectError) return { status: "error" as const, message: "Não foi possível carregar o projeto." };
    if (!project) return { status: "error" as const, message: "Projeto não encontrado." };
    if (!project.authorization_confirmed) {
      return { status: "error" as const, message: "Confirme a autorização para analisar este projeto." };
    }

    // Limite simples de uso: no máximo 10 análises por hora por conta.
    const hourAgo = new Date(Date.now() - 3_600_000).toISOString();
    const { count } = await supabase
      .from("scans")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", userId)
      .gte("created_at", hourAgo);
    const minuteAgo = new Date(Date.now() - 60_000).toISOString();
    const { count: recent } = await supabase
      .from("scans")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", userId)
      .gte("created_at", minuteAgo);
    if ((recent ?? 0) >= 2) {
      return { status: "error" as const, message: "Aguarde um minuto antes de iniciar outra análise." };
    }
    if ((count ?? 0) >= 10) {
      return { status: "error" as const, message: "Limite de análises por hora atingido. Tente novamente mais tarde." };
    }

    const startedAt = new Date().toISOString();
    const { data: scan, error: scanError } = await supabase
      .from("scans")
      .insert({
        project_id: project.id,
        owner_id: userId,
        status: "running",
        current_stage: "Validando endereço",
        progress: 5,
        checked_url: project.public_url,
        started_at: startedAt,
      })
      .select("id")
      .single();
    if (scanError || !scan) return { status: "error" as const, message: "Não foi possível iniciar a análise." };

    const { runPassiveScan } = await import("./scan.server");
    let outcome: Awaited<ReturnType<typeof runPassiveScan>>;
    try {
      outcome = await runPassiveScan(project.public_url);
    } catch {
      outcome = { findings: [], score: 0, finalUrl: null, failure: "Ocorreu uma falha técnica durante a análise. Nada foi alterado no seu site." };
    }

    if (outcome.failure) {
      await supabase
        .from("scans")
        .update({
          status: "failed",
          progress: 100,
          current_stage: "Falhou",
          failure_message: outcome.failure,
          final_url: outcome.finalUrl,
          completed_at: new Date().toISOString(),
        })
        .eq("id", scan.id);
      return { scanId: scan.id, status: "failed" as const, failure: outcome.failure };
    }

    const rows = outcome.findings.map((f) => ({
      scan_id: scan.id,
      project_id: project.id,
      owner_id: userId,
      fingerprint: `${f.check_code}:${f.affected_resource ?? project.public_url}`,
      check_code: f.check_code,
      category: f.category,
      severity: f.severity,
      title: f.title,
      summary: f.summary,
      safe_evidence: f.safe_evidence ?? null,
      impact: f.impact ?? null,
      remediation: f.remediation ?? null,
      affected_resource: f.affected_resource ?? null,
      confidence: f.confidence ?? "alta",
    }));
    if (rows.length) {
      const { error: findingsError } = await supabase.from("findings").insert(rows);
      if (findingsError) {
        await supabase
          .from("scans")
          .update({
            status: "failed",
            progress: 100,
            failure_message: "A análise rodou, mas não conseguimos salvar os resultados.",
            completed_at: new Date().toISOString(),
          })
          .eq("id", scan.id);
        return { status: "error" as const, message: "A análise rodou, mas não conseguimos salvar os resultados." };
      }
    }

    const verdict = verdictFor(outcome.score);
    const completedAt = new Date().toISOString();
    await supabase
      .from("scans")
      .update({
        status: "completed",
        progress: 100,
        current_stage: "Concluída",
        overall_score: outcome.score,
        verdict,
        final_url: outcome.finalUrl,
        completed_at: completedAt,
      })
      .eq("id", scan.id);

    await supabase
      .from("projects")
      .update({ latest_score: outcome.score, latest_verdict: verdict, last_scan_at: completedAt })
      .eq("id", project.id);

    return { scanId: scan.id, status: "completed" as const, score: outcome.score, verdict };
  });
