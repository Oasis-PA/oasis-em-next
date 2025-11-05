/**
 * Testes Funcionais - Artigos e Conteúdo
 * Funcionalidade: Visualização e gerenciamento de artigos
 * Tipo: Teste Funcional (Interface)
 */

describe('Sistema de Artigos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Página de Listagem de Artigos', () => {
    it('Deve exibir página de artigos', () => {
      cy.visit('/artigos');
      cy.contains(/artigos|blog|conteúdo/i).should('be.visible');
    });

    it('Deve exibir lista de artigos publicados', () => {
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card, [class*="article"]')
        .should('have.length.greaterThan', 0);
    });

    it('Deve exibir informações básicas dos artigos', () => {
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card').first().within(() => {
        cy.get('img').should('exist'); // Imagem
        cy.contains(/[A-Za-z]/i).should('exist'); // Título
      });
    });

    it('Deve permitir buscar artigos por título', () => {
      cy.visit('/artigos');
      cy.get('input[type="text"][placeholder*="buscar"], [data-testid="search-input"]')
        .first()
        .type('cabelo');

      cy.get('[data-testid="article-card"], .article-card').should('exist');
    });

    it('Deve permitir filtrar artigos por tag', () => {
      cy.visit('/artigos');
      cy.get('button:contains("Tag"), button:contains("Filtro"), [data-testid="tag-filter"]')
        .first()
        .click();

      cy.get('[role="option"], .tag-option').first().click();

      cy.get('[data-testid="article-card"], .article-card').should('exist');
    });

    it('Deve permitir ordenar artigos por data', () => {
      cy.visit('/artigos');
      cy.get('select[name="sort"], button:contains("Ordenar"), [data-testid="sort"]')
        .first()
        .click();

      cy.get('option:contains("Data"), [role="option"]:contains("Recente")').first().click();

      cy.get('[data-testid="article-card"], .article-card').should('exist');
    });

    it('Deve permitir paginação de artigos', () => {
      cy.visit('/artigos');
      cy.get('button').contains(/próxima|next|>/).should('exist');
    });
  });

  describe('Página de Detalhes do Artigo', () => {
    it('Deve exibir conteúdo completo do artigo', () => {
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card').first().click();

      cy.contains(/artigo|conteúdo|leia/i).should('exist');
      cy.get('img').should('exist'); // Imagem do artigo
    });

    it('Deve exibir título e data do artigo', () => {
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card').first().click();

      cy.contains(/\d{1,2}\/\d{1,2}\/\d{4}|publicado|escrito/i).should('exist');
    });

    it('Deve exibir autor do artigo', () => {
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card').first().click();

      cy.contains(/por|autor|escrito|escrita/i).should('exist');
    });

    it('Deve exibir tags do artigo', () => {
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card').first().click();

      cy.get('[data-testid="article-tag"], .tag, .badge').should('have.length.greaterThan', 0);
    });

    it('Deve permitir adicionar artigo aos favoritos', () => {
      cy.login('test@example.com', 'Senha123!@#');
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card').first().click();

      cy.get('button[data-testid="favorite-article-button"], button:contains("Favoritar")')
        .first()
        .click();

      cy.contains(/adicionado aos favoritos|removido/i).should('be.visible');
    });

    it('Deve permitir compartilhar artigo', () => {
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card').first().click();

      cy.get('button:contains("Compartilhar"), button:contains("Copiar")')
        .first()
        .click();

      cy.contains(/copiado|compartilhado/i).should('be.visible');
    });

    it('Deve exibir artigos relacionados', () => {
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card').first().click();

      cy.contains(/relacionados|similar|também|leia/i).should('exist');
      cy.get('[data-testid="related-article"], .related-article').should('have.length.greaterThan', 0);
    });
  });

  describe('Painel Admin de Artigos', () => {
    beforeEach(() => {
      cy.login('admin@oasis.com', 'AdminPassword123!@#');
    });

    it('Deve exibir painel admin de artigos', () => {
      cy.visit('/admin/artigos');
      cy.contains(/artigos|gerenciar|painel/i).should('be.visible');
    });

    it('Deve permitir criar novo artigo', () => {
      cy.visit('/admin/artigos');
      cy.get('button:contains("Novo"), button:contains("Criar")')
        .first()
        .click();

      cy.get('input[name="titulo"], input[placeholder*="Título"]').type('Novo Artigo de Teste');
      cy.get('textarea[name="conteudo"], textarea[placeholder*="Conteúdo"]').type('Conteúdo do artigo de teste');

      cy.get('button:contains("Publicar"), button:contains("Salvar")')
        .first()
        .click();

      cy.contains(/criado|publicado|sucesso/i).should('be.visible');
    });

    it('Deve permitir editar artigo existente', () => {
      cy.visit('/admin/artigos');
      cy.get('[data-testid="article-item"], .article-item').first().within(() => {
        cy.get('button:contains("Editar"), button:contains("✎")').click();
      });

      cy.get('input[name="titulo"]').clear().type('Artigo Editado');
      cy.get('button:contains("Salvar"), button:contains("Atualizar")')
        .first()
        .click();

      cy.contains(/atualizado|sucesso/i).should('be.visible');
    });

    it('Deve permitir excluir artigo', () => {
      cy.visit('/admin/artigos');
      cy.get('[data-testid="article-item"], .article-item').first().within(() => {
        cy.get('button:contains("Excluir"), button:contains("✕"), button:contains("Remover")').click();
      });

      cy.get('button:contains("Confirmar"), button:contains("Sim")').click();

      cy.contains(/excluído|removido|sucesso/i).should('be.visible');
    });

    it('Deve permitir fazer upload de imagem de capa', () => {
      cy.visit('/admin/artigos');
      cy.get('button:contains("Novo"), button:contains("Criar")')
        .first()
        .click();

      cy.get('input[type="file"], [data-testid="image-upload"]')
        .selectFile('cypress/fixtures/test-image.jpg', { force: true });

      cy.contains(/enviado|upload/i).should('be.visible');
    });

    it('Deve permitir agendar publicação de artigo', () => {
      cy.visit('/admin/artigos');
      cy.get('button:contains("Novo"), button:contains("Criar")')
        .first()
        .click();

      cy.get('input[name="titulo"]').type('Artigo Agendado');
      cy.get('textarea[name="conteudo"]').type('Conteúdo agendado');

      cy.get('input[type="datetime-local"], [data-testid="schedule-input"]')
        .type('2025-12-25T10:00');

      cy.get('button:contains("Agendar"), button:contains("Publicar Depois")')
        .first()
        .click();

      cy.contains(/agendado|sucesso/i).should('be.visible');
    });

    it('Deve exibir lista de artigos em rascunho', () => {
      cy.visit('/admin/artigos');

      cy.get('button:contains("Rascunhos"), tab:contains("Rascunho")')
        .first()
        .click();

      cy.get('[data-testid="article-item"], .article-item').should('exist');
    });

    it('Deve permitir filtrar artigos por status', () => {
      cy.visit('/admin/artigos');

      cy.get('select[name="status"], button:contains("Status")')
        .first()
        .click();

      cy.get('option:contains("Publicado"), [role="option"]:contains("Publicado")')
        .first()
        .click();

      cy.get('[data-testid="article-item"], .article-item').should('exist');
    });
  });

  describe('Modo Escuro em Artigos', () => {
    it('Deve permitir alternar para modo escuro', () => {
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card').first().click();

      cy.get('button[data-testid="theme-toggle"], button:contains("🌙"), button:contains("☀")')
        .first()
        .click();

      cy.get('body').should('have.class', 'dark').or(cy.get('html').should('have.attr', 'data-theme', 'dark'));
    });

    it('Deve salvar preferência de tema', () => {
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card').first().click();

      cy.get('button[data-testid="theme-toggle"]').first().click();

      // Recarrega a página
      cy.reload();

      // Verifica se o tema foi mantido
      cy.get('body').should('have.class', 'dark').or(cy.get('html').should('have.attr', 'data-theme', 'dark'));
    });
  });
});
