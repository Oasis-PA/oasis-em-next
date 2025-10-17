import { describe, it, expect } from '@jest/globals';
import { checkEmailSchema } from '@/lib/validations';

describe('Validação check-email', () => {
  it('deve validar email correto', () => {
    const dados = { email: 'teste@email.com' };

    expect(() => checkEmailSchema.parse(dados)).not.toThrow();
  });

  it('deve rejeitar email inválido', () => {
    const dados = { email: 'emailinvalido' };

    expect(() => checkEmailSchema.parse(dados)).toThrow();
  });

  it('deve rejeitar quando email não é fornecido', () => {
    const dados = {};

    expect(() => checkEmailSchema.parse(dados)).toThrow();
  });
});
