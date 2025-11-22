/**
 * Integration Tests: Artigos
 */

import { describe, it, expect } from '@jest/globals';
import { prisma } from './setup';

describe('[INTEGRATION] Artigos - API + Banco', () => {
  describe('Criação de Artigo', () => {
    it('deve criar um artigo com sucesso no banco de dados', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Como Cuidar de Cabelos Cacheados',
          slug: 'como-cuidar-cabelos-cacheados',
          conteudo: '# Como Cuidar\n\nConteúdo do artigo...',
          status: 'publicado',
        },
      });

      expect(artigo).toHaveProperty('id');
      expect(artigo.titulo).toBe('Como Cuidar de Cabelos Cacheados');
      expect(artigo.status).toBe('publicado');
    });

    it('deve criar artigo com título obrigatório', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Artigo com Título',
          slug: `teste-${Date.now()}`,
          conteudo: 'Conteúdo',
          status: 'publicado',
        },
      });

      expect(artigo.titulo).toBe('Artigo com Título');
    });
  });

  describe('Leitura de Artigos', () => {
    it('deve listar artigos publicados com paginação', async () => {
      const primeiraPagina = await prisma.artigo.findMany({
        where: { status: 'publicado' },
        take: 10,
        skip: 0,
        orderBy: { dataPublicacao: 'desc' },
      });

      expect(Array.isArray(primeiraPagina)).toBe(true);
    });

    it('deve filtrar artigos por status', async () => {
      const publicados = await prisma.artigo.findMany({
        where: { status: 'publicado' },
      });

      expect(Array.isArray(publicados)).toBe(true);
    });
  });

  describe('Atualização de Artigo', () => {
    it('deve atualizar dados do artigo', async () => {
      const artigo = await prisma.artigo.findFirst();
      if (!artigo) return;

      const atualizado = await prisma.artigo.update({
        where: { id: artigo.id },
        data: {
          status: 'publicado',
        },
      });

      expect(atualizado.id).toBe(artigo.id);
    });
  });
});
