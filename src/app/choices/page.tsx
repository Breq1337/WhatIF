"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getStoredStories } from "@/lib/storage";
import { Cpu, CloudOff, BookOpen } from "lucide-react";

type StoryItem = {
  id: string;
  choice: string;
  subChoice?: string;
  story: { title: string };
  createdAt: string;
  aiProvider?: string;
  offlineFallback?: boolean;
  fromDb?: boolean;
};

export default function ChoicesPage() {
  const { data: session } = useSession();
  const [stories, setStories] = useState<StoryItem[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/stories")
        .then((r) => r.json())
        .then((list: Array<{ id: string; title: string; inputJson: string; outputJson: string; aiProvider: string }>) => {
          const items: StoryItem[] = list.map((s) => {
            let input = { choice: "", subChoice: "" };
            try {
              input = JSON.parse(s.inputJson);
            } catch {}
            let output = { title: s.title };
            try {
              output = JSON.parse(s.outputJson);
            } catch {}
            return {
              id: s.id,
              choice: input.choice,
              subChoice: input.subChoice,
              story: { title: output.title || s.title },
              createdAt: "",
              aiProvider: s.aiProvider,
              offlineFallback: s.aiProvider === "offline",
              fromDb: true,
            };
          });
          setStories(items);
        })
        .catch(() => {
          const list = getStoredStories();
          setStories(
            list.map((s) => ({
              id: s.id,
              choice: s.choice,
              subChoice: s.subChoice,
              story: (s.story as { title: string }) || { title: "História" },
              createdAt: s.createdAt,
              aiProvider: s.aiProvider,
              offlineFallback: s.offlineFallback,
            }))
          );
        });
    } else {
      const list = getStoredStories();
      setStories(
        list.map((s) => ({
          id: s.id,
          choice: s.choice,
          subChoice: s.subChoice,
          story: (s.story as { title: string }) || { title: "História" },
          createdAt: s.createdAt,
          aiProvider: s.aiProvider,
          offlineFallback: s.offlineFallback,
        }))
      );
    }
  }, [session]);

  const isEmpty = stories.length === 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="font-display text-3xl font-bold">Minhas escolhas</h1>
          <p className="mt-2 text-muted-foreground">
            Suas histórias alternativas salvas localmente.
          </p>

          {!session && (
            <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
              <p>
                Crie uma conta para salvar no servidor e acessar de qualquer dispositivo.
              </p>
              <Link href="/login" className="mt-2 inline-block text-primary hover:underline">
                Entrar ou registrar
              </Link>
            </div>
          )}

          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 flex flex-col items-center py-12 text-center"
            >
              <BookOpen className="mb-4 h-16 w-16 text-muted-foreground/50" />
              <p className="text-muted-foreground">Nenhuma história ainda.</p>
              <Link
                href="/story/new"
                className="mt-4 text-primary hover:underline"
              >
                Criar sua primeira história
              </Link>
            </motion.div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {stories.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/story/${s.id}`}
                    className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-card/80"
                  >
                    <h3 className="font-medium">{s.story.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {s.choice}
                      {s.subChoice && ` → ${s.subChoice}`}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      {s.offlineFallback ? (
                        <CloudOff className="h-3.5 w-3.5" />
                      ) : (
                        <Cpu className="h-3.5 w-3.5 text-primary" />
                      )}
                      {s.offlineFallback ? "Offline" : "IA"}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
