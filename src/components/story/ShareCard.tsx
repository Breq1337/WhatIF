"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

interface ShareCardProps {
  title: string;
  hook: string;
}

export function ShareCard({ title, hook }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#0c0a09",
      });
      const link = document.createElement("a");
      link.download = `e-se-${title.slice(0, 20).replace(/\s/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Cartão para compartilhar</h4>
      <div
        ref={cardRef}
        className="aspect-[9/16] max-w-[280px] rounded-xl border border-border bg-[#0c0a09] p-6 flex flex-col justify-between"
      >
        <div>
          <p className="text-2xl font-bold text-white">{title}</p>
        </div>
        <p className="text-white/80 text-lg italic">&ldquo;{hook}&rdquo;</p>
        <p className="text-primary text-sm font-medium">
          Nem melhor, nem pior — diferente.
        </p>
      </div>
      <Button
        variant="outline"
        onClick={handleDownload}
        disabled={downloading}
      >
        {downloading ? "Gerando…" : "Baixar para Instagram Stories"}
      </Button>
    </div>
  );
}
