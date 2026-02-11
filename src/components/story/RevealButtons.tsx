"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { GenerateContext } from "@/lib/prompts";

const REVEAL_LABELS: Record<string, string> = {
  hiddenPrice: "Revelar o preço escondido",
  unexpectedRelief: "Revelar um alívio inesperado",
  missedJoy: "Revelar uma alegria que você teria perdido",
  newProblemYouDidntHave: "Revelar um problema que você não teria hoje",
};

interface RevealButtonsProps {
  context: GenerateContext;
  existingContent: string;
  initialReveals: Record<string, string>;
  onReveal: (key: string, text: string) => void;
}

export function RevealButtons({
  context,
  existingContent,
  initialReveals,
  onReveal,
}: RevealButtonsProps) {
  const [revealed, setRevealed] = useState<Record<string, string>>(initialReveals);
  const [loading, setLoading] = useState<string | null>(null);

  const handleReveal = async (key: string) => {
    if (revealed[key]) return;
    setLoading(key);

    try {
      const res = await fetch("/api/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context,
          revealType: key,
          existingContent,
        }),
      });
      const data = await res.json();
      const text = data.text || "";
      setRevealed((r) => ({ ...r, [key]: text }));
      onReveal(key, text);
    } catch {
      setRevealed((r) => ({
        ...r,
        [key]: "Algo deu errado. Tente novamente.",
      }));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(REVEAL_LABELS).map(([key, label]) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card/50 p-4"
        >
          {revealed[key] ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm italic text-muted-foreground"
            >
              &ldquo;{revealed[key]}&rdquo;
            </motion.p>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleReveal(key)}
              disabled={!!loading}
            >
              {loading === key ? "Revelando…" : label}
            </Button>
          )}
        </motion.div>
      ))}
    </div>
  );
}
