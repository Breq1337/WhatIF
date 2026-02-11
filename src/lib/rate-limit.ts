import { LRUCache } from "lru-cache";

type RateLimitOptions = {
  interval: number;
  uniqueTokenPerInterval: number;
};

export function rateLimit(options: RateLimitOptions) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: (limit: number, token: string): Promise<{ success: boolean; remaining: number }> =>
      new Promise((resolve) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1]);
          resolve({ success: true, remaining: limit - 1 });
        } else if (tokenCount[0] < limit) {
          tokenCount[0]++;
          tokenCache.set(token, tokenCount);
          resolve({ success: true, remaining: limit - tokenCount[0] });
        } else {
          resolve({ success: false, remaining: 0 });
        }
      }),
  };
}

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function checkRateLimit(identifier: string, limit = 10) {
  const { success, remaining } = await limiter.check(limit, identifier);
  return { success, remaining };
}
