"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { TimelineEvent } from "@/lib/schemas";
import { updateStoryResponses } from "@/lib/storage";

type ResponseType = "sim" | "nao" | "nao_sei";

interface TimelineNodesProps {
  timeline: TimelineEvent[];
  storyId: string;
  responses: Record<number, ResponseType>;
  onResponseChange: (index: number, value: ResponseType) => void;
}

export function TimelineNodes({
  timeline,
  storyId,
  responses,
  onResponseChange,
}: TimelineNodesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleResponse = (index: number, value: ResponseType) => {
    onResponseChange(index, value);
    updateStoryResponses(storyId, { [index]: value });
  };

  return (
    <>
      <div className="relative flex items-center justify-between gap-2 overflow-x-auto py-8">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-border" />
        {timeline.map((node, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setOpenIndex(i)}
            className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-medium hover:scale-110 transition-transform"
          >
            {i + 1}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{timeline[openIndex].when}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="font-medium">{timeline[openIndex].event}</p>
                <div className="rounded-lg bg-green-500/10 p-3 text-sm">
                  <span className="text-green-600 dark:text-green-400 font-medium">Ganho: </span>
                  {timeline[openIndex].gain}
                </div>
                <div className="rounded-lg bg-amber-500/10 p-3 text-sm">
                  <span className="text-amber-600 dark:text-amber-400 font-medium">Custo: </span>
                  {timeline[openIndex].cost}
                </div>
                <p className="text-sm text-muted-foreground">
                  Você teria topado pagar esse custo?
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={responses[openIndex] === "sim" ? "default" : "outline"}
                    onClick={() => handleResponse(openIndex, "sim")}
                  >
                    Sim
                  </Button>
                  <Button
                    size="sm"
                    variant={responses[openIndex] === "nao" ? "default" : "outline"}
                    onClick={() => handleResponse(openIndex, "nao")}
                  >
                    Não
                  </Button>
                  <Button
                    size="sm"
                    variant={responses[openIndex] === "nao_sei" ? "default" : "outline"}
                    onClick={() => handleResponse(openIndex, "nao_sei")}
                  >
                    Não sei
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
