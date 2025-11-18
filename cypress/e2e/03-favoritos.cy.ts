/**
 * Testes Funcionais - Sistema de Favoritos
 * Funcionalidade: Adicionar/remover favoritos e artigos
 * Tipo: Teste Funcional (Interface)
 */

describe('Sistema de Favoritos', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'Senha123!@#');
  });

  describe('Favoritos de Produtos', () => {
    it('Deve adicionar produto aos favoritos', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.get('button[data-testid="favorite-button"], button:contains("❤"), button:contains("Favoritar")')
        .first()
        .click();

      cy.contains(/adicionado|favorito/i).should('be.visible');
    });

    it('Deve remover produto dos favoritos', () => {
      cy.visit('/favoritos');
      cy.get('[data-testid="favorite-item"], .favorite-product').first().within(() => {
        cy.get('button[data-testid="remove-favorite"], button:contains("Remover"), button:contains("✕")')
          .click();
      });

      cy.contains(/removido|sucesso/i).should('be.visible');
    });

    it('Deve exibir página de favoritos', () => {
      cy.visit('/favoritos');
      cy.contains(/favoritos|meus favoritos/i).should('be.visible');
    });

    it('Deve exibir mensagem quando não há favoritos', () => {
      cy.visit('/favoritos');

      // Se houver favoritos, remove todos
      cy.get('[data-testid="favorite-item"], .favorite-product').each(() => {
        cy.get('[data-testid="remove-favorite"], button:contains("Remover")')
          .first()
          .click();
      });

      cy.contains(/nenhum favorito|vazio|adicione/i).should('be.visible');
    });

    it('Deve permitir ir ao produto a partir dos favoritos', () => {
      cy.visit('/favoritos');

      cy.get('[data-testid="favorite-item"], .favorite-product').first().click();

      cy.url().should('include', '/produtos');
      cy.contains(/detalhes|informações|especificações/i).should('exist');
    });

    it('Deve filtrar favoritos por categoria', () => {
      cy.visit('/favoritos');

      cy.get('select[name="categoria"], button:contains("Categoria"), [data-testid="filter"]')
        .first()
        .click();

      cy.get('option, [role="option"]').not(':first').first().click();

      cy.get('[data-testid="favorite-item"], .favorite-product').should('exist');
    });
  });

  describe('Favoritos de Artigos', () => {
    it('Deve adicionar artigo aos favoritos', () => {
      cy.visit('/artigos');
      cy.get('[data-testid="article-card"], .article-card').first().click();

      cy.get('button[data-testid="favorite-article-button"], button:contains("Favoritar")')
        .first()
        .click();

      cy.contains(/adicionado|favorito/i).should('be.visible');
    });

    it('Deve exibir página de artigos favoritos', () => {
      cy.visit('/favoritos/artigos');
      cy.contains(/artigos favoritos|meus artigos/i).should('be.visible');
    });

    it('Deve remover artigo dos favoritos', () => {
      cy.visit('/favoritos/artigos');

      cy.get('[data-testid="favorite-article"], .favorite-article')
        .first()
        .within(() => {
          cy.get('button:contains("Remover"), button:contains("✕")')
            .click();
        });

      cy.contains(/removido|sucesso/i).should('be.visible');
    });

    it('Deve exibir mensagem quando não há artigos favoritos', () => {
      cy.visit('/favoritos/artigos');

      // Remove todos se houver
      cy.get('[data-testid="favorite-article"]').each(() => {
        cy.get('button:contains("Remover"), [data-testid="remove-btn"]')
          .first()
          .click();
      });

      cy.contains(/nenhum artigo|vazio|adicione/i).should('be.visible');
    });

    it('Deve permitir ler artigo a partir dos favoritos', () => {
      cy.visit('/favoritos/artigos');

      cy.get('[data-testid="favorite-article"], .favorite-article').first().click();

      cy.url().should('include', '/artigos');
      cy.contains(/artigo|conteúdo|leia/i).should('exist');
    });
  });

  describe('Sincronização de Favoritos', () => {
    it('Deve manter favoritos após logout e login', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.get('button[data-testid="favorite-button"]').first().click();
      cy.contains(/adicionado/i).should('be.visible');

      // Logout
      cy.logout();

      // Login novamente
      cy.login('test@example.com', 'Senha123!@#');

      // Verifica se favorito persiste
      cy.visit('/favoritos');
      cy.get('[data-testid="favorite-item"]').should('have.length.greaterThan', 0);
    });

    it('Deve atualizar contador de favoritos', () => {
      cy.visit('/produtos');

      // Pega contador inicial
      cy.get('[data-testid="favorites-count"], .favorite-count')
        .first()
        .then(($count) => {
          const initialCount = parseInt($count.text()) || 0;

          // Adiciona favorito
          cy.get('[data-testid="product-card"]').first().click();
          cy.get('button[data-testid="favorite-button"]').first().click();

          // Volta e verifica contador
          cy.visit('/produtos');
          cy.get('[data-testid="favorites-count"], .favorite-count')
            .first()
            .should('contain', initialCount + 1);
        });
    });
  });

  describe('Compartilhamento de Favoritos', () => {
    it('Deve permitir copiar link dos favoritos', () => {
      cy.visit('/favoritos');

      cy.get('button:contains("Compartilhar"), button:contains("Copiar"), [data-testid="share-btn"]')
        .first()
        .click();

      cy.contains(/copiado|link|sucesso/i).should('be.visible');
    });

    it('Deve permitir compartilhar no WhatsApp', () => {
      cy.visit('/favoritos');

      cy.get('a[href*="whatsapp"], button:contains("WhatsApp")')
        .first()
        .should('have.attr', 'href')
        .and('include', 'whatsapp');
    });

    it('Deve permitir compartilhar no Facebook', () => {
      cy.visit('/favoritos');

      cy.get('a[href*="facebook"], button:contains("Facebook")')
        .first()
        .should('have.attr', 'href')
        .and('include', 'facebook');
    });
  });
});
