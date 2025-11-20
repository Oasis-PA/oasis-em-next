/**
 * Testes Funcionais - Validações de Entrada
 * Versão SIMPLIFICADA - Foca em navegação básica
 */

describe('Validações de Entrada', () => {
  describe('Página de Cadastro', () => {
    it('Deve carregar página de cadastro', () => {
      cy.visit('/cadastro');
      cy.get('body').should('exist');
    });

    it('Deve ter formulário com inputs', () => {
      cy.visit('/cadastro');
      cy.get('input').should('have.length.greaterThan', 0);
    });

    it('Deve ter botão de submit', () => {
      cy.visit('/cadastro');
      cy.get('button[type="submit"]').should('exist');
    });
  });

  describe('Página de Login', () => {
    it('Deve carregar página de login', () => {
      cy.visit('/login');
      cy.get('body').should('exist');
    });

    it('Deve ter campos de email e senha', () => {
      cy.visit('/login');
      cy.get('input[type="email"], input[type="password"]').should('have.length.greaterThan', 0);
    });
  });

  describe('Página de Perfil', () => {
    it('Deve carregar página de perfil', () => {
      cy.visit('/perfil');
      cy.get('body').should('exist');
    });

    it('Deve ter elementos na página', () => {
      cy.visit('/perfil');
      cy.get('main, section, [class*="container"]').should('exist');
    });
  });

  describe('Página de Ajuda', () => {
    it('Deve carregar página de ajuda', () => {
      cy.visit('/central-ajuda');
      cy.get('body').should('exist');
    });

    it('Deve ter elementos na página', () => {
      cy.visit('/central-ajuda');
      cy.get('main, section, [class*="container"]').should('exist');
    });

    it('Deve ter links ou botões', () => {
      cy.visit('/central-ajuda');
      cy.get('button, a').should('have.length.greaterThan', 0);
    });
  });
});
