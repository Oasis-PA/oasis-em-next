// Caminho: src/app/api/usuarios/update/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

// Helper para extrair e validar token
async function extractAndValidateToken(req: NextRequest) {
  // CORRIGIDO: Busca o cookie correto "auth-token"
  const token = req.cookies.get("auth-token")?.value;
  
  if (!token) {
    throw new Error("Token não fornecido");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(token, secret);
  
  if (!payload || typeof payload !== "object") {
    throw new Error("Token inválido");
  }

  // Verifica múltiplas possibilidades de ID no payload
  const userId = (payload as any).id || (payload as any).id_usuario || (payload as any).userId;
  
  if (!userId) {
    throw new Error("Token inválido: ID não encontrado");
  }

  return typeof userId === 'string' ? parseInt(userId, 10) : userId;
}

// PUT - Atualização de perfil (nome, sobrenome, sobre)
export async function PUT(req: NextRequest) {
  try {
    const userId = await extractAndValidateToken(req);
    const { nome, sobrenome, sobre } = await req.json();

    // Validações
    if (nome && nome.length < 3) {
      return NextResponse.json(
        { error: "Nome deve ter no mínimo 3 caracteres" },
        { status: 400 }
      );
    }

    if (sobrenome && sobrenome.length < 3) {
      return NextResponse.json(
        { error: "Sobrenome deve ter no mínimo 3 caracteres" },
        { status: 400 }
      );
    }

    // Prepara dados para atualização
    const dataToUpdate: any = {};
    if (nome !== undefined) dataToUpdate.nome = nome;
    if (sobrenome !== undefined) dataToUpdate.sobrenome = sobrenome;
    if (sobre !== undefined) dataToUpdate.sobre = sobre || null; // Permite vazio

    // Verifica se há algo para atualizar
    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { error: "Nenhum dado fornecido para atualização" },
        { status: 400 }
      );
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id_usuario: userId },
      data: dataToUpdate,
      select: {
        id_usuario: true,
        nome: true,
        sobrenome: true,
        email: true,
        sobre: true,
        url_foto: true,
      },
    });

    return NextResponse.json({
      message: "Perfil atualizado com sucesso",
      usuario: usuarioAtualizado,
    });
  } catch (error) {
    console.error("Erro no PUT /api/usuarios/update:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("Token")) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      
      // Erro do Prisma: registro não encontrado
      if ((error as any).code === "P2025") {
        return NextResponse.json(
          { error: "Usuário não encontrado" },
          { status: 404 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Erro ao atualizar usuário: " + (error instanceof Error ? error.message : "desconhecido") },
      { status: 500 }
    );
  }
}

// PATCH - Atualização parcial (mais eficiente)
export async function PATCH(req: NextRequest) {
  try {
    const userId = await extractAndValidateToken(req);
    const body = await req.json();

    // Campos permitidos para atualização
    const allowedFields = ['nome', 'sobrenome', 'sobre', 'telefone', 'data_nascimento', 'id_tipo_cabelo'];

    // Filtrar apenas campos permitidos que foram enviados
    const updateData: any = {};
    for (const field of allowedFields) {
      if (field in body && body[field] !== undefined) {
        // Tratamento especial para data
        if (field === 'data_nascimento' && body[field]) {
          updateData[field] = new Date(body[field] + "T00:00:00.000Z");
        } else {
          updateData[field] = body[field];
        }
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
    console.error("Erro no PATCH /api/usuarios/update:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("Token")) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      
      // Erro do Prisma: registro não encontrado
      if ((error as any).code === "P2025") {
        return NextResponse.json(
          { error: "Usuário não encontrado" },
          { status: 404 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}