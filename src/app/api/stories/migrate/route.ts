import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const body = await req.json();
    const { stories } = body;

    if (!Array.isArray(stories) || stories.length === 0) {
      return NextResponse.json({ ok: true, migrated: 0 });
    }

    let migrated = 0;
    for (const s of stories) {
      if (!s.story?.title || !s.story) continue;
      try {
        await prisma.story.create({
          data: {
            userId: session.user.id,
            title: s.story.title,
            inputJson: JSON.stringify({ choice: s.choice, subChoice: s.subChoice }),
            outputJson: JSON.stringify(s.story),
            aiProvider: s.aiProvider || "offline",
            model: s.model || null,
          },
        });
        migrated++;
      } catch (e) {
        console.warn("Migrate story skip:", e);
      }
    }

    return NextResponse.json({ ok: true, migrated });
  } catch (err) {
    console.error("Migrate error:", err);
    return NextResponse.json(
      { error: "Erro ao migrar." },
      { status: 500 }
    );
  }
}
