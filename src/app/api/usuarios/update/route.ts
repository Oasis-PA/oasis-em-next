import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const { nome, telefone, sobre, pronomes } = await req.json();

    const updatedUser = await prisma.usuario.update({
      where: { id_usuario: decoded.id },
      data: { nome, telefone, sobre },
    });

    return NextResponse.json(updatedUser);
  } catch {
    return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
  }
}
