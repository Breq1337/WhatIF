export interface ChoiceOption {
  id: string;
  label: string;
  value: string;
}

export interface Choice {
  id: string;
  label: string;
  value: string;
  emoji: string;
  subOptions: ChoiceOption[];
}

export const CHOICES: Choice[] = [
  {
    id: "city",
    label: "Mudar de cidade",
    value: "mudar de cidade",
    emoji: "🏙️",
    subOptions: [
      { id: "alone", label: "Mudar sozinho(a)", value: "mudar sozinho" },
      { id: "with", label: "Mudar com alguém", value: "mudar com alguém" },
    ],
  },
  {
    id: "career",
    label: "Trocar de curso/carreira",
    value: "trocar de curso/carreira",
    emoji: "📚",
    subOptions: [
      { id: "earlier", label: "Ter trocado antes", value: "ter trocado antes" },
      { id: "now", label: "Trocar agora", value: "trocar agora" },
    ],
  },
  {
    id: "job",
    label: "Aceitar/recusar trabalho",
    value: "aceitar/recusar trabalho",
    emoji: "💼",
    subOptions: [
      { id: "accept", label: "Ter aceitado", value: "ter aceitado" },
      { id: "refuse", label: "Ter recusado", value: "ter recusado" },
    ],
  },
  {
    id: "relationship",
    label: "Terminar/continuar relacionamento",
    value: "terminar/continuar relacionamento",
    emoji: "❤️",
    subOptions: [
      { id: "end", label: "Ter terminado", value: "ter terminado" },
      { id: "stay", label: "Ter ficado", value: "ter ficado" },
    ],
  },
  {
    id: "project",
    label: "Começar um projeto",
    value: "começar um projeto",
    emoji: "🚀",
    subOptions: [
      { id: "started", label: "Ter começado na época", value: "ter começado na época" },
      { id: "never", label: "Não ter começado", value: "não ter começado" },
    ],
  },
  {
    id: "stay",
    label: "Ficar/ir embora",
    value: "ficar ou ir embora",
    emoji: "🌍",
    subOptions: [
      { id: "leave", label: "Ter ido embora", value: "ter ido embora" },
      { id: "stayed", label: "Ter ficado", value: "ter ficado" },
    ],
  },
];
