// tests/api/usuarios-pessoais.test.ts
import { describe, it, expect } from '@jest/globals';
import { telefoneSchema, dataNascimentoSchema } from '@/lib/validations';
import { z } from 'zod';

// Schema para atualização de dados pessoais
const atualizarDadosPessoaisSchema = z.object({
  telefone: telefoneSchema,
  data_nascimento: dataNascimentoSchema,
  genero: z.number().int().positive().optional()
});

describe('PATCH /api/usuarios/pessoais', () => {
  it('deve validar atualização de telefone', () => {
    const dadosValidos = {
      telefone: '(11) 98765-4321'
    };

    expect(() => atualizarDadosPessoaisSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar atualização de data de nascimento', () => {
    const dadosValidos = {
      data_nascimento: '1990-01-15'
    };

    expect(() => atualizarDadosPessoaisSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar atualização completa', () => {
    const dadosValidos = {
      telefone: '(21) 99999-8888',
      data_nascimento: '1995-05-20',
      genero: 2
    };

    expect(() => atualizarDadosPessoaisSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar telefone inválido', () => {
    const dadosInvalidos = {
      telefone: '123456'
    };

    expect(() => atualizarDadosPessoaisSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar data de nascimento inválida (idade < 13)', () => {
    const dadosInvalidos = {
      data_nascimento: '2020-01-01'
    };

    expect(() => atualizarDadosPessoaisSchema.parse(dadosInvalidos)).toThrow();
  });
});
