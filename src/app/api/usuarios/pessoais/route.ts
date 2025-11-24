// Caminho: src/app/api/usuarios/pessoais/route.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    // Valida o token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const decoded = payload as unknown as { id: number };

    const body = await req.json();
    const dataToUpdate: any = {};

    // Caso 1: Alteração de senha
    if (body.senhaAtual && body.novaSenha) {
      // Busca o usuário com a senha atual
      const usuario = await prisma.usuario.findUnique({
        where: { id_usuario: decoded.id },
        select: { senha: true },
      });

      if (!usuario) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
      }

      // Verifica se a senha atual está correta
      const senhaValida = await bcrypt.compare(body.senhaAtual, usuario.senha);
      
      if (!senhaValida) {
        return NextResponse.json({ error: "Senha atual incorreta" }, { status: 400 });
      }

      // Hash da nova senha
      const novaSenhaHash = await bcrypt.hash(body.novaSenha, 10);
      
      // Atualiza apenas a senha
      await prisma.usuario.update({
        where: { id_usuario: decoded.id },
        data: { senha: novaSenhaHash },
      });

      return NextResponse.json({ 
        message: "Senha alterada com sucesso" 
      });
    }

    // Caso 2: Atualização de dados pessoais
    if (body.email !== undefined) {
      dataToUpdate.email = body.email;
    }
    
    if (body.telefone !== undefined) {
      dataToUpdate.telefone = body.telefone || null; // Permite campo vazio
    }
    
    if (body.data_nascimento !== undefined) {
      // Converte string de data para objeto Date
      dataToUpdate.data_nascimento = body.data_nascimento 
        ? new Date(body.data_nascimento + "T00:00:00.000Z") // Garante formato UTC
        : null;
    }
    
    if (body.id_genero !== undefined) {
      dataToUpdate.id_genero = parseInt(body.id_genero);
    }

    // Verifica se há dados para atualizar
    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ 
        error: "Nenhum dado válido para atualizar" 
      }, { status: 400 });
    }

    // Atualiza os dados no banco
    const updatedUser = await prisma.usuario.update({
      where: { id_usuario: decoded.id },
      data: dataToUpdate,
      select: { 
        id_usuario: true, 
        email: true,
        telefone: true, 
        data_nascimento: true, 
        id_genero: true 
      },
    });

    return NextResponse.json({
      message: "Dados atualizados com sucesso",
      usuario: updatedUser,
    });

  } catch (err: any) {
    console.error("Erro na API pessoais:", err);
    
    // Erros específicos do Prisma
    if (err.code === "P2002") {
      return NextResponse.json({ 
        error: "Email já está em uso" 
      }, { status: 400 });
    }
    
    if (err.code === "P2025") {
      return NextResponse.json({ 
        error: "Usuário não encontrado" 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      error: "Erro ao atualizar dados pessoais: " + err.message 
    }, { status: 500 });
  }
}