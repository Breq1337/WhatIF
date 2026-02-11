import type { StoryResponse } from "./schemas";

export const FALLBACK_STORIES: Record<string, StoryResponse> = {
  "mudar de cidade": {
    title: "A cidade que você não conheceu",
    hook: "E se você tivesse feito as malas naquele ano? Talvez sua vida tivesse ganho novos ritmos — e perdido alguns rostos familiares.",
    timeline: [
      { when: "Primeiros 6 meses", event: "Adaptação e solidão inicial", gain: "Novos horizontes, senso de autonomia", cost: "Saudade de quem ficou", confidence: "high" },
      { when: "1 ano", event: "Primeiro emprego na nova cidade", gain: "Oportunidades que não existiam antes", cost: "Rede de apoio menor", confidence: "medium" },
      { when: "2 anos", event: "Construindo nova rotina", gain: "Amizades que talvez não teria", cost: "Algumas memórias de família perdidas", confidence: "medium" },
      { when: "5 anos", event: "Possível retorno ou permanência", gain: "Clareza sobre o que realmente importa", cost: "Perguntas que nunca terão resposta", confidence: "low" },
    ],
    tradeoffScale: {
      gains: ["Liberdade de recomeçar", "Novas conexões", "Experiências únicas"],
      costs: ["Distância da família", "Adaptação cultural", "Construir tudo do zero"],
      problemsAvoided: ["Rotina que talvez tivesse engolido você", "O ar parado de sempre"],
      silentBlessingsRealLife: ["As pessoas que estão perto hoje", "Os cantos que você conhece de cor"],
    },
    reflectionQuestions: [
      "O que você ganhou por ter ficado que talvez não valorize o suficiente?",
      "Que medo, se qualquer, te impede de mudar hoje?",
      "Se você pudesse enviar uma mensagem para a versão que ficou, o que diria?",
    ],
    microReveals: {
      hiddenPrice: "Talvez a solidão dos primeiros anos tivesse te ensinado a conviver melhor consigo mesmo.",
      unexpectedRelief: "Pode ser que você tivesse encontrado um silêncio que a cidade atual nunca te deu.",
      missedJoy: "Aquela festa de aniversário que você perdeu talvez tivesse sido um marco que não volta.",
      newProblemYouDidntHave: "Talvez hoje você tivesse um apartamento vazio em outra cidade, perguntando se valeu a pena.",
    },
    closing: "Sua vida não seria melhor nem pior. Seria diferente. Nem melhor, nem pior — diferente.",
  },
  "trocar de curso": {
    title: "O diploma que você não pegou",
    hook: "E se você tivesse trocado naquele semestre? Talvez um caminho inteiramente outro — com frustrações e descobertas que você nunca viveu.",
    timeline: [
      { when: "Mudança", event: "Trancamento e nova matrícula", gain: "Senso de estar no controle", cost: "Tempo e dinheiro já investidos", confidence: "high" },
      { when: "1 ano depois", event: "Adaptação ao novo curso", gain: "Paixão renovada pelos estudos", cost: "Comparação com quem seguiu", confidence: "medium" },
      { when: "Formatura", event: "Novo diploma na mão", gain: "Carreira em outra direção", cost: "Anos a mais de estudo", confidence: "medium" },
      { when: "Hoje", event: "Vida profissional alternativa", gain: "Talvez mais realização", cost: "Talvez mais incerteza", confidence: "low" },
    ],
    tradeoffScale: {
      gains: ["Alinhamento com paixão", "Novas habilidades", "Outro tipo de rede"],
      costs: ["Tempo perdido", "Expectativas da família", "Dívida ou sacrifícios"],
      problemsAvoided: ["O burnout do curso anterior", "A sensação de estar no lugar errado"],
      silentBlessingsRealLife: ["O que você aprendeu mesmo sem amar", "As amizades que vieram do caminho atual"],
    },
    reflectionQuestions: [
      "O que o curso atual te deu que você não imaginava na época?",
      "Você ainda sente o mesmo sobre essa escolha ou algo mudou?",
      "O que você diria para quem está pensando em trocar agora?",
    ],
    microReveals: {
      hiddenPrice: "Talvez a troca tivesse trazido um tipo de pressão que você não conhece hoje.",
      unexpectedRelief: "Pode ser que o novo curso tivesse te mostrado que o problema nunca foi a área.",
      missedJoy: "Aquela turma que você deixou pode ter vivido coisas que você nunca vai saber.",
      newProblemYouDidntHave: "Talvez hoje você estivesse em um mercado saturado, se perguntando se deveria ter continuado.",
    },
    closing: "Nem melhor, nem pior — diferente. Toda escolha traz ganhos e custos invisíveis.",
  },
  "aceitar trabalho": {
    title: "O sim que você deu — ou não",
    hook: "E se você tivesse aceitado aquele trabalho? Talvez uma rotina completamente outra — com chefe, colegas e projetos que você nunca conheceu.",
    timeline: [
      { when: "Primeiro mês", event: "Adaptação à nova empresa", gain: "Salário diferente, nova experiência", cost: "Despedida do antigo ambiente", confidence: "high" },
      { when: "6 meses", event: "Primeiro ciclo de entregas", gain: "Crescimento em nova direção", cost: "Estresse ou rotina pesada", confidence: "medium" },
      { when: "2 anos", event: "Promoção ou mudança interna", gain: "Carreira em outro ritmo", cost: "Relações que não construiu", confidence: "low" },
      { when: "Hoje", event: "Onde você estaria", gain: "Talvez mais estabilidade ou mais desafio", cost: "Outras portas fechadas", confidence: "low" },
    ],
    tradeoffScale: {
      gains: ["Nova rede profissional", "Aprendizado em outra área", "Possível crescimento financeiro"],
      costs: ["Tempo com família/amigos", "Saúde mental em outro nível", "Projetos pessoais adiados"],
      problemsAvoided: ["O chefe difícil que ouviu falar", "A cultura tóxica que poderia existir"],
      silentBlessingsRealLife: ["O tempo que você teve para outras coisas", "As pessoas que conheceu no caminho atual"],
    },
    reflectionQuestions: [
      "O que você ganhou por ter recusado que não estava nos termos do contrato?",
      "O medo de mudar te protegeu ou te limitou?",
      "Se a oferta voltasse amanhã, sua resposta seria a mesma?",
    ],
    microReveals: {
      hiddenPrice: "Talvez as horas extras tivessem custado relações que você valoriza hoje.",
      unexpectedRelief: "Pode ser que você tivesse encontrado um mentor que mudaria sua trajetória.",
      missedJoy: "Aquele almoço com a equipe antiga talvez tivesse virado só memória.",
      newProblemYouDidntHave: "Talvez hoje você estivesse preso a um contrato que não te deixa sonhar.",
    },
    closing: "Nem melhor, nem pior — diferente. Você escapou de problemas que não viveu.",
  },
  "terminar relacionamento": {
    title: "O amor que continuou — ou parou",
    hook: "E se você tivesse terminado naquele dia? Talvez outro tipo de solidão, outras pessoas, outras dores e alegrias.",
    timeline: [
      { when: "Primeiras semanas", event: "Luto e liberdade", gain: "Espaço para si", cost: "Saudade e dúvida", confidence: "high" },
      { when: "6 meses", event: "Reconstrução", gain: "Novas possibilidades", cost: "Memórias que pesam", confidence: "medium" },
      { when: "2 anos", event: "Outro amor ou solidão consciente", gain: "Crescimento emocional", cost: "O que não viveu com aquela pessoa", confidence: "low" },
      { when: "Hoje", event: "Onde o coração estaria", gain: "Talvez paz, talvez arrependimento", cost: "Perguntas sem resposta", confidence: "low" },
    ],
    tradeoffScale: {
      gains: ["Autoconhecimento", "Outras conexões", "Liberdade de escolha"],
      costs: ["O que construíram juntos", "Segurança emocional", "Histórias compartilhadas"],
      problemsAvoided: ["Conflitos que poderiam ter piorado", "Um amor que não era mais"],
      silentBlessingsRealLife: ["O que aprenderam um com o outro", "Os momentos que vocês guardam"],
    },
    reflectionQuestions: [
      "O que esse relacionamento te ensinou sobre o que você quer?",
      "Você está onde está por medo ou por escolha?",
      "O que você precisa ouvir de si mesmo agora?",
    ],
    microReveals: {
      hiddenPrice: "Talvez a solidão tivesse te mostrado um lado seu que o relacionamento escondia.",
      unexpectedRelief: "Pode ser que você tivesse encontrado uma paz que o amor antigo não dava.",
      missedJoy: "Aquelas risadas em casa talvez tivessem virado só eco.",
      newProblemYouDidntHave: "Talvez hoje você estivesse em outro relacionamento tóxico, perguntando por que saiu do anterior.",
    },
    closing: "Nem melhor, nem pior — diferente. Toda escolha é um pacote completo.",
  },
  "começar projeto": {
    title: "O projeto que você adiou",
    hook: "E se você tivesse começado naquele ano? Talvez um produto, um livro, um negócio — ou talvez uma lição dura sobre tentar.",
    timeline: [
      { when: "Início", event: "Primeiros passos", gain: "Empolgação e momentum", cost: "Tempo e energia investidos", confidence: "high" },
      { when: "6 meses", event: "Obstáculos e dúvidas", gain: "Aprendizado na prática", cost: "Sacrifícios em outras áreas", confidence: "medium" },
      { when: "2 anos", event: "Resultado ou pivô", gain: "Experiência que muda a vida", cost: "O que deixou de fazer", confidence: "low" },
      { when: "Hoje", event: "Onde o projeto estaria", gain: "Talvez realização, talvez fracasso que ensinou", cost: "Outras oportunidades não vividas", confidence: "low" },
    ],
    tradeoffScale: {
      gains: ["Autonomia criativa", "Novas habilidades", "Possível impacto"],
      costs: ["Estabilidade sacrificada", "Relações negligenciadas", "Incerteza prolongada"],
      problemsAvoided: ["O burnout de empreender sozinho", "A decepção de um fracasso público"],
      silentBlessingsRealLife: ["A estabilidade que você tem", "O tempo com quem ama"],
    },
    reflectionQuestions: [
      "O que te impediu de começar? Medo, tempo ou prioridades?",
      "O projeto ainda faz sentido ou era de outra fase?",
      "Que pequeno passo você poderia dar esta semana?",
    ],
    microReveals: {
      hiddenPrice: "Talvez o projeto tivesse consumido anos sem dar o retorno esperado.",
      unexpectedRelief: "Pode ser que o fracasso tivesse te libertado de uma expectativa que te paralisava.",
      missedJoy: "Aquele momento com a família que você teria perdido trabalhando.",
      newProblemYouDidntHave: "Talvez hoje você estivesse preso a um negócio que não te deixa viver.",
    },
    closing: "Nem melhor, nem pior — diferente. Você escapou de dores que não viraram memória.",
  },
  "ficar ou ir embora": {
    title: "O lugar onde você ficou",
    hook: "E se você tivesse ido embora — ou ficado? Talvez outra cidade, outro país, outra vida inteira.",
    timeline: [
      { when: "Decisão", event: "Ficar ou partir", gain: "Clareza momentânea", cost: "A dúvida que fica", confidence: "high" },
      { when: "1 ano", event: "Vida na decisão tomada", gain: "Novas rotinas ou raízes mais profundas", cost: "O que a outra opção traria", confidence: "medium" },
      { when: "5 anos", event: "Consequências visíveis", gain: "Histórias que você viveu", cost: "Histórias que não viveu", confidence: "low" },
      { when: "Hoje", event: "Onde você está", gain: "O que construiu", cost: "A curiosidade do que poderia ser", confidence: "low" },
    ],
    tradeoffScale: {
      gains: ["Estabilidade ou aventura", "Conexões locais ou globais", "Familiaridade ou novidade"],
      costs: ["O que a outra opção oferecia", "Segurança ou liberdade", "Raízes ou asas"],
      problemsAvoided: ["O que poderia ter dado errado longe", "O que poderia ter dado errado perto"],
      silentBlessingsRealLife: ["O lugar que você chama de lar", "As pessoas que estão ao redor"],
    },
    reflectionQuestions: [
      "O que esse lugar te deu que você não reconhece o suficiente?",
      "Você está preso ou enraizado?",
      "O que precisaria mudar para você se sentir em paz com a decisão?",
    ],
    microReveals: {
      hiddenPrice: "Talvez a mudança tivesse te mostrado que o problema nunca foi o lugar.",
      unexpectedRelief: "Pode ser que ficar te tenha dado tempo para coisas que a pressa não permite.",
      missedJoy: "Aquela paisagem, aquela pessoa que você nunca conheceu.",
      newProblemYouDidntHave: "Talvez hoje você estivesse em outro lugar, sentindo falta de casa.",
    },
    closing: "Nem melhor, nem pior — diferente. A internet vive de certezas. Você não precisa.",
  },
};

const CHOICE_ALIASES: Record<string, string> = {
  "trocar de curso/carreira": "trocar de curso",
  "aceitar/recusar trabalho": "aceitar trabalho",
  "terminar/continuar relacionamento": "terminar relacionamento",
  "começar um projeto": "começar projeto",
  "ficar ou ir embora": "ficar ou ir embora",
};

export function getFallbackStory(choice: string, _subChoice?: string): StoryResponse {
  const key = (CHOICE_ALIASES[choice.toLowerCase().trim()] || choice.toLowerCase().trim());
  const story = FALLBACK_STORIES[key] || FALLBACK_STORIES["mudar de cidade"];
  const cloned = JSON.parse(JSON.stringify(story)) as StoryResponse;
  if (!cloned.summary20s) cloned.summary20s = cloned.hook;
  return cloned;
}
