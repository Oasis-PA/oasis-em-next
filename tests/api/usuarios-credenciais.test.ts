// tests/api/usuarios-credenciais.test.ts
import { describe, it, expect } from '@jest/globals';
import { emailSchema, senhaSchema } from '@/lib/validations';
import { z } from 'zod';

// Schema para atualização de credenciais
const atualizarCredenciaisSchema = z.object({
  email: emailSchema.optional(),
  senhaAtual: z.string().optional(),
  senhaNova: senhaSchema.optional()
});

describe('PATCH /api/usuarios/credenciais', () => {
  it('deve validar atualização de email', () => {
    const dadosValidos = {
      email: 'novoemail@teste.com'
    };

    expect(() => atualizarCredenciaisSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar atualização de senha', () => {
    const dadosValidos = {
      senhaAtual: 'SenhaAntiga123!',
      senhaNova: 'NovaSenha123!'
    };

    expect(() => atualizarCredenciaisSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar email inválido', () => {
    const dadosInvalidos = {
      email: 'emailinvalido'
    };

    expect(() => atualizarCredenciaisSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar nova senha fraca', () => {
    const dadosInvalidos = {
      senhaAtual: 'SenhaAntiga123!',
      senhaNova: '123'
    };

    expect(() => atualizarCredenciaisSchema.parse(dadosInvalidos)).toThrow();
  });
});
