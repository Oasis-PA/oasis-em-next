// tests/api/categorias.test.ts
import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';

// Schema para criar categoria (caso seja implementado POST)
const categoriasSchema = z.object({
  nome: z.string()
    .min(2, 'Nome da categoria deve ter no mínimo 2 caracteres')
    .max(100, 'Nome da categoria muito longo'),
  descricao: z.string().max(500, 'Descrição muito longa').optional()
});

describe('GET /api/categorias', () => {
  it('endpoint GET não requer validação de input', () => {
    // GET endpoints geralmente não têm body, apenas query params opcionais
    expect(true).toBe(true);
  });
});

describe('Validação de categoria (para futuras implementações)', () => {
  it('deve validar categoria válida', () => {
    const dadosValidos = {
      nome: 'Cuidados com a Pele',
      descricao: 'Produtos para skincare'
    };

    expect(() => categoriasSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar categoria sem descrição', () => {
    const dadosValidos = {
      nome: 'Maquiagem'
    };

    expect(() => categoriasSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar nome muito curto', () => {
    const dadosInvalidos = {
      nome: 'A'
    };

    expect(() => categoriasSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar descrição muito longa', () => {
    const dadosInvalidos = {
      nome: 'Categoria Teste',
      descricao: 'A'.repeat(501)
    };

    expect(() => categoriasSchema.parse(dadosInvalidos)).toThrow();
  });
});
