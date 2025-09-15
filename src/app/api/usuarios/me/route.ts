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
    where: { id_usuario: decoded.id }, // id_usuario é Int
    select: {
      id_usuario: true,
      nome: true,
      id_genero: true,
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


    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
