import { LRUCache } from "lru-cache";

function hashContext(ctx: {
  choice: string;
  subChoice?: string;
  valueWeights: unknown;
  ageRange?: string;
  fearOfLosing?: string;
  desireToGain?: string;
}): string {
  return JSON.stringify({
    c: ctx.choice,
    s: ctx.subChoice ?? "",
    w: ctx.valueWeights,
    a: ctx.ageRange ?? "",
    f: ctx.fearOfLosing ?? "",
    d: ctx.desireToGain ?? "",
  });
}

const cache = new LRUCache<string, { data: unknown; cachedAt: number }>({
  max: 200,
  ttl: 24 * 60 * 60 * 1000, // 24h
});

export function getCachedStory(context: Record<string, unknown>, privateMode?: boolean): unknown | null {
  if (privateMode) return null;
  const key = hashContext(context as Parameters<typeof hashContext>[0]);
  const entry = cache.get(key);
  if (!entry) return null;
  return entry.data;
}

export function setCachedStory(
  context: Record<string, unknown>,
  data: unknown,
  privateMode?: boolean
): void {
  if (privateMode) return;
  const key = hashContext(context as Parameters<typeof hashContext>[0]);
  cache.set(key, { data, cachedAt: Date.now() });
}
