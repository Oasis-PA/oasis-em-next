// tests/api/produtos.test.ts
import { describe, it, expect } from '@jest/globals';
import { criarProdutoSchema, atualizarProdutoSchema } from '@/lib/validations';

describe('GET/POST /api/produtos', () => {
  describe('POST - Criar produto', () => {
    it('deve validar produto válido', () => {
      const dadosValidos = {
        nome: 'Condicionador Nutritivo',
        marca: 'Dove',
        preco: 25.90,
        id_categoria: 3,
        descricao: 'Condicionador para cabelos secos'
      };

      expect(() => criarProdutoSchema.parse(dadosValidos)).not.toThrow();
    });

    it('deve rejeitar marca muito curta', () => {
      const dadosInvalidos = {
        nome: 'Produto',
        marca: 'A',
        preco: 10.00,
        id_categoria: 1
      };

      expect(() => criarProdutoSchema.parse(dadosInvalidos)).toThrow();
    });
  });
});

describe('PUT /api/produtos/[id]', () => {
  it('deve validar atualização completa de produto', () => {
    const dadosValidos = {
      nome: 'Produto Atualizado',
      marca: 'Nova Marca',
      preco: 99.90,
      id_categoria: 2,
      descricao: 'Descrição atualizada',
      id_tag: 2
    };

    expect(() => atualizarProdutoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar atualização parcial de produto', () => {
    const dadosValidos = {
      preco: 39.90
    };

    expect(() => atualizarProdutoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar atualização apenas do nome', () => {
    const dadosValidos = {
      nome: 'Novo Nome do Produto'
    };

    expect(() => atualizarProdutoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar preço negativo na atualização', () => {
    const dadosInvalidos = {
      preco: -50.00
    };

    expect(() => atualizarProdutoSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar nome muito longo', () => {
    const dadosInvalidos = {
      nome: 'A'.repeat(201)
    };

    expect(() => atualizarProdutoSchema.parse(dadosInvalidos)).toThrow();
  });
});
