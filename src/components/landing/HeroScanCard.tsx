import { useEffect, useState } from "react";
import { ShieldAlert, KeyRound, CreditCard } from "lucide-react";

const categories = [
  { label: "Segurança e segredos", value: 72 },
  { label: "Autenticação e banco", value: 84 },
  { label: "Pagamentos e planos", value: 61 },
  { label: "Mobile e desempenho", value: 93 },
];

const findings = [
  { icon: KeyRound, label: "Chave exposta no bundle do front-end", tone: "text-critical" },
  { icon: ShieldAlert, label: "Cabeçalho de segurança ausente", tone: "text-warning" },
  { icon: CreditCard, label: "Webhook sem verificação de assinatura", tone: "text-critical" },
];

export function HeroScanCard() {
  const [score, setScore] = useState<number | null>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScore(82);
      setShown(findings.length);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1600, 1);
      setScore(Math.round(82 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const delay = window.setTimeout(() => (raf = requestAnimationFrame(tick)), 600);
    const timers = findings.map((_, i) =>
      window.setTimeout(() => setShown((s) => Math.max(s, i + 1)), 1200 + i * 450),
    );
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(delay);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="surface-card relative overflow-hidden p-5 shadow-[var(--shadow-glow)] border-primary/30">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan-beam bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs text-muted-foreground">https://meu-saas.com</p>
          <p className="mt-1 text-sm font-medium">Diagnóstico de lançamento</p>
        </div>
        <span className="shrink-0 rounded-full border border-border px-2 py-1 text-[11px] text-muted-foreground">
          Demonstração
        </span>
      </div>

      <div className="mt-5 flex items-center gap-5">
        <div className="relative grid h-24 w-24 shrink-0 place-items-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r="44" className="stroke-border" strokeWidth="6" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-primary transition-[stroke-dashoffset] duration-300"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={276}
              strokeDashoffset={276 - (276 * (score ?? 0)) / 100}
            />
          </svg>
          <span className="font-mono text-2xl font-semibold">{score === null ? "--" : score}</span>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          {categories.map((c) => (
            <div key={c.label}>
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span className="truncate">{c.label}</span>
                <span className="font-mono">{c.value}</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-elevated">
                <div
                  className="h-1 rounded-full bg-teal transition-[width] duration-1000"
                  style={{ width: score === null ? "0%" : `${c.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-5 space-y-2">
        {findings.slice(0, shown).map((f) => (
          <li
            key={f.label}
            className="flex animate-rise-in items-center gap-3 rounded-lg border border-border-subtle bg-elevated px-3 py-2"
          >
            <f.icon className={`size-4 shrink-0 ${f.tone}`} aria-hidden />
            <span className="truncate text-xs text-muted-foreground">{f.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
