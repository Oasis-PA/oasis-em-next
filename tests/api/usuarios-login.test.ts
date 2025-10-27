// tests/api/usuarios-login.test.ts
import { describe, it, expect } from '@jest/globals';
import { loginSchema } from '@/lib/validations';

describe('POST /api/usuarios/login', () => {
  it('deve validar credenciais válidas', () => {
    const dadosValidos = {
      email: 'usuario@teste.com',
      senha: 'SenhaQualquer123'
    };

    expect(() => loginSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar email inválido', () => {
    const dadosInvalidos = {
      email: 'emailinvalido',
      senha: 'SenhaQualquer123'
    };

    expect(() => loginSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar quando senha não é fornecida', () => {
    const dadosInvalidos = {
      email: 'usuario@teste.com',
      senha: ''
    };

    expect(() => loginSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar quando email não é fornecido', () => {
    const dadosInvalidos = {
      senha: 'SenhaQualquer123'
    };

    expect(() => loginSchema.parse(dadosInvalidos)).toThrow();
  });
});
