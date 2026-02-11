"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4 space-y-8">
          <h1 className="text-3xl font-bold">O que é E SE…</h1>
          <p className="text-muted-foreground leading-relaxed">
            E SE… é uma experiência interativa para você explorar linhas do tempo
            alternativas baseadas em escolhas que fez — ou não fez. Não é uma
            previsão. Não é um oráculo. É um espelho gentil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A mensagem central: <strong>Sua vida não seria melhor nem pior. Seria diferente.</strong>{" "}
            Toda escolha traz ganhos e custos invisíveis. Você escapou de
            problemas que não viveu.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Usamos linguagem probabilística — &ldquo;talvez&rdquo;, &ldquo;pode ser&rdquo;,
            &ldquo;é comum que&rdquo; — porque a internet vive de certezas. Você não precisa.
          </p>
          <Link href="/story/new">
            <Button>Começar seu E SE…</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
