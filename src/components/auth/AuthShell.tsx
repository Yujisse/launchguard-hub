import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/Logo";

export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid-backdrop flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <Link to="/" aria-label="Início Lançapp" className="mb-8">
        <Logo />
      </Link>
      <main className="w-full max-w-md">
        <div className="surface-card p-6 sm:p-8">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          <div className="mt-6">{children}</div>
        </div>
        {footer ? <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
      </main>
    </div>
  );
}

export function GoogleButton({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-border bg-elevated text-sm font-medium text-foreground transition-colors hover:bg-elevated/70 disabled:opacity-60"
    >
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1a6.2 6.2 0 1 1 0-12.4c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 2.9 14.7 2 12 2a10 10 0 1 0 0 20c5.8 0 9.6-4 9.6-9.7 0-.7-.1-1.2-.2-1.7H12z"
        />
      </svg>
      {label}
    </button>
  );
}
