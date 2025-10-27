// tests/api/admin-artigos.test.ts
import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';

// Schema para criação de artigos
const criarArtigoSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  slug: z.string().min(1, 'Slug é obrigatório')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  conteudo: z.string().min(1, 'Conteúdo é obrigatório'),
  resumo: z.string().max(500, 'Resumo muito longo').optional(),
  imagemHeader: z.string().url('URL da imagem inválida').optional(),
  status: z.enum(['rascunho', 'publicado', 'arquivado']).default('rascunho'),
  dataPublicacao: z.string().optional(),
  tagIds: z.array(z.number().int().positive()).optional(),
  themeDark: z.boolean().default(false)
});

// Schema para atualização de artigos
const atualizarArtigoSchema = z.object({
  titulo: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  conteudo: z.string().min(1).optional(),
  resumo: z.string().max(500).optional(),
  imagemHeader: z.string().url().optional(),
  status: z.enum(['rascunho', 'publicado', 'arquivado']).optional(),
  dataPublicacao: z.string().optional(),
  tagIds: z.array(z.number().int().positive()).optional(),
  themeDark: z.boolean().optional()
});

describe('POST /api/admin/artigos', () => {
  it('deve validar criação de artigo com dados completos', () => {
    const dadosValidos = {
      titulo: 'Como cuidar da pele no verão',
      slug: 'como-cuidar-da-pele-no-verao',
      conteudo: 'Conteúdo completo do artigo...',
      resumo: 'Dicas essenciais para cuidar da pele durante o verão',
      imagemHeader: 'https://exemplo.com/imagem.jpg',
      status: 'publicado' as const,
      dataPublicacao: '2024-01-15',
      tagIds: [1, 2, 3],
      themeDark: false
    };

    expect(() => criarArtigoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar criação de artigo com dados mínimos', () => {
    const dadosValidos = {
      titulo: 'Título do artigo',
      slug: 'titulo-do-artigo',
      conteudo: 'Conteúdo do artigo'
    };

    expect(() => criarArtigoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar título vazio', () => {
    const dadosInvalidos = {
      titulo: '',
      slug: 'titulo-artigo',
      conteudo: 'Conteúdo'
    };

    expect(() => criarArtigoSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar slug inválido com caracteres especiais', () => {
    const dadosInvalidos = {
      titulo: 'Título',
      slug: 'Título com Espaços!',
      conteudo: 'Conteúdo'
    };

    expect(() => criarArtigoSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar URL de imagem inválida', () => {
    const dadosInvalidos = {
      titulo: 'Título',
      slug: 'titulo-artigo',
      conteudo: 'Conteúdo',
      imagemHeader: 'url-invalida'
    };

    expect(() => criarArtigoSchema.parse(dadosInvalidos)).toThrow();
  });

  it('deve rejeitar status inválido', () => {
    const dadosInvalidos = {
      titulo: 'Título',
      slug: 'titulo-artigo',
      conteudo: 'Conteúdo',
      status: 'invalido'
    };

    expect(() => criarArtigoSchema.parse(dadosInvalidos)).toThrow();
  });
});

describe('PUT /api/admin/artigos/[id]', () => {
  it('deve validar atualização parcial de artigo', () => {
    const dadosValidos = {
      titulo: 'Novo título'
    };

    expect(() => atualizarArtigoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar atualização de status', () => {
    const dadosValidos = {
      status: 'publicado' as const
    };

    expect(() => atualizarArtigoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve validar atualização completa', () => {
    const dadosValidos = {
      titulo: 'Título atualizado',
      slug: 'titulo-atualizado',
      conteudo: 'Novo conteúdo',
      status: 'publicado' as const,
      themeDark: true
    };

    expect(() => atualizarArtigoSchema.parse(dadosValidos)).not.toThrow();
  });

  it('deve rejeitar slug inválido', () => {
    const dadosInvalidos = {
      slug: 'Slug Inválido!'
    };

    expect(() => atualizarArtigoSchema.parse(dadosInvalidos)).toThrow();
  });
});
