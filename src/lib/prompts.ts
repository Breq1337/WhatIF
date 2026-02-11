import type { ValueWeights } from "./schemas";
import { REVEAL_MAX_CHARS } from "./schemas";

export interface GenerateContext {
  choice: string;
  subChoice?: string;
  valueWeights: ValueWeights;
  ageRange?: string;
  fearOfLosing?: string;
  desireToGain?: string;
  privateMode?: boolean;
}

const STYLE_SEEDS = [
  { name: "calmo", instr: "Frases curtas e claras. Ritmo tranquilo, sem sensação de pressa." },
  { name: "concreto", instr: "Cenas e situações específicas. Evite abstrações; use detalhes do dia a dia." },
  { name: "direto", instr: "Objetivo. Uma ideia por frase. Sem rodeios." },
  { name: "reflexivo", instr: "Perguntas ligadas ao contexto da escolha. Foco no que mudaria na prática." },
  { name: "equilibrado", instr: "Mostra ganhos e custos de forma clara. Nem otimista nem pessimista." },
];

const CLICHES_BLACKLIST = [
  "no final do dia",
  "a vida é uma jornada",
  "tudo acontece por um motivo",
  "o que não te mata te fortalece",
  "cada um no seu tempo",
  "o importante é a jornada",
  "a grama do vizinho",
  "dar a volta por cima",
  "virar a página",
  "fechar um ciclo",
  "abrir um novo capítulo",
];

export function buildSystemRules(): string {
  return `Você gera histórias alternativas a partir de escolhas reais do usuário.
Regras: (1) Use sempre linguagem probabilística — "pode", "talvez", "é comum" — nunca previsões certeiras. (2) Não use clichês: ${CLICHES_BLACKLIST.join(", ")}. (3) Cada resposta deve variar em vocabulário e estrutura. (4) Toda escolha tem trade-offs: ganhos e custos. (5) Tom claro e acolhedor, sem culpar ou julgar.`;
}

export function buildPrompt(context: GenerateContext): string {
  const { choice, subChoice, valueWeights, ageRange, fearOfLosing, desireToGain } = context;

  const weightsDesc = Object.entries(valueWeights)
    .map(([k, v]) => `${k}: ${v}/10`)
    .join(", ");

  const style = STYLE_SEEDS[Math.floor(Math.random() * STYLE_SEEDS.length)];

  const userContextBlock = [
    ageRange ? `Faixa etária: ${ageRange}` : null,
    fearOfLosing ? `Medo de perder: ${fearOfLosing}` : null,
    desireToGain ? `Desejo de ganhar: ${desireToGain}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `${buildSystemRules()}

CONTEXTO DA ESCOLHA:
- Escolha principal: ${choice}
${subChoice ? `- Sub-opção: ${subChoice}` : ""}
- Pesos de valores (0-10): ${weightsDesc}
${userContextBlock ? `\nO QUE O USUÁRIO DISSE (OBRIGATÓRIO REFLETIR NISSO):\n${userContextBlock}` : ""}

ESTILO DESTA HISTÓRIA: ${style.name}
Instrução: ${style.instr}

EXIGÊNCIAS OBRIGATÓRIAS:
1. Inclua pelo menos um detalhe concreto (lugar, momento, situação do cotidiano).
2. Inclua um trade-off que não seja óbvio — algo que a pessoa talvez não considere de imediato.
3. Cada evento da timeline: um ganho e um custo ligados ao que o usuário disse (desejo/medo).
4. Varie a forma de começar gains/costs (tempo, ação, sensação) — não use a mesma estrutura em todos.
5. O closing deve terminar com exatamente: "Nem melhor, nem pior — diferente."
6. Timeline: 5 a 7 eventos. Campos: when, event, gain, cost, confidence (low|medium|high).
7. reflectionQuestions: 3 perguntas específicas ao contexto da escolha (não genéricas).
8. microReveals: hiddenPrice, unexpectedRelief, missedJoy, newProblemYouDidntHave — 1 a 2 frases cada.

PROIBIDO: texto genérico. Se o usuário citou "medo de perder estabilidade", aborde isso de forma explícita.
PROIBIDO: todos os gains ou costs começando com a mesma palavra ou estrutura.

RETORNE APENAS JSON VÁLIDO, SEM markdown, SEM \`\`\`json:
{
  "title": "string (título claro e específico à escolha)",
  "hook": "string (1-2 frases que situam o cenário)",
  "summary20s": "string (resumo em 1-2 frases)",
  "timeline": [{"when": "string", "event": "string", "gain": "string", "cost": "string", "confidence": "low|medium|high"}],
  "tradeoffScale": {"gains": ["string"], "costs": ["string"], "problemsAvoided": ["string"], "silentBlessingsRealLife": ["string"]},
  "reflectionQuestions": ["string"],
  "microReveals": {"hiddenPrice": "string", "unexpectedRelief": "string", "missedJoy": "string", "newProblemYouDidntHave": "string"},
  "closing": "string (terminar com 'Nem melhor, nem pior — diferente.')"
}`;
}

export function buildRevealPrompt(
  context: GenerateContext,
  revealType: "hiddenPrice" | "unexpectedRelief" | "missedJoy" | "newProblemYouDidntHave",
  existingContent: string
): string {
  const typeLabels: Record<typeof revealType, string> = {
    hiddenPrice: "o preço escondido dessa escolha alternativa",
    unexpectedRelief: "um alívio inesperado que a pessoa teria na linha alternativa",
    missedJoy: "uma alegria que a pessoa pode ter perdido por não ter feito essa escolha",
    newProblemYouDidntHave: "um problema que a pessoa teria hoje na linha alternativa, mas não tem na vida real",
  };

  return `${buildSystemRules()}

REVELAÇÃO (microReveal):
- Resposta em 1 a 3 frases. Máximo ${REVEAL_MAX_CHARS} caracteres (incluindo espaços).
- Linguagem probabilística ("talvez", "pode ser"). Ligada à escolha e ao que o usuário disse (desejo/medo).
- Tom claro e acolhedor; sem culpar ou julgar. Prefira situações concretas a frases genéricas. Sem clichês.
- Retorne apenas JSON válido, sem markdown: {"text": "sua resposta aqui"}.

Contexto: Escolha "${context.choice}"${context.subChoice ? ` (${context.subChoice})` : ""}.
Conteúdo já gerado: ${existingContent.slice(0, 600)}...

Tema: ${typeLabels[revealType]}.
Retorne APENAS: {"text": "sua resposta aqui"} (máximo ${REVEAL_MAX_CHARS} caracteres em "text").`;
}
