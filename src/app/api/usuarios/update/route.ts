// DENTRO DE: src/app/api/usuarios/update/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded || typeof decoded !== "object" || !decoded.id) {
       return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const { nome, sobrenome, sobre } = await req.json();

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id_usuario: decoded.id },
      data: {
        ...(nome && { nome }),
        ...(sobrenome && { sobrenome }),
        ...(sobre && { sobre }),
      },
      select: {
        id_usuario: true,
        nome: true,
        sobrenome: true,
        email: true,
        sobre: true,
      },
    });

    return NextResponse.json(usuarioAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}