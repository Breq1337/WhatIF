import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { storyResponseSchema } from "@/lib/schemas";
import { buildPrompt } from "@/lib/prompts";
import { getFallbackStory } from "@/lib/templates";
import { checkRateLimit } from "@/lib/rate-limit";
import { getCachedStory, setCachedStory } from "@/lib/story-cache";
import { logStart, logEnd, logFallback } from "@/lib/generate-logger";
import type { StoryResponse } from "@/lib/schemas";

const MODEL_NAME = "gemini-2.5-flash-lite";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function tryParseJson(text: string): unknown {
  const cleaned = text.replace(/```json\s?|\s?```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return null;
      }
    }
  }
  return null;
}

function tryRepairJson(raw: string): unknown {
  const fixes = [
    (s: string) => s.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]"),
    (s: string) => s.replace(/(\w+):/g, '"$1":').replace(/'/g, '"'),
    (s: string) => {
      const match = s.match(/\{[\s\S]*\}/);
      return match ? match[0] : s;
    },
  ];
  for (const fix of fixes) {
    try {
      const repaired = fix(raw);
      return JSON.parse(repaired);
    } catch {
      continue;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  const requestId = generateRequestId();
  const startTime = Date.now();

  try {
    const ip = getClientIp(req);
    const { success } = await checkRateLimit(ip, 10);
    if (!success) {
      return NextResponse.json(
        { error: "Muitas requisições. Tente em 1 minuto." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      choice,
      subChoice,
      valueWeights,
      ageRange,
      fearOfLosing,
      desireToGain,
      privateMode,
    } = body;

    const context = {
      choice: choice || "uma escolha importante",
      subChoice,
      valueWeights: valueWeights || {
        security: 5,
        freedom: 5,
        love: 5,
        ambition: 5,
        family: 5,
        adventure: 5,
      },
      ageRange,
      fearOfLosing,
      desireToGain,
      privateMode: !!privateMode,
    };

    const cached = getCachedStory(context, context.privateMode);
    if (cached) {
      logStart(requestId, "cache");
      logEnd(requestId, "cache", Date.now() - startTime);
      return NextResponse.json({
        ...cached,
        _meta: {
          aiProvider: "gemini",
          model: MODEL_NAME,
          requestId,
          timestamp: Date.now(),
          fromCache: true,
        },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      logStart(requestId, "fallback");
      logFallback(requestId, "no_api_key");
      const fallback = getFallbackStory(choice || "mudar de cidade", subChoice);
      const withMeta = addSummary20s(fallback);
      logEnd(requestId, "fallback", Date.now() - startTime);
      return NextResponse.json({
        ...withMeta,
        _meta: {
          aiProvider: "offline",
          model: null,
          requestId,
          timestamp: Date.now(),
          offlineFallback: true,
        },
      });
    }

    logStart(requestId, "gemini");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = buildPrompt(context);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    let parsed = tryParseJson(text);
    if (!parsed) {
      parsed = tryRepairJson(text);
    }
    if (!parsed) {
      logFallback(requestId, "parse_error");
      const fallback = getFallbackStory(choice || "mudar de cidade", subChoice);
      const withMeta = addSummary20s(fallback);
      logEnd(requestId, "fallback", Date.now() - startTime, "parse_error");
      return NextResponse.json({
        ...withMeta,
        _meta: {
          aiProvider: "offline",
          model: null,
          requestId,
          timestamp: Date.now(),
          offlineFallback: true,
          offlineReason: "parse_error",
        },
      });
    }

    const validated = storyResponseSchema.safeParse(parsed);
    if (!validated.success) {
      logFallback(requestId, "validation_error");
      const fallback = getFallbackStory(choice || "mudar de cidade", subChoice);
      const withMeta = addSummary20s(fallback);
      logEnd(requestId, "fallback", Date.now() - startTime, "validation_error");
      return NextResponse.json({
        ...withMeta,
        _meta: {
          aiProvider: "offline",
          model: null,
          requestId,
          timestamp: Date.now(),
          offlineFallback: true,
          offlineReason: "validation_error",
        },
      });
    }

    let data = validated.data;
    if (!data.summary20s) {
      data = { ...data, summary20s: data.hook };
    }
    if (!data.closing.includes("Nem melhor, nem pior")) {
      data = { ...data, closing: `${data.closing} Nem melhor, nem pior — diferente.` };
    }

    setCachedStory(context, data, context.privateMode);

    logEnd(requestId, "gemini", Date.now() - startTime);

    return NextResponse.json({
      ...data,
      _meta: {
        aiProvider: "gemini",
        model: MODEL_NAME,
        requestId,
        timestamp: Date.now(),
        fromCache: false,
      },
    });
  } catch (err) {
    console.error("[E-SE Generate] exception", err);
    logFallback(requestId, "exception");
    const fallback = getFallbackStory("mudar de cidade");
    const withMeta = addSummary20s(fallback);
    logEnd(requestId, "fallback", Date.now() - startTime, "exception");
    return NextResponse.json({
      ...withMeta,
      _meta: {
        aiProvider: "offline",
        model: null,
        requestId,
        timestamp: Date.now(),
        offlineFallback: true,
        offlineReason: "exception",
      },
    });
  }
}

function addSummary20s(story: StoryResponse): StoryResponse {
  if (story.summary20s) return story;
  return { ...story, summary20s: story.hook };
}
