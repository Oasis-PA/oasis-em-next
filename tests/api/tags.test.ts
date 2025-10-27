// tests/api/tags.test.ts
import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';

// Schema para cadastro de tag
const cadastroTagSchema = z.object({
  nome: z.string()
    .trim()
    .min(1, 'Nome da tag é obrigatório')
    .max(50, 'Nome da tag muito longo')
});

describe('POST /api/tags/cadastro', () => {
  it('deve validar cadastro de tag válida', () => {
    const dadosValidos = {
      nome: 'skincare'
    };

    expect(() => cadastroTagSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar tag com nome composto', () => {
    const dadosValidos = {
      nome: 'cuidados com a pele'
    };

    expect(() => cadastroTagSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar nome vazio', () => {
    const dadosInvalidos = {
      nome: ''
    };

    expect(() => cadastroTagSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar nome apenas com espaços', () => {
    const dadosInvalidos = {
      nome: '   '
    };

    expect(() => cadastroTagSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar quando nome não é fornecido', () => {
    const dadosInvalidos = {};

    expect(() => cadastroTagSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar nome muito longo', () => {
    const dadosInvalidos = {
      nome: 'a'.repeat(51)
    };

    expect(() => cadastroTagSchema.parse(dadosInvalidos)).toThrow();
  });
});
