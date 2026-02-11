"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIStatusBadge } from "@/components/layout/AIStatusBadge";
import { ForkInRoadIcon } from "@/components/icons/ForkInRoad";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-16">
        <div className="relative mx-auto max-w-2xl px-4">
          <div className="absolute -top-20 right-0 opacity-[0.07]">
            <ForkInRoadIcon className="h-48 w-48 text-primary" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              E SE…
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Nem melhor, nem pior — diferente.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-center text-muted-foreground leading-relaxed"
          >
            Sua vida não seria melhor nem pior. Seria diferente.
            <br />
            Toda escolha traz ganhos e custos invisíveis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <Link href="/story/new">
              <Button size="lg" className="font-display text-base px-8">
                Começar
              </Button>
            </Link>
            <Link
              href="/choices"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Minhas escolhas
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
      <AIStatusBadge />
    </div>
  );
}
