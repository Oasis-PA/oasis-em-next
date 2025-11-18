// tests/api/admin-auth.test.ts
import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';

// Schema para autenticação de admin
const adminAuthSchema = z.object({
  username: z.string().min(1, 'Username é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória')
});

describe('POST /api/admin/auth', () => {
  it('deve validar credenciais de admin válidas', () => {
    const dadosValidos = {
      username: 'admin',
      password: 'admin123'
    };

    expect(() => adminAuthSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar quando username não é fornecido', () => {
    const dadosInvalidos = {
      password: 'admin123'
    };

    expect(() => adminAuthSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar quando password não é fornecido', () => {
    const dadosInvalidos = {
      username: 'admin'
    };

    expect(() => adminAuthSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar username vazio', () => {
    const dadosInvalidos = {
      username: '',
      password: 'admin123'
    };

    expect(() => adminAuthSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar password vazio', () => {
    const dadosInvalidos = {
      username: 'admin',
      password: ''
    };

    expect(() => adminAuthSchema.parse(dadosInvalidos)).toThrow();
  });
});
