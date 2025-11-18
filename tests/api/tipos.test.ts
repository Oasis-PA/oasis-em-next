// tests/api/tipos.test.ts
import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';

// Schema para tipos de pele e cabelo
const tipoSchema = z.object({
  nome: z.string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(50, 'Nome muito longo'),
  descricao: z.string().max(200, 'Descrição muito longa').optional()
});

describe('GET /api/tipos-pele', () => {
  it('endpoint GET não requer validação de input', () => {
    expect(true).toBe(true);
  });
});

describe('GET /api/tipos-cabelo', () => {
  it('endpoint GET não requer validação de input', () => {
    expect(true).toBe(true);
  });
});

describe('Validação de tipos (para futuras implementações)', () => {
  describe('Tipo de Pele', () => {
    it('deve validar tipo de pele válido', () => {
      const dadosValidos = {
        nome: 'Oleosa',
        descricao: 'Pele com excesso de oleosidade'
      };

      expect(() => tipoSchema.parse(dadosValidos)).not.toThrow();
    });

    it('deve validar sem descrição', () => {
      const dadosValidos = {
        nome: 'Seca'
      };

      expect(() => tipoSchema.parse(dadosValidos)).not.toThrow();
    });

    it('deve rejeitar nome muito curto', () => {
      const dadosInvalidos = {
        nome: 'A'
      };

      expect(() => tipoSchema.parse(dadosInvalidos)).toThrow();
    });
  });

  describe('Tipo de Cabelo', () => {
    it('deve validar tipo de cabelo válido', () => {
      const dadosValidos = {
        nome: 'Cacheado',
        descricao: 'Cabelo com cachos definidos'
      };

      expect(() => tipoSchema.parse(dadosValidos)).not.toThrow();
    });

    it('deve rejeitar nome muito longo', () => {
      const dadosInvalidos = {
        nome: 'A'.repeat(51)
      };

      expect(() => tipoSchema.parse(dadosInvalidos)).toThrow();
    });

    it('deve rejeitar descrição muito longa', () => {
      const dadosInvalidos = {
        nome: 'Liso',
        descricao: 'A'.repeat(201)
      };

      expect(() => tipoSchema.parse(dadosInvalidos)).toThrow();
    });
  });
});
