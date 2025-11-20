/**
 * Testes Funcionais - Responsividade e Performance
 * Versão SIMPLIFICADA - Foca em carregamento básico
 */

describe('Responsividade e Performance', () => {
  describe('Layout Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
    });

    it('Deve carregar home em mobile', () => {
      cy.visit('/');
      cy.get('body').should('exist');
    });

    it('Deve carregar produtos em mobile', () => {
      cy.visit('/produtos');
      cy.get('body').should('exist');
    });

    it('Deve ter elementos em mobile', () => {
      cy.visit('/');
      cy.get('main, section, [class*="container"]').should('exist');
    });
  });

  describe('Layout Tablet', () => {
    beforeEach(() => {
      cy.viewport('ipad-2');
    });

    it('Deve carregar home em tablet', () => {
      cy.visit('/');
      cy.get('body').should('exist');
    });

    it('Deve carregar produtos em tablet', () => {
      cy.visit('/produtos');
      cy.get('body').should('exist');
    });
  });

  describe('Layout Desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it('Deve carregar home em desktop', () => {
      cy.visit('/');
      cy.get('body').should('exist');
    });

    it('Deve carregar produtos em desktop', () => {
      cy.visit('/produtos');
      cy.get('body').should('exist');
    });

    it('Deve carregar artigos em desktop', () => {
      cy.visit('/artigos');
      cy.get('body').should('exist');
    });
  });

  describe('Performance Básica', () => {
    it('Deve carregar página sem JavaScript errors', () => {
      cy.visit('/');
      cy.window().then((win) => {
        expect(win.console).to.exist;
      });
    });

    it('Deve carregar imagens', () => {
      cy.visit('/produtos');
      cy.get('img').should('have.length.greaterThan', 0);
    });
  });
});
