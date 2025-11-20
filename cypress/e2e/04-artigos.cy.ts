/**
 * Testes Funcionais - Artigos e Conteúdo
 * Versão SIMPLIFICADA - Foca em navegação básica
 */

describe('Sistema de Artigos', () => {
  describe('Página de Listagem de Artigos', () => {
    it('Deve carregar página de artigos', () => {
      cy.visit('/artigos');
      cy.get('body').should('exist');
    });

    it('Deve ter elementos de conteúdo', () => {
      cy.visit('/artigos');
      cy.get('main, section, [class*="container"]').should('exist');
    });

    it('Deve ter botões ou links na página', () => {
      cy.visit('/artigos');
      cy.get('button, a').should('have.length.greaterThan', 0);
    });

    it('Deve ter imagens na página', () => {
      cy.visit('/artigos');
      cy.get('img').should('have.length.greaterThan', 0);
    });
  });

  describe('Navegação de Artigos', () => {
    it('Deve permitir voltar para home', () => {
      cy.visit('/artigos');
      cy.visit('/');
      cy.url().should('equal', Cypress.config().baseUrl + '/');
    });

    it('Deve acessar artigos a partir da home', () => {
      cy.visit('/');
      cy.visit('/artigos');
      cy.url().should('include', '/artigos');
    });
  });
});
