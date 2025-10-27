// tests/api/produtos-cadastro.test.ts
import { describe, it, expect } from '@jest/globals';
import { criarProdutoSchema } from '@/lib/validations';

describe('POST /api/produtos/cadastro', () => {
  it('deve validar criação de produto com dados completos', () => {
    const dadosValidos = {
      nome: 'Hidratante Facial Premium',
      marca: 'Nivea',
      preco: 49.90,
      id_categoria: 1,
      descricao: 'Hidratante facial com ácido hialurônico',
      id_tag: 1,
      id_tipo_pele: 2,
      id_tipo_cabelo: 1
    };

    expect(() => criarProdutoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar criação de produto com dados mínimos', () => {
    const dadosValidos = {
      nome: 'Shampoo Neutro',
      marca: 'Pantene',
      preco: 15.50,
      id_categoria: 2
    };

    expect(() => criarProdutoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar nome muito curto', () => {
    const dadosInvalidos = {
      nome: 'A',
      marca: 'Marca',
      preco: 10.00,
      id_categoria: 1
    };

    expect(() => criarProdutoSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar preço negativo', () => {
    const dadosInvalidos = {
      nome: 'Produto Teste',
      marca: 'Marca Teste',
      preco: -10.00,
      id_categoria: 1
    };

    expect(() => criarProdutoSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar preço zero', () => {
    const dadosInvalidos = {
      nome: 'Produto Teste',
      marca: 'Marca Teste',
      preco: 0,
      id_categoria: 1
    };

    expect(() => criarProdutoSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar categoria inválida', () => {
    const dadosInvalidos = {
      nome: 'Produto Teste',
      marca: 'Marca Teste',
      preco: 10.00,
      id_categoria: -1
    };

    expect(() => criarProdutoSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar descrição muito longa', () => {
    const dadosInvalidos = {
      nome: 'Produto Teste',
      marca: 'Marca Teste',
      preco: 10.00,
      id_categoria: 1,
      descricao: 'A'.repeat(1001)
    };

    expect(() => criarProdutoSchema.parse(dadosInvalidos)).toThrow();
  });
});
