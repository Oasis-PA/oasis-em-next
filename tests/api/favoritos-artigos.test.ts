// tests/api/favoritos-artigos.test.ts
import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';

// Schema para adicionar artigo aos favoritos
const adicionarFavoritoSchema = z.object({
  id_artigo: z.number().int().positive('ID do artigo inválido')
});

describe('POST /api/favoritos/artigos', () => {
  it('deve validar adição de favorito com ID válido', () => {
    const dadosValidos = {
      id_artigo: 1
    };

    expect(() => adicionarFavoritoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar com ID grande', () => {
    const dadosValidos = {
      id_artigo: 999999
    };

    expect(() => adicionarFavoritoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar ID negativo', () => {
    const dadosInvalidos = {
      id_artigo: -1
    };

    expect(() => adicionarFavoritoSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar ID zero', () => {
    const dadosInvalidos = {
      id_artigo: 0
    };

    expect(() => adicionarFavoritoSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar quando ID não é fornecido', () => {
    const dadosInvalidos = {};

    expect(() => adicionarFavoritoSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar ID decimal', () => {
    const dadosInvalidos = {
      id_artigo: 1.5
    };

    expect(() => adicionarFavoritoSchema.parse(dadosInvalidos)).toThrow();
  });
});

describe('DELETE /api/favoritos/artigos', () => {
  it('deve aceitar query string com ID válido', () => {
    // Simula validação de query parameter
    const queryParamSchema = z.string().regex(/^\d+$/).transform(Number);

    expect(() => queryParamSchema.parse('123')).not.toThrow();
  });

  it('deve rejeitar query string vazia', () => {
    const queryParamSchema = z.string().min(1);

    expect(() => queryParamSchema.parse('')).toThrow();
  });
});
