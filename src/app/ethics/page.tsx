"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function EthicsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4 space-y-8">
          <h1 className="text-3xl font-bold">Ética e limites</h1>

          <section>
            <h2 className="text-xl font-semibold mb-4">O que E SE… não faz</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Não promete previsões reais sobre sua vida</li>
              <li>Não afirma fatos sobre você ou seu futuro</li>
              <li>Não cria culpa — o tom é gentil, para reduzir ansiedade</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Como tratamos suas escolhas</h2>
            <p className="text-muted-foreground leading-relaxed">
              Usamos sempre linguagem probabilística: &ldquo;pode&rdquo;, &ldquo;talvez&rdquo;,
              &ldquo;é comum que&rdquo;. Todo ganho vem com um custo, e todo custo com um ganho.
              Mostramos trade-offs, não julgamentos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Privacidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              No MVP, seus dados ficam no seu navegador (LocalStorage). Nada é
              enviado a servidores além do necessário para gerar a história. Sem
              login, sem rastreamento pessoal.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
