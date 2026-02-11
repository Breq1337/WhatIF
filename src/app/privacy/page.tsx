"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4 space-y-8">
          <h1 className="text-3xl font-bold">Privacidade</h1>
          <p className="text-muted-foreground leading-relaxed">
            No MVP, E SE… armazena dados localmente no seu navegador
            (LocalStorage): histórias geradas, respostas e preferências. Nada
            disso é enviado a bancos de dados externos por padrão.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Para gerar histórias com IA, enviamos sua escolha e pesos de valores
            para a API do Gemini. Esses dados não são armazenados por nós.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Estatísticas da comunidade são agregadas e anônimas — sem IP, sem
            identificadores pessoais.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
