"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getStoredStories } from "@/lib/storage";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [migrateOffer, setMigrateOffer] = useState(false);

  const guestStories = typeof window !== "undefined" ? getStoredStories() : [];
  const hasGuestStories = guestStories.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar conta.");
        return;
      }

      if (hasGuestStories) {
        setMigrateOffer(true);
        setLoading(false);
        return;
      }

      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (signInRes?.error) {
        setError("Conta criada. Faça login.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  async function handleMigrate() {
    setLoading(true);
    try {
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (signInRes?.error) throw new Error("SignIn failed");

      const migrateRes = await fetch("/api/stories/migrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stories: guestStories.map((s) => ({
            id: s.id,
            choice: s.choice,
            subChoice: s.subChoice,
            story: s.story,
            aiProvider: s.aiProvider,
            model: null,
          })),
        }),
      });
      const migrateData = await migrateRes.json();

      router.push("/choices");
      router.refresh();
    } catch {
      setError("Erro na migração.");
    } finally {
      setLoading(false);
    }
  }

  if (migrateOffer) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="mx-auto max-w-md px-4">
            <h1 className="font-display text-2xl font-bold">Migrar histórias?</h1>
            <p className="mt-2 text-muted-foreground">
              Você tem {guestStories.length} história(s) salva(s) como convidado.
              Deseja migrar para sua nova conta?
            </p>
            <div className="mt-6 flex gap-4">
              <Button onClick={handleMigrate} disabled={loading}>
                {loading ? "Migrando…" : "Sim, migrar"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  signIn("credentials", { email, password, redirect: false }).then(() => {
                    router.push("/");
                    router.refresh();
                  });
                }}
              >
                Não, pular
              </Button>
            </div>
            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-sm px-4">
          <h1 className="font-display text-2xl font-bold">Criar conta</h1>
          <p className="mt-2 text-muted-foreground">
            Ou{" "}
            <Link href="/login" className="text-primary hover:underline">
              entrar
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm">Senha (mín. 8 caracteres)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Criando…" : "Criar conta"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
