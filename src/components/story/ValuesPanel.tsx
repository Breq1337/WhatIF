"use client";

import { motion } from "framer-motion";

interface ValuesPanelProps {
  responses: Record<number, "sim" | "nao" | "nao_sei">;
  count: number;
}

function inferValues(responses: Record<number, string>): string[] {
  const values: string[] = [];
  const simCount = Object.values(responses).filter((r) => r === "sim").length;
  const naoCount = Object.values(responses).filter((r) => r === "nao").length;

  if (simCount > naoCount) {
    values.push("Você parece disposto(a) a pagar certos custos por aquilo que deseja.");
  }
  if (naoCount > 0) {
    values.push("Alguns custos simplesmente não compensam para você.");
  }
  if (Object.values(responses).some((r) => r === "nao_sei")) {
    values.push("A dúvida também é uma forma de sabedoria.");
  }
  if (values.length === 0 && Object.keys(responses).length > 0) {
    values.push("Suas escolhas revelam o que importa para você.");
  }

  return values;
}

export function ValuesPanel({ responses, count }: ValuesPanelProps) {
  const totalResponses = Object.keys(responses).length;
  if (totalResponses === 0) return null;

  const insights = inferValues(responses);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-primary/30 bg-primary/5 p-4"
    >
      <h4 className="mb-2 font-medium">O que você valoriza</h4>
      <p className="mb-3 text-sm text-muted-foreground">
        Baseado nas suas respostas sobre os custos ({totalResponses}/{count} nós)
      </p>
      <ul className="space-y-1 text-sm">
        {insights.map((insight, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-primary">•</span>
            {insight}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
