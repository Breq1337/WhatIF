"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { updateReflectionAnswers } from "@/lib/storage";

interface ReflectionQuestionsProps {
  questions: string[];
  storyId: string;
  answers: Record<number, string>;
  onAnswer: (index: number, value: string) => void;
}

function inferValue(answers: Record<number, string>): string {
  const texts = Object.values(answers).filter(Boolean);
  if (texts.length === 0) return "Suas respostas vão revelar o que você valoriza.";
  const joined = texts.join(" ").toLowerCase();
  if (joined.includes("família") || joined.includes("familia")) return "Você parece valorizar conexões próximas quando a vida te testa.";
  if (joined.includes("liberdade") || joined.includes("autonomia")) return "Você parece valorizar liberdade quando precisa escolher.";
  if (joined.includes("estabilidade") || joined.includes("segurança")) return "Você parece valorizar segurança quando o mundo parece incerto.";
  if (joined.includes("amor") || joined.includes("amizade")) return "Você parece valorizar amor e conexão nas decisões difíceis.";
  if (joined.includes("crescimento") || joined.includes("aprender")) return "Você parece valorizar crescimento quando enfrenta o desconhecido.";
  return "Suas respostas revelam o que importa para você — guarde isso.";
}

export function ReflectionQuestions({
  questions,
  storyId,
  answers,
  onAnswer,
}: ReflectionQuestionsProps) {
  const [localAnswers, setLocalAnswers] = useState<Record<number, string>>(answers);

  const handleChange = (index: number, value: string) => {
    const next = { ...localAnswers, [index]: value };
    setLocalAnswers(next);
    onAnswer(index, value);
    updateReflectionAnswers(storyId, next);
  };

  const summary = inferValue(localAnswers);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Perguntas que doem mas curam</h3>
      {questions.slice(0, 3).map((q, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl border border-border bg-card/50 p-4"
        >
          <p className="mb-3 text-sm font-medium">{q}</p>
          <textarea
            placeholder="Sua resposta (opcional)"
            value={localAnswers[i] ?? ""}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm min-h-[80px]"
            rows={3}
          />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm italic"
      >
        {summary}
      </motion.div>
    </div>
  );
}
