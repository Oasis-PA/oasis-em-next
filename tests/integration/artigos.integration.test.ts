// tests/integration/artigos.integration.test.ts
import { describe, it, expect } from '@jest/globals';
import { prisma } from './setup';

describe('Testes de Integração - Artigos', () => {

  describe('Criação de Artigo', () => {
    it('deve criar um artigo com sucesso no banco de dados', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Como cuidar da pele no verão',
          slug: 'como-cuidar-da-pele-no-verao',
          conteudo: 'Conteúdo completo do artigo sobre cuidados com a pele no verão...',
          resumo: 'Dicas essenciais para proteger sua pele',
          status: 'publicado',
        },
      });

      expect(artigo).toHaveProperty('id');
      expect(artigo.titulo).toBe('Como cuidar da pele no verão');
      expect(artigo.slug).toBe('como-cuidar-da-pele-no-verao');
      expect(artigo.status).toBe('publicado');
      expect(artigo.createdAt).toBeInstanceOf(Date);
    });

    it('deve criar artigo com todas as propriedades opcionais', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Guia Completo de Cuidados Capilares',
          slug: 'guia-completo-cuidados-capilares',
          conteudo: 'Conteúdo detalhado...',
          resumo: 'Tudo sobre cuidados com cabelo',
          imagemHeader: 'https://exemplo.com/header.jpg',
          status: 'publicado',
          dataPublicacao: new Date('2024-01-15'),
          themeDark: true,
        },
      });

      expect(artigo.imagemHeader).toBe('https://exemplo.com/header.jpg');
      expect(artigo.themeDark).toBe(true);
      expect(artigo.dataPublicacao).toBeInstanceOf(Date);
    });

    it('deve criar artigo com tags (relação many-to-many)', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Hidratação Capilar Profunda',
          slug: 'hidratacao-capilar-profunda',
          conteudo: 'Conteúdo sobre hidratação...',
          status: 'publicado',
          tags: {
            create: [
              { id_tag: 1 }, // Hidratação
              { id_tag: 2 }, // Nutrição
            ],
          },
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      expect(artigo.tags.length).toBe(2);
      expect(artigo.tags[0].tag.nome).toBe('Hidratação');
      expect(artigo.tags[1].tag.nome).toBe('Nutrição');
    });

    it('deve rejeitar criação de artigo com slug duplicado (constraint de unicidade)', async () => {
      // Criar primeiro artigo
      await prisma.artigo.create({
        data: {
          titulo: 'Primeiro Artigo',
          slug: 'slug-unico',
          conteudo: 'Conteúdo...',
          status: 'publicado',
        },
      });

      // Tentar criar segundo artigo com mesmo slug
      await expect(
        prisma.artigo.create({
          data: {
            titulo: 'Segundo Artigo',
            slug: 'slug-unico', // Slug duplicado
            conteudo: 'Conteúdo...',
            status: 'publicado',
          },
        })
      ).rejects.toThrow();
    });
  });

  describe('Leitura de Artigos', () => {
    it('deve buscar artigo por slug', async () => {
      await prisma.artigo.create({
        data: {
          titulo: 'Rotina Skincare',
          slug: 'rotina-skincare',
          conteudo: 'Conteúdo...',
          status: 'publicado',
        },
      });

      const artigo = await prisma.artigo.findUnique({
        where: { slug: 'rotina-skincare' },
      });

      expect(artigo).not.toBeNull();
      expect(artigo?.titulo).toBe('Rotina Skincare');
    });

    it('deve filtrar artigos por status', async () => {
      // Criar artigos com diferentes status
      await prisma.artigo.createMany({
        data: [
          { titulo: 'Artigo 1', slug: 'artigo-1', conteudo: '...', status: 'publicado' },
          { titulo: 'Artigo 2', slug: 'artigo-2', conteudo: '...', status: 'rascunho' },
          { titulo: 'Artigo 3', slug: 'artigo-3', conteudo: '...', status: 'publicado' },
          { titulo: 'Artigo 4', slug: 'artigo-4', conteudo: '...', status: 'arquivado' },
        ],
      });

      const publicados = await prisma.artigo.findMany({
        where: { status: 'publicado' },
      });

      const rascunhos = await prisma.artigo.findMany({
        where: { status: 'rascunho' },
      });

      expect(publicados.length).toBe(2);
      expect(rascunhos.length).toBe(1);
    });

    it('deve buscar artigos com tags', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Cabelos Cacheados',
          slug: 'cabelos-cacheados',
          conteudo: 'Dicas para cabelos cacheados...',
          status: 'publicado',
          tags: {
            create: [
              { id_tag: 1 }, // Hidratação
              { id_tag: 4 }, // Vegano
            ],
          },
        },
      });

      const artigoComTags = await prisma.artigo.findUnique({
        where: { id: artigo.id },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      expect(artigoComTags?.tags.length).toBe(2);
      expect(artigoComTags?.tags[0].tag.nome).toBe('Hidratação');
    });

    it('deve listar artigos ordenados por data de publicação', async () => {
      // Criar artigos com diferentes datas
      await prisma.artigo.create({
        data: {
          titulo: 'Artigo Antigo',
          slug: 'artigo-antigo',
          conteudo: '...',
          status: 'publicado',
          dataPublicacao: new Date('2023-01-01'),
        },
      });

      await prisma.artigo.create({
        data: {
          titulo: 'Artigo Recente',
          slug: 'artigo-recente',
          conteudo: '...',
          status: 'publicado',
          dataPublicacao: new Date('2024-01-01'),
        },
      });

      const artigos = await prisma.artigo.findMany({
        orderBy: { dataPublicacao: 'desc' },
        where: { status: 'publicado' },
      });

      expect(artigos[0].titulo).toBe('Artigo Recente');
      expect(artigos[1].titulo).toBe('Artigo Antigo');
    });
  });

  describe('Atualização de Artigo', () => {
    it('deve atualizar conteúdo do artigo', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Artigo Original',
          slug: 'artigo-original',
          conteudo: 'Conteúdo original...',
          status: 'rascunho',
        },
      });

      const artigoAtualizado = await prisma.artigo.update({
        where: { id: artigo.id },
        data: {
          titulo: 'Artigo Atualizado',
          conteudo: 'Conteúdo atualizado...',
          status: 'publicado',
          dataPublicacao: new Date(),
        },
      });

      expect(artigoAtualizado.titulo).toBe('Artigo Atualizado');
      expect(artigoAtualizado.status).toBe('publicado');
      expect(artigoAtualizado.dataPublicacao).toBeInstanceOf(Date);
    });

    it('deve alterar status de rascunho para publicado', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Novo Artigo',
          slug: 'novo-artigo',
          conteudo: 'Conteúdo...',
          status: 'rascunho',
        },
      });

      const artigoPublicado = await prisma.artigo.update({
        where: { id: artigo.id },
        data: {
          status: 'publicado',
          dataPublicacao: new Date(),
        },
      });

      expect(artigoPublicado.status).toBe('publicado');
      expect(artigoPublicado.dataPublicacao).not.toBeNull();
    });

    it('deve adicionar tags a artigo existente', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Artigo Sem Tags',
          slug: 'artigo-sem-tags',
          conteudo: 'Conteúdo...',
          status: 'publicado',
        },
      });

      // Adicionar tags
      await prisma.artigo.update({
        where: { id: artigo.id },
        data: {
          tags: {
            create: [
              { id_tag: 1 },
              { id_tag: 2 },
            ],
          },
        },
      });

      const artigoComTags = await prisma.artigo.findUnique({
        where: { id: artigo.id },
        include: { tags: true },
      });

      expect(artigoComTags?.tags.length).toBe(2);
    });
  });

  describe('Deleção de Artigo', () => {
    it('deve deletar artigo do banco de dados', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Artigo para Deletar',
          slug: 'artigo-deletar',
          conteudo: 'Conteúdo...',
          status: 'rascunho',
        },
      });

      await prisma.artigo.delete({
        where: { id: artigo.id },
      });

      const artigoDeletado = await prisma.artigo.findUnique({
        where: { id: artigo.id },
      });

      expect(artigoDeletado).toBeNull();
    });

    it('deve deletar artigo e suas tags em cascade', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Artigo com Tags',
          slug: 'artigo-com-tags',
          conteudo: 'Conteúdo...',
          status: 'publicado',
          tags: {
            create: [
              { id_tag: 1 },
              { id_tag: 2 },
            ],
          },
        },
      });

      // Deletar artigo
      await prisma.artigo.delete({
        where: { id: artigo.id },
      });

      // Verificar que tags foram deletadas em cascade
      const tags = await prisma.artigoTag.findMany({
        where: { id_artigo: artigo.id },
      });

      expect(tags.length).toBe(0);
    });

    it('deve deletar artigo e seus favoritos em cascade', async () => {
      // Criar usuário
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João',
          email: 'joao@teste.com',
          senha: 'hash',
          id_genero: 1,
        },
      });

      // Criar artigo
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Artigo Favorito',
          slug: 'artigo-favorito',
          conteudo: 'Conteúdo...',
          status: 'publicado',
        },
      });

      // Adicionar aos favoritos
      await prisma.favoritoArtigo.create({
        data: {
          id_usuario: usuario.id,
          id_artigo: artigo.id,
        },
      });

      // Deletar artigo
      await prisma.artigo.delete({
        where: { id: artigo.id },
      });

      // Verificar que favoritos foram deletados em cascade
      const favoritos = await prisma.favoritoArtigo.findMany({
        where: { id_artigo: artigo.id },
      });

      expect(favoritos.length).toBe(0);
    });
  });

  describe('Favoritos de Artigos', () => {
    it('deve adicionar artigo aos favoritos', async () => {
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Maria',
          email: 'maria@teste.com',
          senha: 'hash',
          id_genero: 2,
        },
      });

      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Artigo Interessante',
          slug: 'artigo-interessante',
          conteudo: 'Conteúdo...',
          status: 'publicado',
        },
      });

      const favorito = await prisma.favoritoArtigo.create({
        data: {
          id_usuario: usuario.id,
          id_artigo: artigo.id,
        },
      });

      expect(favorito).toHaveProperty('id');
      expect(favorito.id_usuario).toBe(usuario.id);
      expect(favorito.id_artigo).toBe(artigo.id);
    });

    it('deve rejeitar duplicação de favorito (constraint único)', async () => {
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João',
          email: 'joao@teste.com',
          senha: 'hash',
          id_genero: 1,
        },
      });

      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Artigo',
          slug: 'artigo',
          conteudo: 'Conteúdo...',
          status: 'publicado',
        },
      });

      // Adicionar aos favoritos
      await prisma.favoritoArtigo.create({
        data: {
          id_usuario: usuario.id,
          id_artigo: artigo.id,
        },
      });

      // Tentar adicionar novamente
      await expect(
        prisma.favoritoArtigo.create({
          data: {
            id_usuario: usuario.id,
            id_artigo: artigo.id,
          },
        })
      ).rejects.toThrow();
    });

    it('deve listar artigos favoritados por usuário', async () => {
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Maria',
          email: 'maria@teste.com',
          senha: 'hash',
          id_genero: 2,
        },
      });

      // Criar artigos
      const artigo1 = await prisma.artigo.create({
        data: { titulo: 'Artigo 1', slug: 'artigo-1', conteudo: '...', status: 'publicado' },
      });

      const artigo2 = await prisma.artigo.create({
        data: { titulo: 'Artigo 2', slug: 'artigo-2', conteudo: '...', status: 'publicado' },
      });

      // Adicionar aos favoritos
      await prisma.favoritoArtigo.createMany({
        data: [
          { id_usuario: usuario.id, id_artigo: artigo1.id },
          { id_usuario: usuario.id, id_artigo: artigo2.id },
        ],
      });

      // Buscar favoritos
      const favoritos = await prisma.favoritoArtigo.findMany({
        where: { id_usuario: usuario.id },
        include: { artigo: true },
      });

      expect(favoritos.length).toBe(2);
      expect(favoritos[0].artigo.titulo).toBe('Artigo 1');
      expect(favoritos[1].artigo.titulo).toBe('Artigo 2');
    });
  });
});
