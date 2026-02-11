import { NextResponse } from "next/server";

export async function GET() {
  const hasKey = !!process.env.GEMINI_API_KEY;
  return NextResponse.json({
    aiProvider: hasKey ? "gemini" : "offline",
    model: hasKey ? "gemini-2.5-flash-lite" : null,
    message: hasKey
      ? "IA conectada. Histórias personalizadas com Gemini."
      : "Modo offline. Usando modelos locais predefinidos.",
  });
}
