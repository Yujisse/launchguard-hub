import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { validatePublicUrl, normalizeUrlInput, verdictFor } from "./scan-shared";

const createSchema = z.object({
  name: z.string().trim().min(2).max(80),
  publicUrl: z.string().trim().min(3).max(300),
  builder: z.enum(["lovable", "bolt", "base44", "replit", "cursor", "outro"]),
  environment: z.enum(["production", "staging"]),
  authorizationConfirmed: z.literal(true),
});

export const createProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => createSchema.parse(input))
  .handler(async ({ data, context }) => {
    const invalid = validatePublicUrl(data.publicUrl);
    if (invalid) throw new Error(invalid);
    const url = normalizeUrlInput(data.publicUrl);
    const { data: existing } = await context.supabase
      .from("projects")
      .select("id")
      .eq("owner_id", context.userId)
      .eq("public_url", url)
      .maybeSingle();
    if (existing) {
      await context.supabase.from("projects").update({ authorization_confirmed: true }).eq("id", existing.id);
      return { id: existing.id };
    }
    const { data: row, error } = await context.supabase
      .from("projects")
      .insert({
        owner_id: context.userId,
        name: data.name,
        public_url: normalizeUrlInput(data.publicUrl),
        builder: data.builder,
        environment: data.environment,
        authorization_confirmed: true,
      })
      .select("id")
      .single();
    if (error) throw new Error("Não foi possível salvar o projeto.");
    return { id: row.id };
  });

export const listProjects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("projects")
      .select("id, name, public_url, builder, environment, latest_score, latest_verdict, last_scan_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Não foi possível carregar seus projetos.");
    return data ?? [];
  });

export const getProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ projectId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: project, error } = await context.supabase
      .from("projects")
      .select("*")
      .eq("id", data.projectId)
      .maybeSingle();
    if (error) throw new Error("Não foi possível carregar o projeto.");
    if (!project) return null;
    const { data: scans } = await context.supabase
      .from("scans")
      .select("id, status, overall_score, verdict, created_at, completed_at, failure_message")
      .eq("project_id", data.projectId)
      .order("created_at", { ascending: false })
      .limit(20);
    return { project, scans: scans ?? [] };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ projectId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("projects").delete().eq("id", data.projectId);
    if (error) throw new Error("Não foi possível excluir o projeto.");
    return { ok: true };
  });

export const getScanReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ scanId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: scan, error } = await context.supabase
      .from("scans")
      .select("*")
      .eq("id", data.scanId)
      .maybeSingle();
    if (error) throw new Error("Não foi possível carregar o relatório.");
    if (!scan) return null;
    const { data: project } = await context.supabase
      .from("projects")
      .select("id, name, public_url")
      .eq("id", scan.project_id)
      .maybeSingle();
    const { data: findings } = await context.supabase
      .from("findings")
      .select("*")
      .eq("scan_id", data.scanId)
      .order("created_at", { ascending: true });
    return { scan, project, findings: findings ?? [], verdictHint: verdictFor(scan.overall_score ?? 0) };
  });
