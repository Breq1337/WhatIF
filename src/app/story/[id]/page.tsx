"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TimelineNodes } from "@/components/story/TimelineNodes";
import { RevealButtons } from "@/components/story/RevealButtons";
import { TradeoffBalance } from "@/components/story/TradeoffBalance";
import { ReflectionQuestions } from "@/components/story/ReflectionQuestions";
import { CompareMode } from "@/components/story/CompareMode";
import { ShareCard } from "@/components/story/ShareCard";
import { CommunityStats } from "@/components/story/CommunityStats";
import { ValuesPanel } from "@/components/story/ValuesPanel";
import { AIStatusBadge } from "@/components/layout/AIStatusBadge";
import { Button } from "@/components/ui/button";
import { getStoryById, saveToDiary } from "@/lib/storage";
import type { StoryResponse } from "@/lib/schemas";
import type { GenerateContext } from "@/lib/prompts";

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [stored, setStored] = useState<{
    story: StoryResponse;
    choice: string;
    subChoice?: string;
  } | null>(null);
  const [timelineResponses, setTimelineResponses] = useState<
    Record<number, "sim" | "nao" | "nao_sei">
  >({});
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<number, string>>({});
  const [revealedContent, setRevealedContent] = useState<Record<string, string>>({});
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    const data = getStoryById(id);
    if (data && data.story) {
      setStored({
        story: data.story as StoryResponse,
        choice: data.choice,
        subChoice: data.subChoice,
      });
      setTimelineResponses((data.timelineResponses as Record<number, "sim" | "nao" | "nao_sei">) || {});
      setReflectionAnswers((data.reflectionAnswers as Record<number, string>) || {});
    } else {
      fetch(`/api/stories/${id}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((found) => {
          if (found) {
            setStored({
              story: found.story,
              choice: found.choice,
              subChoice: found.subChoice,
            });
          }
        })
        .catch(() => {});
    }
  }, [id]);

  const context: GenerateContext = useMemo(
    () => ({
      choice: stored?.choice ?? "",
      subChoice: stored?.subChoice,
      valueWeights: {
        security: 5,
        freedom: 5,
        love: 5,
        ambition: 5,
        family: 5,
        adventure: 5,
      },
    }),
    [stored]
  );

  const existingContent = useMemo(
    () =>
      stored
        ? `${stored.story.title} ${stored.story.hook} ${JSON.stringify(stored.story.tradeoffScale)}`
        : "",
    [stored]
  );

  const handleSaveToDiary = () => {
    if (stored) {
      saveToDiary({
        id,
        title: stored.story.title,
        date: new Date().toISOString(),
      });
      setShowFinal(true);
    }
  };

  if (!stored) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <p className="text-muted-foreground">História não encontrada.</p>
            <Link href="/story/new" className="text-primary hover:underline">
              Criar nova história
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { story } = stored;

  if (showFinal) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-xl px-4 text-center space-y-8"
          >
            <p className="text-xl font-medium">
              Você escapou de dores que não viraram memória.
            </p>
            <p className="text-muted-foreground italic">
              Nem melhor, nem pior — diferente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/story/new">
                <Button>Fazer outro E SE…</Button>
              </Link>
              <Button variant="outline" onClick={() => router.back()}>
                Voltar à história
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 space-y-12">
          {/* Hero */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-3xl font-bold">{story.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground italic">
              &ldquo;{story.hook}&rdquo;
            </p>
            {(story as { summary20s?: string }).summary20s && (
              <div className="mt-6 rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-sm">
                <p className="text-muted-foreground">
                  {(story as { summary20s: string }).summary20s}
                </p>
              </div>
            )}
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-6 text-xl font-semibold">Linha do tempo jogável</h2>
            <TimelineNodes
              timeline={story.timeline}
              storyId={id}
              responses={timelineResponses}
              onResponseChange={(i, v) =>
                setTimelineResponses((r) => ({ ...r, [i]: v }))
              }
            />
            <ValuesPanel
              responses={timelineResponses}
              count={story.timeline.length}
            />
          </motion.section>

          {/* Revelations */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-6 text-xl font-semibold">Revelações em camadas</h2>
            <RevealButtons
              context={context}
              existingContent={existingContent}
              initialReveals={revealedContent}
              onReveal={(k, v) => setRevealedContent((r) => ({ ...r, [k]: v }))}
            />
          </motion.section>

          {/* Balance */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-6 text-xl font-semibold">Balança de trocas</h2>
            <TradeoffBalance
              gains={story.tradeoffScale.gains}
              costs={story.tradeoffScale.costs}
              problemsAvoided={story.tradeoffScale.problemsAvoided}
              silentBlessings={story.tradeoffScale.silentBlessingsRealLife}
            />
          </motion.section>

          {/* Reflection */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ReflectionQuestions
              questions={story.reflectionQuestions}
              storyId={id}
              answers={reflectionAnswers}
              onAnswer={(i, v) =>
                setReflectionAnswers((r) => ({ ...r, [i]: v }))
              }
            />
          </motion.section>

          {/* Compare */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <CompareMode
              alternativeTitle={story.title}
              alternativeHook={story.hook}
            />
          </motion.section>

          {/* Share + Stats */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid gap-8 sm:grid-cols-2"
          >
            <ShareCard title={story.title} hook={story.hook} />
            <CommunityStats />
          </motion.section>

          {/* Closing */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center"
          >
            <p className="text-lg italic">{story.closing}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/story/new">
                <Button>Fazer outro E SE…</Button>
              </Link>
              <Link href="/story/new">
                <Button variant="outline">Editar e regerar</Button>
              </Link>
              <Button variant="ghost" onClick={handleSaveToDiary}>
                Salvar no diário
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Você escapou de dores que não viraram memória.
            </p>
          </motion.section>
        </div>
      </main>
      <Footer />
      <AIStatusBadge />
    </div>
  );
}
