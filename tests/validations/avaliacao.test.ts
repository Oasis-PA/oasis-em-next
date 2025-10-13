// tests/validations/avaliacao.test.ts
import { describe, it, expect } from '@jest/globals';
import {
  criarAvaliacaoSchema,
  atualizarAvaliacaoSchema,
} from '@/lib/validations';

describe('Validações de Avaliação', () => {

  describe('criarAvaliacaoSchema', () => {
    it('deve aceitar avaliação válida completa', () => {
      const dados = {
        nota: 5,
        comentario: 'Produto excelente, super recomendo!',
        id_usuario: 1,
        id_produto: 10,
      };

      expect(() => criarAvaliacaoSchema.parse(dados)).not.toThrow();
    });

    it('deve aceitar avaliação sem comentário', () => {
      const dados = {
        nota: 4,
        id_usuario: 1,
        id_produto: 10,
      };

      expect(() => criarAvaliacaoSchema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar nota menor que 1', () => {
      const dados = {
        nota: 0,
        id_usuario: 1,
        id_produto: 10,
      };

      expect(() => criarAvaliacaoSchema.parse(dados)).toThrow('Nota mínima é 1');
    });

    it('deve rejeitar nota maior que 5', () => {
      const dados = {
        nota: 6,
        id_usuario: 1,
        id_produto: 10,
      };

      expect(() => criarAvaliacaoSchema.parse(dados)).toThrow('Nota máxima é 5');
    });

    it('deve rejeitar nota decimal', () => {
      const dados = {
        nota: 4.5,
        id_usuario: 1,
        id_produto: 10,
      };

      expect(() => criarAvaliacaoSchema.parse(dados)).toThrow('Nota deve ser um número inteiro');
    });

    it('deve aceitar todas as notas válidas (1 a 5)', () => {
      for (let nota = 1; nota <= 5; nota++) {
        const dados = {
          nota,
          id_usuario: 1,
          id_produto: 10,
        };

        expect(() => criarAvaliacaoSchema.parse(dados)).not.toThrow();
      }
    });

    it('deve rejeitar comentário muito longo', () => {
      const dados = {
        nota: 5,
        comentario: 'A'.repeat(501), // 501 caracteres
        id_usuario: 1,
        id_produto: 10,
      };

      expect(() => criarAvaliacaoSchema.parse(dados)).toThrow('Comentário muito longo');
    });

    it('deve aceitar comentário com 500 caracteres', () => {
      const dados = {
        nota: 5,
        comentario: 'A'.repeat(500), // exatamente 500 caracteres
        id_usuario: 1,
        id_produto: 10,
      };

      expect(() => criarAvaliacaoSchema.parse(dados)).not.toThrow();
    });
  });

  describe('atualizarAvaliacaoSchema', () => {
    it('deve aceitar atualização parcial da nota', () => {
      const dados = {
        nota: 4,
      };

      expect(() => atualizarAvaliacaoSchema.parse(dados)).not.toThrow();
    });

    it('deve aceitar atualização parcial do comentário', () => {
      const dados = {
        comentario: 'Mudei de ideia, o produto é bom',
      };

      expect(() => atualizarAvaliacaoSchema.parse(dados)).not.toThrow();
    });

    it('deve aceitar atualização completa', () => {
      const dados = {
        nota: 3,
        comentario: 'Produto mediano',
      };

      expect(() => atualizarAvaliacaoSchema.parse(dados)).not.toThrow();
    });

    it('deve aceitar objeto vazio', () => {
      const dados = {};

      expect(() => atualizarAvaliacaoSchema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar nota inválida na atualização', () => {
      const dados = {
        nota: 10,
      };

      expect(() => atualizarAvaliacaoSchema.parse(dados)).toThrow('Nota máxima é 5');
    });
  });
});
