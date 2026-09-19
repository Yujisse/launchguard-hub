import type { ReactNode } from "react";

import { SiteNav } from "@/components/landing/SiteNav";
import { SiteFooter } from "@/components/landing/SiteFooter";

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-32 pb-24 sm:pt-40">
        <div className="container-page">
          <header className="max-w-3xl">
            {eyebrow ? (
              <p className="font-mono text-xs uppercase tracking-widest text-primary">{eyebrow}</p>
            ) : null}
            <h1 className="mt-3 text-balance text-4xl font-semibold sm:text-5xl">{title}</h1>
            {description ? <p className="mt-4 text-muted-foreground">{description}</p> : null}
          </header>
          <div className="mt-12">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function LegalBlocks({ blocks }: { blocks: { title: string; body: string }[] }) {
  return (
    <div className="max-w-3xl space-y-8">
      {blocks.map((b) => (
        <section key={b.title}>
          <h2 className="text-lg font-semibold">{b.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
        </section>
      ))}
    </div>
  );
}
