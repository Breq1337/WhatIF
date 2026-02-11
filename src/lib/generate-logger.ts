const LOG_PREFIX = "[E-SE Generate]";

export function logStart(requestId: string, source: "gemini" | "fallback" | "cache"): void {
  console.log(`${LOG_PREFIX} START requestId=${requestId} source=${source} ts=${Date.now()}`);
}

export function logEnd(
  requestId: string,
  source: "gemini" | "fallback" | "cache",
  durationMs: number,
  reason?: string
): void {
  console.log(
    `${LOG_PREFIX} END requestId=${requestId} source=${source} durationMs=${durationMs}${reason ? ` reason=${reason}` : ""}`
  );
}

export function logFallback(requestId: string, reason: "no_api_key" | "parse_error" | "validation_error" | "exception"): void {
  console.warn(`${LOG_PREFIX} FALLBACK requestId=${requestId} reason=${reason}`);
}
