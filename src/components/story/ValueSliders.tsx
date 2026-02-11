"use client";

import { Slider } from "@/components/ui/slider";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import type { ValueWeights } from "@/lib/schemas";

const LABELS: Record<keyof ValueWeights, string> = {
  security: "Segurança",
  freedom: "Liberdade",
  love: "Amor",
  ambition: "Ambição",
  family: "Família",
  adventure: "Aventura",
};

interface ValueSlidersProps {
  values: ValueWeights;
  onChange: (values: ValueWeights) => void;
}

export function ValueSliders({ values, onChange }: ValueSlidersProps) {
  const update = (key: keyof ValueWeights, val: number[]) => {
    onChange({ ...values, [key]: val[0] });
  };

  const radarData = (Object.keys(values) as (keyof ValueWeights)[]).map(
    (k) => ({
      subject: LABELS[k],
      value: values[k],
      fullMark: 10,
    })
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-medium">O que pesa mais para você?</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Ajuste cada valor de 0 a 10. Esses pesos influenciam a história (mas
          sem determinismo).
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {(Object.keys(values) as (keyof ValueWeights)[]).map((key) => (
            <div key={key}>
              <div className="mb-2 flex justify-between text-sm">
                <span>{LABELS[key]}</span>
                <span className="text-muted-foreground">{values[key]}/10</span>
              </div>
              <Slider
                value={[values[key]]}
                onValueChange={(v) => update(key, v)}
                min={0}
                max={10}
                step={1}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card/50 p-4">
        <h4 className="mb-4 text-center text-sm font-medium">Sua bússola</h4>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--muted-foreground) / 0.3)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "hsl(var(--foreground))", fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Radar
                name="Valores"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.3)"
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
