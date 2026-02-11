"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TradeoffBalanceProps {
  gains: string[];
  costs: string[];
  problemsAvoided: string[];
  silentBlessings: string[];
}

export function TradeoffBalance({
  gains,
  costs,
  problemsAvoided,
  silentBlessings,
}: TradeoffBalanceProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <p className="text-center text-sm text-muted-foreground">
        Ganhos ≠ melhor. Custos ≠ pior. Só diferente.
      </p>

      {/* Balance visual */}
      <div className="flex items-stretch gap-4">
        <div className="flex-1 space-y-3 rounded-xl border border-green-500/30 bg-green-500/5 p-4">
          <h4 className="text-center font-medium text-green-600 dark:text-green-400">
            Ganhos possíveis
          </h4>
          {gains.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setExpanded(`gain-${i}`)}
              onMouseLeave={() => setExpanded(null)}
              className="cursor-default rounded-lg border border-green-500/20 bg-background/50 p-3 text-sm"
            >
              {g}
            </motion.div>
          ))}
        </div>

        <div className="flex shrink-0 items-center text-2xl text-muted-foreground">
          ⇄
        </div>

        <div className="flex-1 space-y-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <h4 className="text-center font-medium text-amber-600 dark:text-amber-400">
            Custos possíveis
          </h4>
          {costs.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setExpanded(`cost-${i}`)}
              onMouseLeave={() => setExpanded(null)}
              className="cursor-default rounded-lg border border-amber-500/20 bg-background/50 p-3 text-sm"
            >
              {c}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card/50 p-4">
          <h4 className="mb-3 font-medium">Problemas que você escapou</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {problemsAvoided.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-4">
          <h4 className="mb-3 font-medium">Bênçãos silenciosas da vida real</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {silentBlessings.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
