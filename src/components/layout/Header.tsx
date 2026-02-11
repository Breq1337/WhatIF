"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { BookOpen, LogIn, LogOut, User } from "lucide-react";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          E SE…
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/choices" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <BookOpen className="h-4 w-4" />
            Minhas escolhas
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors hidden sm:inline">
            Sobre
          </Link>
          <Link href="/story/new" className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors">
            Nova história
          </Link>
          {status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          ) : (
            <Link href="/login" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <LogIn className="h-4 w-4" />
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
