"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4 space-y-8">
          <h1 className="text-3xl font-bold">Termos de uso</h1>
          <p className="text-muted-foreground leading-relaxed">
            E SE… é uma ferramenta de reflexão e entretenimento. O conteúdo
            gerado não constitui aconselhamento profissional, psicológico ou
            jurídico. Use por sua conta e risco.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Não nos responsabilizamos por decisões tomadas com base no conteúdo
            da plataforma. O objetivo é provocar reflexão, não substituir
            julgamento próprio.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
