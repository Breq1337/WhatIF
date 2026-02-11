"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Nem melhor, nem pior — diferente.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">
              Termos
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacidade
            </Link>
            <Link href="/ethics" className="text-muted-foreground hover:text-foreground">
              Ética
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
