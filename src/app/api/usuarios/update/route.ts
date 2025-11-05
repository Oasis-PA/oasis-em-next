// DENTRO DE: src/app/api/usuarios/update/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SignJWT, jwtVerify } from "jose";

// Helper para extrair e validar token
async function extractAndValidateToken(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];
  if (!token) {
    throw new Error("Token não fornecido");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(token, secret);
  if (!payload || typeof payload !== "object" || !(payload as any).id) {
    throw new Error("Token inválido");
  }

  return (payload as any).id;
}

// PUT - Substituição completa (mantido por compatibilidade)
export async function PUT(req: Request) {
  try {
    const userId = await extractAndValidateToken(req);
    const { nome, sobrenome, sobre } = await req.json();

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id_usuario: userId },
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
    if (error instanceof Error) {
      if (error.message.includes("Token")) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
    }
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}

// PATCH - Atualização parcial (mais eficiente)
export async function PATCH(req: Request) {
  try {
    const userId = extractAndValidateToken(req);
    const body = await req.json();

    // Campos permitidos para atualização
    const allowedFields = ['nome', 'sobrenome', 'sobre', 'telefone', 'data_nascimento', 'id_tipo_cabelo'];

    // Filtrar apenas campos permitidos que foram enviados
    const updateData: any = {};
    for (const field of allowedFields) {
      if (field in body && body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Se não há dados para atualizar
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Nenhum campo válido fornecido para atualização" },
        { status: 400 }
      );
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id_usuario: userId },
      data: updateData,
      select: {
        id_usuario: true,
        nome: true,
        sobrenome: true,
        email: true,
        sobre: true,
        telefone: true,
        data_nascimento: true,
        id_tipo_cabelo: true,
        url_foto: true,
      },
    });

    return NextResponse.json({
      message: "Usuário atualizado com sucesso",
      usuario: usuarioAtualizado,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("Token")) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
    }
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}