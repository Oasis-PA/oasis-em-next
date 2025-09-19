import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const body = await req.json();

    // só envia pro prisma os campos que realmente existem
    const dataToUpdate: any = {};
    if (body.nome !== undefined) dataToUpdate.nome = body.nome;
    if (body.sobrenome !== undefined) dataToUpdate.sobrenome = body.sobrenome;
    if (body.sobre !== undefined) dataToUpdate.sobre = body.sobre;
    if (body.telefone !== undefined) dataToUpdate.telefone = body.telefone;

    const updatedUser = await prisma.usuario.update({
      where: { id_usuario: decoded.id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("Erro no PATCH /api/usuarios/update:", err);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}
