// tests/api/validations.test.ts
import { describe, it, expect } from '@jest/globals';
import {
  criarAvaliacaoSchema,
  atualizarAvaliacaoSchema,
} from '@/lib/validations/avaliacao';
import { ZodError } from 'zod';

describe('Validações de API', () => {
  describe('Avaliações', () => {
    it('deve validar criação de avaliação corretamente', () => {
      const validData = {
        nota: 5,
        comentario: 'Excelente produto!',
        id_usuario: 1,
        id_produto: 1,
      };

      const result = criarAvaliacaoSchema.parse(validData);
      expect(result).toEqual(validData);
    });

    it('deve rejeitar nota inválida (menor que 1)', () => {
      const invalidData = {
        nota: 0,
        comentario: 'Teste',
        id_usuario: 1,
        id_produto: 1,
      };

      expect(() => criarAvaliacaoSchema.parse(invalidData)).toThrow(ZodError);
    });

    it('deve rejeitar nota inválida (maior que 5)', () => {
      const invalidData = {
        nota: 6,
        comentario: 'Teste',
        id_usuario: 1,
        id_produto: 1,
      };

      expect(() => criarAvaliacaoSchema.parse(invalidData)).toThrow(ZodError);
    });

    it('deve rejeitar comentário muito longo', () => {
      const invalidData = {
        nota: 5,
        comentario: 'a'.repeat(501), // 501 caracteres
        id_usuario: 1,
        id_produto: 1,
      };

      expect(() => criarAvaliacaoSchema.parse(invalidData)).toThrow(ZodError);
    });

    it('deve aceitar avaliação sem comentário', () => {
      const validData = {
        nota: 5,
        id_usuario: 1,
        id_produto: 1,
      };

      const result = criarAvaliacaoSchema.parse(validData);
      expect(result.nota).toBe(5);
      expect(result.comentario).toBeUndefined();
    });

    it('deve validar atualização de avaliação', () => {
      const validUpdate = {
        nota: 4,
        comentario: 'Produto bom',
      };

      const result = atualizarAvaliacaoSchema.parse(validUpdate);
      expect(result).toEqual(validUpdate);
    });

    it('deve aceitar atualização parcial (apenas nota)', () => {
      const partialUpdate = {
        nota: 3,
      };

      const result = atualizarAvaliacaoSchema.parse(partialUpdate);
      expect(result.nota).toBe(3);
    });

    it('deve aceitar atualização parcial (apenas comentário)', () => {
      const partialUpdate = {
        comentario: 'Novo comentário',
      };

      const result = atualizarAvaliacaoSchema.parse(partialUpdate);
      expect(result.comentario).toBe('Novo comentário');
    });
  });
});
