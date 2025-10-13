// tests/validations/produto.test.ts
import { describe, it, expect } from '@jest/globals';
import {
  criarProdutoSchema,
  atualizarProdutoSchema,
} from '@/lib/validations';

describe('Validações de Produto', () => {

  describe('criarProdutoSchema', () => {
    it('deve aceitar produto válido', () => {
      const dados = {
        nome: 'Shampoo Hidratante',
        marca: 'Dove',
        preco: 25.90,
        id_categoria: 1,
        descricao: 'Shampoo hidratante para cabelos secos',
      };

      expect(() => criarProdutoSchema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar nome muito curto', () => {
      const dados = {
        nome: 'A',
        marca: 'Dove',
        preco: 25.90,
        id_categoria: 1,
      };

      expect(() => criarProdutoSchema.parse(dados)).toThrow('Nome do produto deve ter no mínimo 2 caracteres');
    });

    it('deve rejeitar marca muito curta', () => {
      const dados = {
        nome: 'Shampoo Hidratante',
        marca: 'D',
        preco: 25.90,
        id_categoria: 1,
      };

      expect(() => criarProdutoSchema.parse(dados)).toThrow('Marca deve ter no mínimo 2 caracteres');
    });

    it('deve rejeitar preço negativo', () => {
      const dados = {
        nome: 'Shampoo Hidratante',
        marca: 'Dove',
        preco: -10.00,
        id_categoria: 1,
      };

      expect(() => criarProdutoSchema.parse(dados)).toThrow('Preço deve ser maior que zero');
    });

    it('deve rejeitar preço zero', () => {
      const dados = {
        nome: 'Shampoo Hidratante',
        marca: 'Dove',
        preco: 0,
        id_categoria: 1,
      };

      expect(() => criarProdutoSchema.parse(dados)).toThrow('Preço deve ser maior que zero');
    });

    it('deve aceitar produto sem descrição', () => {
      const dados = {
        nome: 'Shampoo Hidratante',
        marca: 'Dove',
        preco: 25.90,
        id_categoria: 1,
      };

      expect(() => criarProdutoSchema.parse(dados)).not.toThrow();
    });

    it('deve aceitar campos opcionais', () => {
      const dados = {
        nome: 'Shampoo Hidratante',
        marca: 'Dove',
        preco: 25.90,
        id_categoria: 1,
        descricao: 'Shampoo para cabelos secos',
        id_tag: 5,
        id_tipo_pele: 2,
        id_tipo_cabelo: 3,
      };

      expect(() => criarProdutoSchema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar descrição muito longa', () => {
      const dados = {
        nome: 'Shampoo Hidratante',
        marca: 'Dove',
        preco: 25.90,
        id_categoria: 1,
        descricao: 'A'.repeat(1001), // 1001 caracteres
      };

      expect(() => criarProdutoSchema.parse(dados)).toThrow('Descrição muito longa');
    });
  });

  describe('atualizarProdutoSchema', () => {
    it('deve aceitar atualização parcial', () => {
      const dados = {
        nome: 'Novo Nome do Produto',
        preco: 35.90,
      };

      expect(() => atualizarProdutoSchema.parse(dados)).not.toThrow();
    });

    it('deve aceitar atualização apenas do preço', () => {
      const dados = {
        preco: 19.99,
      };

      expect(() => atualizarProdutoSchema.parse(dados)).not.toThrow();
    });

    it('deve aceitar objeto vazio (nenhum campo para atualizar)', () => {
      const dados = {};

      expect(() => atualizarProdutoSchema.parse(dados)).not.toThrow();
    });

    it('deve rejeitar preço negativo', () => {
      const dados = {
        preco: -5.00,
      };

      expect(() => atualizarProdutoSchema.parse(dados)).toThrow('Preço deve ser maior que zero');
    });
  });
});
