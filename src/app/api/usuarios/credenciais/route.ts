import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const body = await req.json();
    const dataToUpdate: any = {};

    // Email
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) return NextResponse.json({ error: "Email inválido" }, { status: 400 });

      const existing = await prisma.usuario.findUnique({ where: { email: body.email } });
      if (existing && existing.id_usuario !== decoded.id) return NextResponse.json({ error: "Email já em uso" }, { status: 400 });

      dataToUpdate.email = body.email;
    }

    // Senha
    if (body.senhaAtual && body.senhaNova) {
      const user = await prisma.usuario.findUnique({ where: { id_usuario: decoded.id } });
      if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

      const isValid = await bcrypt.compare(body.senhaAtual, user.senha);
      if (!isValid) return NextResponse.json({ error: "Senha atual incorreta" }, { status: 400 });

      const hashed = await bcrypt.hash(body.senhaNova, 10);
      dataToUpdate.senha = hashed;
    }

    const updatedUser = await prisma.usuario.update({
      where: { id_usuario: decoded.id },
      data: dataToUpdate,
      select: { id_usuario: true, email: true },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao atualizar credenciais" }, { status: 500 });
  }
}
