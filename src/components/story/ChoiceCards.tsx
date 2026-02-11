"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHOICES, type Choice, type ChoiceOption } from "@/data/choices";

interface ChoiceCardsProps {
  onSelect: (choice: string, subChoice?: string) => void;
}

export function ChoiceCards({ onSelect }: ChoiceCardsProps) {
  const [flipped, setFlipped] = useState<string | null>(null);

  const handleCardClick = (choice: Choice) => {
    if (choice.subOptions.length === 0) {
      onSelect(choice.value);
      return;
    }
    if (flipped === choice.id) return;
    setFlipped(choice.id);
  };

  const handleSubSelect = (choice: Choice, sub: ChoiceOption) => {
    onSelect(choice.value, sub.value);
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {CHOICES.map((choice, i) => (
        <motion.div
          key={choice.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="relative h-[180px]"
        >
          <div
            className="relative h-full w-full cursor-pointer"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
              animate={{
                rotateY: flipped === choice.id ? 180 : 0,
              }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              {/* Front */}
              <motion.div
                className="absolute inset-0 rounded-xl border border-border bg-card p-4 shadow-lg flex flex-col items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(choice)}
              >
                <span className="mb-2 text-4xl">{choice.emoji}</span>
                <p className="text-center font-medium">{choice.label}</p>
                {choice.subOptions.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Clique para ver opções
                  </p>
                )}
              </motion.div>

              {/* Back with sub-options */}
              <motion.div
                className="absolute inset-0 rounded-xl border border-primary/50 bg-card p-4 flex flex-col"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <p className="mb-3 text-sm font-medium text-center">
                  {choice.label}
                </p>
                {choice.subOptions.map((sub, j) => (
                  <motion.button
                    key={sub.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.05 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubSelect(choice, sub);
                    }}
                    className="mb-2 w-full rounded-lg border border-border bg-secondary/50 py-2 text-sm hover:bg-primary/20 hover:border-primary/50 transition-colors"
                  >
                    {sub.label}
                  </motion.button>
                ))}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlipped(null);
                  }}
                  className="mt-auto text-xs text-muted-foreground hover:text-foreground"
                >
                  Voltar
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
