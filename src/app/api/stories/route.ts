import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const guestId = req.nextUrl.searchParams.get("guestId");

    if (session?.user?.id) {
      const stories = await prisma.story.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: "desc" },
      });
      return NextResponse.json(stories);
    }

    if (guestId) {
      const stories = await prisma.story.findMany({
        where: { guestId },
        orderBy: { updatedAt: "desc" },
      });
      return NextResponse.json(stories);
    }

    return NextResponse.json([]);
  } catch (err) {
    console.error("Stories GET error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const body = await req.json();
    const { title, inputJson, outputJson, aiProvider, model } = body;

    if (!title || !inputJson || !outputJson) {
      return NextResponse.json(
        { error: "Dados incompletos." },
        { status: 400 }
      );
    }

    const story = await prisma.story.create({
      data: {
        userId: session.user.id,
        title,
        inputJson: typeof inputJson === "string" ? inputJson : JSON.stringify(inputJson),
        outputJson: typeof outputJson === "string" ? outputJson : JSON.stringify(outputJson),
        aiProvider: aiProvider || "offline",
        model: model || null,
      },
    });

    return NextResponse.json(story);
  } catch (err) {
    console.error("Stories POST error:", err);
    return NextResponse.json(
      { error: "Erro ao salvar." },
      { status: 500 }
    );
  }
}
