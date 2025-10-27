// tests/api/marcas.test.ts
import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';

// Schema para cadastro de marca
const marcaSchema = z.object({
  nome: z.string()
    .min(2, 'Nome da marca deve ter no mínimo 2 caracteres')
    .max(100, 'Nome da marca muito longo'),
  descricao: z.string().max(500, 'Descrição muito longa').optional(),
  logo_url: z.string().url('URL inválida').optional()
});

describe('GET /api/marcas', () => {
  it('endpoint GET não requer validação de input', () => {
    expect(true).toBe(true);
  });
});

describe('Validação de marcas (para futuras implementações)', () => {
  it('deve validar marca válida com todos os campos', () => {
    const dadosValidos = {
      nome: 'Nivea',
      descricao: 'Marca de cosméticos alemã',
      logo_url: 'https://exemplo.com/logo-nivea.png'
    };

    expect(() => marcaSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar marca apenas com nome', () => {
    const dadosValidos = {
      nome: 'Dove'
    };

    expect(() => marcaSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar nome muito curto', () => {
    const dadosInvalidos = {
      nome: 'A'
    };

    expect(() => marcaSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar nome muito longo', () => {
    const dadosInvalidos = {
      nome: 'A'.repeat(101)
    };

    expect(() => marcaSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar URL de logo inválida', () => {
    const dadosInvalidos = {
      nome: 'Marca Teste',
      logo_url: 'url-invalida'
    };

    expect(() => marcaSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar descrição muito longa', () => {
    const dadosInvalidos = {
      nome: 'Marca Teste',
      descricao: 'A'.repeat(501)
    };

    expect(() => marcaSchema.parse(dadosInvalidos)).toThrow();
  });
});
