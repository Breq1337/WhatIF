import { z } from "zod";

export const timelineEventSchema = z.object({
  when: z.string(),
  event: z.string(),
  gain: z.string(),
  cost: z.string(),
  confidence: z.enum(["low", "medium", "high"]),
});

export const storyResponseSchema = z.object({
  title: z.string(),
  hook: z.string(),
  summary20s: z.string().optional(),
  timeline: z.array(timelineEventSchema),
  tradeoffScale: z.object({
    gains: z.array(z.string()),
    costs: z.array(z.string()),
    problemsAvoided: z.array(z.string()),
    silentBlessingsRealLife: z.array(z.string()),
  }),
  reflectionQuestions: z.array(z.string()),
  microReveals: z.object({
    hiddenPrice: z.string(),
    unexpectedRelief: z.string(),
    missedJoy: z.string(),
    newProblemYouDidntHave: z.string(),
  }),
  closing: z.string(),
});

export type StoryResponse = z.infer<typeof storyResponseSchema>;
export type TimelineEvent = z.infer<typeof timelineEventSchema>;

/** Limite máximo de caracteres para texto de revelação em camadas (exibição e validação). */
export const REVEAL_MAX_CHARS = 180;

export const revealResponseSchema = z.object({
  text: z.string().max(REVEAL_MAX_CHARS),
});

export type RevealResponse = z.infer<typeof revealResponseSchema>;

export const valueWeightsSchema = z.object({
  security: z.number().min(0).max(10),
  freedom: z.number().min(0).max(10),
  love: z.number().min(0).max(10),
  ambition: z.number().min(0).max(10),
  family: z.number().min(0).max(10),
  adventure: z.number().min(0).max(10),
});

export type ValueWeights = z.infer<typeof valueWeightsSchema>;
