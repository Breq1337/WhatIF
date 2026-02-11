import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revealResponseSchema, REVEAL_MAX_CHARS } from "@/lib/schemas";
import { buildRevealPrompt, type GenerateContext } from "@/lib/prompts";
import { checkRateLimit } from "@/lib/rate-limit";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

const REVEAL_FALLBACKS: Record<string, string> = {
  hiddenPrice: "Talvez o preço escondido fosse o tempo que você não teria para outras coisas importantes.",
  unexpectedRelief: "Pode ser que você encontrasse um alívio que a rotina atual não te permite ver.",
  missedJoy: "Uma alegria que você talvez não reconheça o suficiente no caminho que escolheu.",
  newProblemYouDidntHave: "Um problema que muitas pessoas têm na outra escolha — e que você escapou por estar onde está.",
};

export async function POST(req: NextRequest) {
  let body: { context?: unknown; revealType?: string; existingContent?: string } = {};
  try {
    const ip = getClientIp(req);
    const { success } = await checkRateLimit(ip, 20);
    if (!success) {
      return NextResponse.json(
        { error: "Muitas requisições. Tente em 1 minuto." },
        { status: 429 }
      );
    }

    body = await req.json();
    const { context, revealType, existingContent } = body;
    const typeKey = revealType ?? "hiddenPrice";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallback =
        REVEAL_FALLBACKS[typeKey] || REVEAL_FALLBACKS.hiddenPrice;
      return NextResponse.json({ text: fallback });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    type RevealType = "hiddenPrice" | "unexpectedRelief" | "missedJoy" | "newProblemYouDidntHave";
    const validType: RevealType = ["hiddenPrice", "unexpectedRelief", "missedJoy", "newProblemYouDidntHave"].includes(typeKey)
      ? (typeKey as RevealType)
      : "hiddenPrice";
    const prompt = buildRevealPrompt(
      (context || { choice: "" }) as GenerateContext,
      validType,
      existingContent || ""
    );

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleaned = text.replace(/```json\s?|\s?```/g, "").trim();
    const match = cleaned.match(/\{[\s\S]*\}/);
    const parsed = match ? JSON.parse(match[0]) : { text: text.slice(0, REVEAL_MAX_CHARS) };

    const validated = revealResponseSchema.safeParse(parsed);
    if (validated.success) {
      const text = validated.data.text.slice(0, REVEAL_MAX_CHARS);
      return NextResponse.json({ text });
    }

    return NextResponse.json({
      text: typeof parsed?.text === "string" ? parsed.text.slice(0, REVEAL_MAX_CHARS) : REVEAL_FALLBACKS[typeKey],
    });
  } catch (err) {
    console.error("Reveal error:", err);
    return NextResponse.json({
      text: REVEAL_FALLBACKS[body?.revealType || ""] || REVEAL_FALLBACKS.hiddenPrice,
    });
  }
}
