import { cn } from "@/lib/utils";

/**
 * Lançapp mark: an open code bracket + scan line + checkmark.
 * Stays legible at 24x24 and works standalone as a favicon.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label="Lançapp"
      className={cn("h-8 w-8", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="30" height="30" rx="9" className="fill-elevated" />
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="9"
        className="stroke-border"
        strokeWidth="1.5"
      />
      <path
        d="M12 9 L7 16 L12 23"
        className="stroke-muted-foreground"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 17.5 L17.5 21 L25 11.5"
        className="stroke-primary"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 16 H25" className="stroke-teal" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="h-7 w-7" />
      <span className="font-display text-lg font-semibold lowercase tracking-tight">lançapp</span>
    </span>
  );
}
