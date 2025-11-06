import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(token, secret);
    const decoded = payload as unknown as { id: number };

    // Deleta usuário
    await prisma.usuario.delete({ where: { id_usuario: decoded.id } });

    // Limpar cookie
    const response = NextResponse.json({ message: "Conta excluída com sucesso!" });
    response.cookies.set("auth-token", "", { maxAge: -1 });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao excluir conta" }, { status: 500 });
  }
}
