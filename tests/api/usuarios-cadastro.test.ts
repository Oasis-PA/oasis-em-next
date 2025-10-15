// tests/api/usuarios-cadastro.test.ts
import { describe, it, expect } from '@jest/globals';
import { cadastroSchema } from '@/lib/validations';

describe('POST /api/usuarios/cadastro', () => {
  it('deve validar dados do usuário com sucesso', () => {
    const dadosValidos = {
      nome: 'João Silva',
      email: 'joao@teste.com',
      senha: 'SenhaForte123!',
      id_genero: 1
    };

    expect(() => cadastroSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar email inválido', () => {
    const dadosInvalidos = {
      nome: 'João Silva',
      email: 'emailinvalido',
      senha: 'SenhaForte123!',
      id_genero: 1
    };

    expect(() => cadastroSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar senha fraca', () => {
    const dadosInvalidos = {
      nome: 'João Silva',
      email: 'joao@teste.com',
      senha: '123',
      id_genero: 1
    };

    expect(() => cadastroSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar dados sem nome', () => {
    const dadosInvalidos = {
      email: 'joao@teste.com',
      senha: 'SenhaForte123!',
      id_genero: 1
    };

    expect(() => cadastroSchema.parse(dadosInvalidos)).toThrow();
  });
});
