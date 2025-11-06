// Caminho do arquivo: src/app/api/usuarios/perfil/route.ts

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { SignJWT, jwtVerify } from "jose";

// Tipagem para o payload decodificado do token
interface TokenPayload {
  id: number;
  // ... outras propriedades que você possa ter no token
}

export async function GET(req: NextRequest) {
  try {
    // 1. Obter o token do cookie da requisição
    const token = req.cookies.get("auth-token")?.value;

    if (!token) {
      // Retorna erro se o token não for encontrado
      return NextResponse.json({ error: "Não autorizado: Token não fornecido." }, { status: 401 });
    }

    // 2. Verificar a validade do token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(token, secret);
    const decoded = payload as unknown as TokenPayload;
    if (!decoded || !decoded.id) {
      // Retorna erro se o token for inválido ou não contiver o ID
      return NextResponse.json({ error: "Não autorizado: Token inválido." }, { status: 401 });
    }

    // 3. Buscar o usuário no banco de dados usando o ID do token
    const usuario = await prisma.usuario.findUnique({
      where: { 
        id_usuario: decoded.id 
      },
      // Seleciona apenas os campos que você quer retornar para o frontend
      select: {
        id_usuario: true,
        nome: true,
        sobrenome: true,
        email: true,
        sobre: true,
      },
    });

    if (!usuario) {
      // Retorna erro se o usuário associado ao token não for encontrado no banco
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    // 4. Retornar os dados do usuário com sucesso
    return NextResponse.json(usuario);

  } catch (error: any) {
    // Trata erros específicos de JWT (token expirado, malformado)
    if (error?.message?.includes('signature') || error?.message?.includes('verify')) {
      return NextResponse.json({ error: `Não autorizado: ${error.message}` }, { status: 401 });
    }

    // Trata outros erros inesperados do servidor
    console.error("Erro ao buscar perfil do usuário:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}