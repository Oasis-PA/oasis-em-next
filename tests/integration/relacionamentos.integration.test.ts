// tests/integration/relacionamentos.integration.test.ts
import { describe, it, expect } from '@jest/globals';
import { prisma } from './setup';
import bcrypt from 'bcryptjs';

describe('Testes de Integração - Relacionamentos e Cascades', () => {

  describe('Relacionamentos One-to-Many', () => {
    it('deve criar usuário com múltiplos favoritos de produtos', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João Silva',
          email: 'joao@teste.com',
          senha: senhaHash,
          id_genero: 1,
          favoritos: {
            create: [
              {
                produto: {
                  create: {
                    nome: 'Shampoo',
                    marca: 'Dove',
                    preco: 25.00,
                    id_categoria: 1,
                  },
                },
              },
              {
                produto: {
                  create: {
                    nome: 'Condicionador',
                    marca: 'Dove',
                    preco: 30.00,
                    id_categoria: 2,
                  },
                },
              },
            ],
          },
        },
        include: {
          favoritos: {
            include: {
              produto: true,
            },
          },
        },
      });

      expect(usuario.favoritos.length).toBe(2);
      expect(usuario.favoritos[0].produto.nome).toBe('Shampoo');
      expect(usuario.favoritos[1].produto.nome).toBe('Condicionador');
    });

    it('deve criar produto com múltiplas avaliações de diferentes usuários', async () => {
      // Criar usuários
      const usuario1 = await prisma.usuario.create({
        data: {
          nome: 'João',
          email: 'joao@teste.com',
          senha: 'hash1',
          id_genero: 1,
        },
      });

      const usuario2 = await prisma.usuario.create({
        data: {
          nome: 'Maria',
          email: 'maria@teste.com',
          senha: 'hash2',
          id_genero: 2,
        },
      });

      // Criar produto com avaliações
      const produto = await prisma.produto.create({
        data: {
          nome: 'Máscara Capilar',
          marca: 'Lola',
          preco: 45.00,
          id_categoria: 3,
          avaliacoes: {
            create: [
              {
                id_usuario: usuario1.id_usuario,
                nota: 5,
                comentario: 'Produto excelente!',
              },
              {
                id_usuario: usuario2.id_usuario,
                nota: 4,
                comentario: 'Muito bom, recomendo!',
              },
            ],
          },
        },
        include: {
          avaliacoes: {
            include: {
              usuario: true,
            },
          },
        },
      });

      expect(produto.avaliacoes.length).toBe(2);
      expect(produto.avaliacoes[0].usuario.nome).toBe('João');
      expect(produto.avaliacoes[1].nota).toBe(4);
    });

    it('deve criar produto com múltiplas imagens ordenadas', async () => {
      const produto = await prisma.produto.create({
        data: {
          nome: 'Hidratante Facial',
          marca: 'Neutrogena',
          preco: 35.00,
          id_categoria: 4,
          ImagemProduto: {
            create: [
              { url_imagem: 'https://exemplo.com/frente.jpg', ordem: 1 },
              { url_imagem: 'https://exemplo.com/verso.jpg', ordem: 2 },
              { url_imagem: 'https://exemplo.com/lateral.jpg', ordem: 3 },
              { url_imagem: 'https://exemplo.com/detalhe.jpg', ordem: 4 },
            ],
          },
        },
        include: {
          ImagemProduto: {
            orderBy: { ordem: 'asc' },
          },
        },
      });

      expect(produto.ImagemProduto.length).toBe(4);
      expect(produto.ImagemProduto[0].ordem).toBe(1);
      expect(produto.ImagemProduto[3].ordem).toBe(4);
    });
  });

  describe('Relacionamentos Many-to-Many', () => {
    it('deve criar artigo com múltiplas tags', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Guia Completo de Hidratação',
          slug: 'guia-hidratacao',
          conteudo: 'Conteúdo detalhado...',
          status: 'publicado',
          ArtigoTag: {
            create: [
              { tagId: 1 }, // Hidratação
              { tagId: 2 }, // Nutrição
              { tagId: 4 }, // Vegano
              { tagId: 5 }, // Orgânico
            ],
          },
        },
        include: {
          ArtigoTag: {
            include: {
              Tag: true,
            },
          },
        },
      });

      expect(artigo.ArtigoTag.length).toBe(4);
      const nomesTag = artigo.ArtigoTag.map(at => at.Tag.nome);
      expect(nomesTag).toContain('Hidratação');
      expect(nomesTag).toContain('Vegano');
    });

    it('deve buscar artigos por tag (relação inversa)', async () => {
      // Criar artigos com tag "Hidratação"
      await prisma.artigo.create({
        data: {
          titulo: 'Hidratação Capilar',
          slug: 'hidratacao-capilar',
          conteudo: '...',
          status: 'publicado',
          ArtigoTag: {
            create: [{ tagId: 1 }], // Hidratação
          },
        },
      });

      await prisma.artigo.create({
        data: {
          titulo: 'Hidratação da Pele',
          slug: 'hidratacao-pele',
          conteudo: '...',
          status: 'publicado',
          ArtigoTag: {
            create: [{ tagId: 1 }], // Hidratação
          },
        },
      });

      // Buscar artigos com tag de Hidratação
      const artigosComHidratacao = await prisma.artigo.findMany({
        where: {
          ArtigoTag: {
            some: {
              tagId: 1,
            },
          },
        },
      });

      expect(artigosComHidratacao.length).toBe(2);
    });

    it('deve permitir que uma tag seja usada em múltiplos artigos', async () => {
      // Criar 3 artigos com a mesma tag
      for (let i = 1; i <= 3; i++) {
        await prisma.artigo.create({
          data: {
            titulo: `Artigo ${i}`,
            slug: `artigo-${i}`,
            conteudo: '...',
            status: 'publicado',
            ArtigoTag: {
              create: [{ tagId: 1 }], // Hidratação
            },
          },
        });
      }

      // Contar artigos com tag "Hidratação"
      const count = await prisma.artigoTag.count({
        where: { tagId: 1 },
      });

      expect(count).toBe(3);
    });
  });

  describe('Operações CASCADE - Deleção', () => {
    it('deve deletar usuário e todos os seus favoritos de produtos em cascade', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      // Criar usuário com favoritos
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João Silva',
          email: 'joao@teste.com',
          senha: senhaHash,
          id_genero: 1,
        },
      });

      // Criar produtos
      const produto1 = await prisma.produto.create({
        data: { nome: 'Produto 1', marca: 'Marca A', preco: 20.00, id_categoria: 1 },
      });

      const produto2 = await prisma.produto.create({
        data: { nome: 'Produto 2', marca: 'Marca B', preco: 25.00, id_categoria: 2 },
      });

      // Adicionar aos favoritos
      await prisma.favorito.createMany({
        data: [
          { id_usuario: usuario.id_usuario, id_produto: produto1.id_produto },
          { id_usuario: usuario.id_usuario, id_produto: produto2.id_produto },
        ],
      });

      // Deletar usuário
      await prisma.usuario.delete({
        where: { id_usuario: usuario.id_usuario },
      });

      // Verificar que favoritos foram deletados em cascade
      const favoritos = await prisma.favorito.findMany({
        where: { id_usuario: usuario.id_usuario },
      });

      expect(favoritos.length).toBe(0);

      // Verificar que produtos NÃO foram deletados
      const produtos = await prisma.produto.findMany({
        where: {
          id_produto: {
            in: [produto1.id_produto, produto2.id_produto],
          },
        },
      });

      expect(produtos.length).toBe(2);
    });

    it('deve deletar usuário e todas as suas avaliações em cascade', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      const usuario = await prisma.usuario.create({
        data: {
          nome: 'Maria Santos',
          email: 'maria@teste.com',
          senha: senhaHash,
          id_genero: 2,
        },
      });

      const produto = await prisma.produto.create({
        data: { nome: 'Produto Avaliado', marca: 'Marca', preco: 30.00, id_categoria: 1 },
      });

      // Criar avaliações
      await prisma.avaliacao.createMany({
        data: [
          { id_usuario: usuario.id_usuario, id_produto: produto.id_produto, nota: 5, comentario: 'Ótimo!' },
          { id_usuario: usuario.id_usuario, id_produto: produto.id_produto, nota: 4, comentario: 'Bom!' },
        ],
      });

      // Deletar usuário
      await prisma.usuario.delete({
        where: { id_usuario: usuario.id_usuario },
      });

      // Verificar que avaliações foram deletadas
      const avaliacoes = await prisma.avaliacao.findMany({
        where: { id_usuario: usuario.id_usuario },
      });

      expect(avaliacoes.length).toBe(0);
    });

    it('deve deletar produto e todas as suas imagens em cascade', async () => {
      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto com Imagens',
          marca: 'Marca',
          preco: 40.00,
          id_categoria: 1,
          ImagemProduto: {
            create: [
              { url_imagem: 'https://exemplo.com/img1.jpg', ordem: 1 },
              { url_imagem: 'https://exemplo.com/img2.jpg', ordem: 2 },
              { url_imagem: 'https://exemplo.com/img3.jpg', ordem: 3 },
            ],
          },
        },
      });

      // Deletar produto
      await prisma.produto.delete({
        where: { id_produto: produto.id_produto },
      });

      // Verificar que imagens foram deletadas
      const imagens = await prisma.imagemProduto.findMany({
        where: { id_produto: produto.id_produto },
      });

      expect(imagens.length).toBe(0);
    });

    it('deve deletar produto e todas as suas avaliações em cascade', async () => {
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João',
          email: 'joao@teste.com',
          senha: 'hash',
          id_genero: 1,
        },
      });

      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto Avaliado',
          marca: 'Marca',
          preco: 35.00,
          id_categoria: 1,
          avaliacoes: {
            create: [
              { id_usuario: usuario.id_usuario, nota: 5, comentario: 'Excelente!' },
            ],
          },
        },
      });

      // Deletar produto
      await prisma.produto.delete({
        where: { id_produto: produto.id_produto },
      });

      // Verificar que avaliações foram deletadas
      const avaliacoes = await prisma.avaliacao.findMany({
        where: { id_produto: produto.id_produto },
      });

      expect(avaliacoes.length).toBe(0);
    });

    it('deve deletar artigo e todas as suas tags (ArtigoTag) em cascade', async () => {
      const artigo = await prisma.artigo.create({
        data: {
          titulo: 'Artigo com Tags',
          slug: 'artigo-tags',
          conteudo: '...',
          status: 'publicado',
          ArtigoTag: {
            create: [
              { tagId: 1 },
              { tagId: 2 },
              { tagId: 3 },
            ],
          },
        },
      });

      // Deletar artigo
      await prisma.artigo.delete({
        where: { id: artigo.id },
      });

      // Verificar que relacionamentos ArtigoTag foram deletados
      const artigoTags = await prisma.artigoTag.findMany({
        where: { artigoId: artigo.id },
      });

      expect(artigoTags.length).toBe(0);

      // Verificar que as Tags em si NÃO foram deletadas
      const tags = await prisma.tag.findMany({
        where: {
          id_tag: {
            in: [1, 2, 3],
          },
        },
      });

      expect(tags.length).toBe(3); // Tags ainda existem
    });
  });

  describe('Constraints de Integridade Referencial', () => {
    it('deve rejeitar criação de produto com categoria inexistente', async () => {
      await expect(
        prisma.produto.create({
          data: {
            nome: 'Produto Inválido',
            marca: 'Marca',
            preco: 20.00,
            id_categoria: 999, // Categoria inexistente
          },
        })
      ).rejects.toThrow();
    });

    it('deve rejeitar criação de usuário com gênero inexistente', async () => {
      await expect(
        prisma.usuario.create({
          data: {
            nome: 'João',
            email: 'joao@teste.com',
            senha: 'hash',
            id_genero: 999, // Gênero inexistente
          },
        })
      ).rejects.toThrow();
    });

    it('deve rejeitar criação de favorito com usuário inexistente', async () => {
      const produto = await prisma.produto.create({
        data: {
          nome: 'Produto',
          marca: 'Marca',
          preco: 20.00,
          id_categoria: 1,
        },
      });

      await expect(
        prisma.favorito.create({
          data: {
            id_usuario: 999999, // Usuário inexistente
            id_produto: produto.id_produto,
          },
        })
      ).rejects.toThrow();
    });

    it('deve rejeitar criação de avaliação com produto inexistente', async () => {
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João',
          email: 'joao@teste.com',
          senha: 'hash',
          id_genero: 1,
        },
      });

      await expect(
        prisma.avaliacao.create({
          data: {
            id_usuario: usuario.id_usuario,
            id_produto: 999999, // Produto inexistente
            nota: 5,
            comentario: 'Ótimo!',
          },
        })
      ).rejects.toThrow();
    });
  });

  describe('Transações Complexas com Múltiplos Relacionamentos', () => {
    it('deve criar usuário, produto e favorito em uma transação atômica', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      const resultado = await prisma.$transaction(async (tx) => {
        // Criar usuário
        const usuario = await tx.usuario.create({
          data: {
            nome: 'João Silva',
            email: 'joao@teste.com',
            senha: senhaHash,
            id_genero: 1,
          },
        });

        // Criar produto
        const produto = await tx.produto.create({
          data: {
            nome: 'Shampoo Especial',
            marca: 'Dove',
            preco: 28.50,
            id_categoria: 1,
          },
        });

        // Adicionar aos favoritos
        const favorito = await tx.favorito.create({
          data: {
            id_usuario: usuario.id_usuario,
            id_produto: produto.id_produto,
          },
        });

        return { usuario, produto, favorito };
      });

      expect(resultado.usuario.nome).toBe('João Silva');
      expect(resultado.produto.nome).toBe('Shampoo Especial');
      expect(resultado.favorito.id_usuario).toBe(resultado.usuario.id_usuario);
      expect(resultado.favorito.id_produto).toBe(resultado.produto.id_produto);
    });

    it('deve fazer rollback completo ao falhar em transação complexa', async () => {
      const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

      try {
        await prisma.$transaction(async (tx) => {
          // Criar usuário (sucesso)
          await tx.usuario.create({
            data: {
              nome: 'Maria',
              email: 'maria@teste.com',
              senha: senhaHash,
              id_genero: 2,
            },
          });

          // Criar produto (sucesso)
          await tx.produto.create({
            data: {
              nome: 'Condicionador',
              marca: 'Pantene',
              preco: 32.00,
              id_categoria: 2,
            },
          });

          // Tentar criar com categoria inválida (vai falhar)
          await tx.produto.create({
            data: {
              nome: 'Produto Inválido',
              marca: 'Marca',
              preco: 20.00,
              id_categoria: 999, // Categoria inexistente - vai falhar
            },
          });
        });
      } catch (error) {
        // Esperado falhar
      }

      // Verificar que NADA foi criado (rollback completo)
      const usuarios = await prisma.usuario.findMany({
        where: { email: 'maria@teste.com' },
      });

      const produtos = await prisma.produto.findMany({
        where: { nome: 'Condicionador' },
      });

      expect(usuarios.length).toBe(0);
      expect(produtos.length).toBe(0);
    });

    it('deve criar produto com imagens e avaliações em transação', async () => {
      const usuario = await prisma.usuario.create({
        data: {
          nome: 'João',
          email: 'joao@teste.com',
          senha: 'hash',
          id_genero: 1,
        },
      });

      const produto = await prisma.$transaction(async (tx) => {
        // Criar produto
        const novoProduto = await tx.produto.create({
          data: {
            nome: 'Máscara Nutritiva',
            marca: 'Lola',
            preco: 48.00,
            id_categoria: 3,
          },
        });

        // Adicionar imagens
        await tx.imagemProduto.createMany({
          data: [
            { id_produto: novoProduto.id_produto, url_imagem: 'https://exemplo.com/img1.jpg', ordem: 1 },
            { id_produto: novoProduto.id_produto, url_imagem: 'https://exemplo.com/img2.jpg', ordem: 2 },
          ],
        });

        // Adicionar avaliação
        await tx.avaliacao.create({
          data: {
            id_produto: novoProduto.id_produto,
            id_usuario: usuario.id_usuario,
            nota: 5,
            comentario: 'Produto maravilhoso!',
          },
        });

        return tx.produto.findUnique({
          where: { id_produto: novoProduto.id_produto },
          include: {
            ImagemProduto: true,
            avaliacoes: true,
          },
        });
      });

      expect(produto?.ImagemProduto.length).toBe(2);
      expect(produto?.avaliacoes.length).toBe(1);
      expect(produto?.avaliacoes[0].nota).toBe(5);
    });
  });
});
