import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const id = params.id;

    const story = await prisma.story.findFirst({
      where: {
        id,
        ...(session?.user?.id ? { userId: session.user.id } : {}),
      },
    });

    if (!story) {
      return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    }

    const input = JSON.parse(story.inputJson);
    const output = JSON.parse(story.outputJson);

    return NextResponse.json({
      id: story.id,
      choice: input.choice,
      subChoice: input.subChoice,
      story: output,
      createdAt: story.createdAt,
      aiProvider: story.aiProvider,
      model: story.model,
      offlineFallback: story.aiProvider === "offline",
    });
  } catch (err) {
    console.error("Story GET error:", err);
    return NextResponse.json(
      { error: "Erro ao carregar" },
      { status: 500 }
    );
  }
}
