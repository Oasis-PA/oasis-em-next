// src/app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const user = await prisma.usuario.findUnique({
      where: { id_usuario: decoded.id },
      select: {
        id_usuario: true,
        nome: true,
        sobre: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const body = await req.json();

    const { nome, sobrenome, sobre } = body;

    const updatedUser = await prisma.usuario.update({
      where: { id_usuario: decoded.id },
      data: {
        nome,
        // só atualiza se foi enviado
        ...(sobrenome !== undefined && { sobrenome }),
        ...(sobre !== undefined && { sobre }),
      },
      select: {
        id_usuario: true,
        nome: true,
        sobrenome: true,
        sobre: true,
        email: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("Erro no PUT /api/me:", err);
    return NextResponse.json({ error: "Erro ao atualizar perfil" }, { status: 500 });
  }
}

// src/app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const user = await prisma.usuario.findUnique({
      where: { id_usuario: decoded.id },
      select: {
        id_usuario: true,
        nome: true,
        sobrenome: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const body = await req.json();

    const { nome, sobrenome, sobre } = body;

    const updatedUser = await prisma.usuario.update({
      where: { id_usuario: decoded.id },
      data: {
        nome,
        // só atualiza se foi enviado
        ...(sobrenome !== undefined && { sobrenome }),
        ...(sobre !== undefined && { sobre }),
      },
      select: {
        id_usuario: true,
        nome: true,
        sobrenome: true,
        sobre: true,
        email: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("Erro no PUT /api/me:", err);
    return NextResponse.json({ error: "Erro ao atualizar perfil" }, { status: 500 });
  }
}
