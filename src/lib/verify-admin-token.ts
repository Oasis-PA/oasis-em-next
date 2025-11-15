// src/lib/verify-admin-token.ts
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export interface AdminToken {
  username: string;
  role: 'admin';
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

/**
 * Verifica e decodifica o JWT do admin
 * @param request - NextRequest com cookies
 * @returns { valid: true, payload: AdminToken } ou { valid: false, error: string }
 */
export async function verifyAdminToken(
  request: NextRequest
): Promise<{ valid: boolean; payload?: AdminToken; error?: string }> {
  try {
    // Obtém o token do cookie
    const token = request.cookies.get('admin-auth-token')?.value;

    if (!token) {
      return {
        valid: false,
        error: 'Token não encontrado',
      };
    }

    // Obtém a chave secreta
    const secret = process.env.ADMIN_JWT_SECRET;
    if (!secret) {
      return {
        valid: false,
        error: 'Configuração de segurança incorreta (secret não definido)',
      };
    }

    // Verifica e decodifica o JWT
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify<AdminToken>(token, secretKey);

    // Verifica se tem o role correto
    if (payload.role !== 'admin') {
      return {
        valid: false,
        error: 'Permissão insuficiente',
      };
    }

    // Verifica o issuer e audience
    if (payload.iss !== 'oasis-admin' || payload.aud !== 'oasis-admin-panel') {
      return {
        valid: false,
        error: 'Token inválido (issuer/audience mismatch)',
      };
    }

    return {
      valid: true,
      payload,
    };
  } catch (error: any) {
    // Token expirado, inválido ou outro erro
    const message = error?.message || 'Token inválido';
    return {
      valid: false,
      error: message,
    };
  }
}

/**
 * Middleware para proteger rotas admin
 * Uso: const auth = await protectAdminRoute(request);
 * @returns NextResponse com erro se não autenticado, null se autenticado
 */
export async function protectAdminRoute(
  request: NextRequest
): Promise<NextResponse | null> {
  const verification = await verifyAdminToken(request);

  if (!verification.valid) {
    return NextResponse.json(
      { error: verification.error || 'Não autorizado' },
      { status: 401 }
    );
  }

  // Se passou na verificação, retorna null (continua a requisição)
  return null;
}
