"use client";

import { useEffect, useState } from "react";
import { Cpu, CloudOff } from "lucide-react";

interface AIStatus {
  aiProvider: string;
  model: string | null;
  message: string;
}

export function AIStatusBadge() {
  const [status, setStatus] = useState<AIStatus | null>(null);

  useEffect(() => {
    fetch("/api/ai-status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({ aiProvider: "offline", model: null, message: "Modo offline" }));
  }, []);

  if (!status || process.env.NODE_ENV === "production") return null;

  const isAI = status.aiProvider === "gemini";

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-border/50 bg-card/90 px-3 py-2 text-xs backdrop-blur"
      title={status.message}
      role="status"
      aria-live="polite"
    >
      {isAI ? (
        <Cpu className="h-3.5 w-3.5 text-primary" aria-hidden />
      ) : (
        <CloudOff className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      )}
      <span className="text-muted-foreground">
        AI: {isAI ? `Gemini (${status.model})` : "Offline"}
      </span>
    </div>
  );
}
