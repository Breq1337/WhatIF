import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { success } = await checkRateLimit(ip, 5);
    if (!success) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente em 1 minuto." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const emailNorm = email.toLowerCase().trim();
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Senha deve ter no mínimo 8 caracteres." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email: emailNorm } });
    if (existing) {
      return NextResponse.json(
        { error: "Este email já está em uso." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        email: emailNorm,
        passwordHash,
      },
    });

    return NextResponse.json({ ok: true, message: "Conta criada. Faça login." });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Erro ao criar conta. Tente novamente." },
      { status: 500 }
    );
  }
}
