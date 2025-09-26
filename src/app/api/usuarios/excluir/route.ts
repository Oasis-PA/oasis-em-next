import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    // Deleta usuário
    await prisma.usuario.delete({ where: { id_usuario: decoded.id } });

    // Limpar cookie
    const response = NextResponse.json({ message: "Conta excluída com sucesso!" });
    response.cookies.set("token", "", { maxAge: -1 });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao excluir conta" }, { status: 500 });
  }
}
