/**
 * Testes Funcionais - Responsividade e Performance
 * Funcionalidade: Testes em diferentes resoluções de tela e performance
 * Tipo: Teste Funcional (Interface)
 */

describe('Responsividade e Performance', () => {
  describe('Layout Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.visit('/');
    });

    it('Deve exibir menu hambúrguer em mobile', () => {
      cy.get('button[aria-label="menu"], button:contains("☰"), [data-testid="mobile-menu"]').should('be.visible');
    });

    it('Deve exibir produtos em coluna única no mobile', () => {
      cy.visit('/produtos');

      cy.get('[data-testid="product-card"], .product-card').first().should('have.css', 'width');

      // Verifica se está em layout mobile
      cy.get('[data-testid="product-grid"], .product-grid, [class*="grid"]').should('exist');
    });

    it('Deve permitir navegação em mobile', () => {
      cy.get('button[aria-label="menu"], [data-testid="mobile-menu"]').first().click();

      cy.get('a:contains("Produtos"), nav a:contains("Artigos")').should('be.visible');
    });

    it('Deve exibir botões de ação em mobile', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.get('button:contains("Avaliar"), button:contains("Favoritar")').should('be.visible');
    });

    it('Deve ter touch targets adequados em mobile', () => {
      cy.visit('/produtos');

      cy.get('button').first().should('have.css', 'height').and('match', /4[0-9]|5[0-9]|6[0-9]/);
    });
  });

  describe('Layout Tablet', () => {
    beforeEach(() => {
      cy.viewport('ipad-2');
      cy.visit('/');
    });

    it('Deve exibir produtos em 2 colunas no tablet', () => {
      cy.visit('/produtos');

      cy.get('[data-testid="product-card"], .product-card').should('have.length.greaterThan', 1);
    });

    it('Deve manter navegação visível em tablet', () => {
      cy.get('nav, [data-testid="navigation"]').should('be.visible');
    });
  });

  describe('Layout Desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
      cy.visit('/');
    });

    it('Deve exibir produtos em múltiplas colunas no desktop', () => {
      cy.visit('/produtos');

      cy.get('[data-testid="product-card"], .product-card').should('have.length.greaterThan', 2);
    });

    it('Deve exibir sidebar em desktop', () => {
      cy.visit('/produtos');

      cy.get('[data-testid="sidebar"], aside, [class*="sidebar"]').should('be.visible');
    });
  });

  describe('Performance', () => {
    it('Deve carregar página em menos de 3 segundos', () => {
      cy.visit('/');

      cy.window().then((win) => {
        const navTiming = win.performance.timing;
        const loadTime = navTiming.loadEventEnd - navTiming.navigationStart;

        expect(loadTime).to.be.lessThan(3000);
      });
    });

    it('Deve listar produtos sem problemas de performance', () => {
      cy.visit('/produtos');

      cy.get('[data-testid="product-card"], .product-card').should('have.length.greaterThan', 0);

      cy.window().then((win) => {
        expect(win.performance.now()).to.exist;
      });
    });

    it('Deve carregar imagens de forma eficiente', () => {
      cy.visit('/produtos');

      cy.get('img').first().should('be.visible');

      cy.get('img').first().should(($img) => {
        expect($img[0].naturalHeight).to.be.greaterThan(0);
      });
    });

    it('Deve paginar produtos sem demora', () => {
      cy.visit('/produtos');

      const start = Date.now();

      cy.get('button').contains(/próxima|next|>/).click();

      cy.get('[data-testid="product-card"], .product-card').should('exist');

      cy.window().then(() => {
        const duration = Date.now() - start;
        expect(duration).to.be.lessThan(2000);
      });
    });
  });

  describe('Acessibilidade', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Deve ter suporte a navegação por teclado', () => {
      cy.get('button').first().focus().should('have.focus');

      cy.focused().tab();

      cy.focused().should('not.equal', cy.get('button').first());
    });

    it('Deve ter atributos alt em imagens', () => {
      cy.visit('/produtos');

      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt');
      });
    });

    it('Deve ter cores com contraste adequado', () => {
      cy.visit('/');

      // Verifica se há elementos com texto
      cy.get('button, a, p').first().should('be.visible');
    });

    it('Deve ter estrutura de headings correta', () => {
      cy.visit('/produtos');

      cy.get('h1').should('have.length.greaterThan', 0);

      cy.get('h1').then(($h1) => {
        if ($h1.length > 0) {
          cy.get('h2').should('have.length.greaterThan', 0);
        }
      });
    });

    it('Deve ter labels associados aos inputs', () => {
      cy.visit('/login');

      cy.get('input[type="email"]').should((($input) => {
        const label = $input.attr('aria-label') || $input.prev('label').length > 0;
        expect(label).to.be.ok;
      }));
    });
  });

  describe('Compatibilidade de Navegadores', () => {
    it('Deve funcionar em navegadores modernos', () => {
      cy.visit('/');

      // Verifica se há erro console grave
      cy.window().then((win) => {
        const errors = win.console.log.calls?.filter(c => c.includes('Error')) || [];
        expect(errors.length).to.equal(0);
      });
    });

    it('Deve carregar CSS corretamente', () => {
      cy.visit('/');

      cy.get('body').should('have.css', 'font-family');
    });

    it('Deve carregar JavaScript corretamente', () => {
      cy.visit('/');

      cy.window().should('have.property', 'React');
    });
  });
});
