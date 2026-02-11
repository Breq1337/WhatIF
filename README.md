# E SE… — V2

> Nem melhor, nem pior — diferente.

Experiência interativa para simular linhas do tempo alternativas baseadas em escolhas. Histórias personalizadas com IA (Gemini) ou modelos locais offline.

## Como rodar

```bash
npm install
cp .env.example .env    # ou crie .env com DATABASE_URL="file:./dev.db"
npm run db:push
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

> No Windows: `copy .env.example .env`

### Variáveis de ambiente (.env.local)

| Variável | Descrição |
|----------|-----------|
| `GEMINI_API_KEY` | Chave da API Gemini. Sem ela, o app usa templates locais. |
| `DATABASE_URL` | SQLite: `file:./dev.db` |
| `NEXTAUTH_URL` | Ex: `http://localhost:3000` |
| `NEXTAUTH_SECRET` | String aleatória para sessões. |

## Confirmar que a IA está ativa

1. **AI Status (modo dev)**: Badge no canto inferior direito mostra "AI: Gemini" ou "AI: Offline".
2. **Logs server-side**: No terminal do servidor:
   - `[E-SE Generate] START requestId=... source=gemini`
   - `[E-SE Generate] END requestId=... durationMs=...`
   - `[E-SE Generate] FALLBACK` quando usa templates locais.

## Fluxo

- **Home** → CTA "Começar"
- **Wizard 3 passos**: Escolha → Pesos + idade → Texto (desejo/medo/detalhe) → Gerar
- **Resultado**: Resumo 20s, Timeline jogável, Revelações, Balança, Reflexões, Comparar, Share
- **Minhas escolhas**: Lista de histórias (LocalStorage para convidado; DB para logado)
- **Login/Registro**: Email + senha. Ao registrar com histórias de convidado, oferece migrar.

## Stack

- Next.js 14, TypeScript, Tailwind
- Framer Motion, Recharts, shadcn/ui
- Gemini API, Prisma + SQLite
- NextAuth (Credentials)

## Auditoria V2 (correções)

- **Gemini**: Integração confirmada. Fallback offline quando sem chave ou erro.
- **Prompts**: Anti-template (style seeds, blacklist clichês, variação lexical).
- **Cache**: 24h por contexto. Desabilitado em modo privado.
- **Logging**: requestId, duration, source (gemini/fallback/cache).
- **JSON**: Validação Zod + tentativa de reparo antes do fallback.
