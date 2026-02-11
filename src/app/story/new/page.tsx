"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChoiceCards } from "@/components/story/ChoiceCards";
import { ValueSliders } from "@/components/story/ValueSliders";
import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/utils";
import { saveStory } from "@/lib/storage";
import { incrementChoiceCount } from "@/lib/storage";
import type { ValueWeights } from "@/lib/schemas";

const DEFAULT_WEIGHTS: ValueWeights = {
  security: 5,
  freedom: 5,
  love: 5,
  ambition: 5,
  family: 5,
  adventure: 5,
};

export default function NewStoryPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | "generating">(1);
  const [choice, setChoice] = useState<string | null>(null);
  const [subChoice, setSubChoice] = useState<string | undefined>();
  const [valueWeights, setValueWeights] = useState<ValueWeights>(DEFAULT_WEIGHTS);
  const [ageRange, setAgeRange] = useState("");
  const [fearOfLosing, setFearOfLosing] = useState("");
  const [desireToGain, setDesireToGain] = useState("");
  const [privateMode, setPrivateMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectChoice = useCallback((c: string, sub?: string) => {
    setChoice(c);
    setSubChoice(sub);
    setStep(2);
    incrementChoiceCount(c);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!choice) return;
    setStep("generating");
    setError(null);

    const id = generateId();
    const body = {
      choice,
      subChoice,
      valueWeights,
      ageRange: ageRange || undefined,
      fearOfLosing: fearOfLosing || undefined,
      desireToGain: desireToGain || undefined,
      privateMode,
    };

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Erro ao gerar. Tente novamente.");
      }

      const data = await res.json();
      const { _meta, ...story } = data;
      const meta = _meta || {};

      saveStory({
        id,
        choice,
        subChoice,
        story,
        createdAt: new Date().toISOString(),
        aiProvider: meta.aiProvider,
        model: meta.model,
        offlineFallback: meta.offlineFallback,
      });

      router.push(`/story/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar.");
      setStep(3);
    }
  }, [
    choice,
    subChoice,
    valueWeights,
    ageRange,
    fearOfLosing,
    desireToGain,
    privateMode,
    router,
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mb-8 flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  step === s || (typeof step === "number" && step > s)
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="1"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="mb-6 font-display text-2xl font-semibold">
                  Qual escolha você quer explorar?
                </h1>
                <ChoiceCards onSelect={handleSelectChoice} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="2"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
              >
                <p className="mb-6 text-muted-foreground">
                  Escolhido: <strong className="text-foreground">{choice}</strong>
                  {subChoice && (
                    <> → <strong className="text-foreground">{subChoice}</strong></>
                  )}
                </p>
                <ValueSliders values={valueWeights} onChange={setValueWeights} />
                <div className="mt-6">
                  <label className="mb-2 block text-sm">Faixa etária (opcional)</label>
                  <input
                    type="text"
                    placeholder="ex: 25-35"
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5"
                  />
                </div>
                <div className="mt-6 flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Voltar
                  </Button>
                  <Button onClick={() => setStep(3)}>Continuar</Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="3"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <h2 className="font-display text-xl font-semibold">
                  Conte um pouco mais (quanto mais, mais personalizado)
                </h2>
                <div>
                  <label className="mb-2 block text-sm">Medo de perder</label>
                  <input
                    type="text"
                    placeholder="ex: estabilidade, pessoas próximas"
                    value={fearOfLosing}
                    onChange={(e) => setFearOfLosing(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm">Desejo de ganhar</label>
                  <input
                    type="text"
                    placeholder="ex: novas experiências"
                    value={desireToGain}
                    onChange={(e) => setDesireToGain(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5"
                  />
                </div>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={privateMode}
                    onChange={(e) => setPrivateMode(e.target.checked)}
                    className="rounded border-input"
                  />
                  <span className="text-sm text-muted-foreground">
                    Modo privado (não usar cache para economizar cota)
                  </span>
                </label>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Voltar
                  </Button>
                  <Button onClick={handleGenerate}>Gerar minha história</Button>
                </div>
              </motion.div>
            )}

            {step === "generating" && (
              <motion.div
                key="gen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center py-20"
              >
                {/* Spinner: anel duplo com rotação suave */}
                <div className="relative mb-8 flex h-16 w-16 items-center justify-center">
                  <motion.div
                    className="absolute h-16 w-16 rounded-full border-2 border-primary/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute h-12 w-12 rounded-full border-2 border-transparent border-t-primary border-r-primary/60"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                </div>
                {/* Linha do tempo em miniatura — pontos que acendem em sequência */}
                <div className="mb-8 flex gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40"
                      animate={{
                        backgroundColor: [
                          "hsl(var(--muted-foreground) / 0.4)",
                          "hsl(var(--primary) / 0.9)",
                          "hsl(var(--muted-foreground) / 0.4)",
                        ],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
                <motion.p
                  className="text-center text-muted-foreground"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  Pensando na sua linha do tempo alternativa…
                </motion.p>
                <motion.p
                  className="mt-2 text-sm text-muted-foreground/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  Nem melhor, nem pior — diferente.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
