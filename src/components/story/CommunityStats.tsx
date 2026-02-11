"use client";

import { useMemo } from "react";
import { getChoiceCounts } from "@/lib/storage";

const FAKE_STATS: Record<string, number> = {
  "mudar de cidade": 42,
  "trocar de curso/carreira": 38,
  "aceitar/recusar trabalho": 55,
  "terminar/continuar relacionamento": 31,
  "começar um projeto": 27,
  "ficar ou ir embora": 29,
};

export function CommunityStats() {
  const counts = useMemo(() => {
    try {
      return typeof window !== "undefined" ? getChoiceCounts() : {};
    } catch {
      return {};
    }
  }, []);

  const merged = useMemo(() => {
    const result = { ...FAKE_STATS };
    Object.entries(counts).forEach(([k, v]) => {
      result[k] = (result[k] || 0) + v;
    });
    return result;
  }, [counts]);

  const topChoice = Object.entries(merged).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4">
      <h4 className="mb-2 text-sm font-medium">Estatísticas da comunidade</h4>
      <p className="text-sm text-muted-foreground">
        A escolha mais comum hoje foi:{" "}
        <span className="text-foreground font-medium">{topChoice?.[0] ?? "mudar de cidade"}</span>
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Dados 100% anônimos. Amostra ilustrativa no MVP.
      </p>
    </div>
  );
}
