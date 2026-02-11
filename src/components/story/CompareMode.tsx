"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CompareModeProps {
  alternativeTitle: string;
  alternativeHook: string;
}

const REAL_LIFE_QUESTIONS = [
  "Em uma palavra, como você descreve sua vida hoje?",
  "O que você valoriza mais no caminho que seguiu?",
  "O que você deixou para trás ao não fazer aquela escolha?",
];

export function CompareMode({
  alternativeTitle,
  alternativeHook,
}: CompareModeProps) {
  const [showCompare, setShowCompare] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (i: number, v: string) => {
    const next = [...answers];
    next[i] = v;
    setAnswers(next);
  };

  const canShowColumns = showCompare && answers.every(Boolean);

  return (
    <div className="space-y-6 rounded-xl border border-border bg-card/50 p-6">
      <h3 className="text-lg font-medium">Modo Comparar</h3>
      <p className="text-sm text-muted-foreground">
        Compare com a sua linha real. Sem detalhes sensíveis — só reflexão.
      </p>

      {!showCompare ? (
        <button
          onClick={() => setShowCompare(true)}
          className="text-primary hover:underline"
        >
          Comparar com a sua linha real →
        </button>
      ) : (
        <div className="space-y-4">
          {REAL_LIFE_QUESTIONS.map((q, i) => (
            <div key={i}>
              <label className="mb-2 block text-sm">{q}</label>
              <input
                type="text"
                placeholder="Sua resposta"
                value={answers[i] ?? ""}
                onChange={(e) => handleAnswer(i, e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm"
              />
            </div>
          ))}

          {canShowColumns && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 sm:grid-cols-2 pt-4 border-t border-border"
            >
              <div className="rounded-lg border border-border p-4">
                <h4 className="mb-2 font-medium">Linha Real</h4>
                <p className="text-sm text-muted-foreground">
                  {answers[0]} — {answers[1]}. O que deixou para trás: {answers[2]}.
                </p>
              </div>
              <div className="rounded-lg border border-primary/30 p-4">
                <h4 className="mb-2 font-medium">Linha Alternativa</h4>
                <p className="text-sm">{alternativeHook}</p>
              </div>
              <p className="sm:col-span-2 text-center text-sm italic text-muted-foreground">
                Nenhuma é melhor. Só diferentes.
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
