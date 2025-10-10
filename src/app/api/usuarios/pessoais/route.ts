import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const body = await req.json();
    const dataToUpdate: any = {};

    if (body.telefone !== undefined) dataToUpdate.telefone = body.telefone;
    if (body.data_nascimento !== undefined) dataToUpdate.data_nascimento = new Date(body.data_nascimento);
    if (body.genero !== undefined) {
      // Supondo que gênero seja ID de tabela Genero
      dataToUpdate.id_genero = parseInt(body.genero);
    }

    const updatedUser = await prisma.usuario.update({
      where: { id_usuario: decoded.id },
      data: dataToUpdate,
      select: { id_usuario: true, telefone: true, data_nascimento: true, id_genero: true },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao atualizar dados pessoais" }, { status: 500 });
  }
}
