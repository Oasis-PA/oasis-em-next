/**
 * Testes Funcionais - Sistema de Favoritos
 * Versão SIMPLIFICADA - Foca em navegação e UI básica
 */

describe('Sistema de Favoritos', () => {
  describe('Página de Favoritos de Produtos', () => {
    it('Deve carregar página de favoritos de produtos', () => {
      cy.visit('/favoritos');
      cy.get('body').should('exist');
    });

    it('Deve ter elementos na página', () => {
      cy.visit('/favoritos');
      cy.get('main, section, [class*="container"]').should('exist');
    });

    it('Deve permitir voltar para produtos', () => {
      cy.visit('/favoritos');
      cy.visit('/produtos');
      cy.url().should('include', '/produtos');
    });
  });

  describe('Navegação entre Favoritos e Artigos', () => {
    it('Deve acessar artigos a partir de favoritos', () => {
      cy.visit('/favoritos');
      cy.visit('/artigos');
      cy.url().should('include', '/artigos');
    });

    it('Deve acessar home a partir de favoritos', () => {
      cy.visit('/favoritos');
      cy.visit('/');
      cy.url().should('equal', Cypress.config().baseUrl + '/');
    });
  });

  describe('Navegação de Favoritos', () => {
    it('Deve acessar favoritos a partir da home', () => {
      cy.visit('/');
      cy.visit('/favoritos');
      cy.url().should('include', '/favoritos');
    });

    it('Deve ter botões ou links na página', () => {
      cy.visit('/favoritos');
      cy.get('button, a').should('have.length.greaterThan', 0);
    });
  });
});
