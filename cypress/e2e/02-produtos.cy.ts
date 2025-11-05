/**
 * Testes Funcionais - Catálogo de Produtos
 * Funcionalidade: Listagem, busca e detalhes de produtos
 * Tipo: Teste Funcional (Interface)
 */

describe('Catálogo de Produtos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Página de Listagem de Produtos', () => {
    it('Deve exibir página de produtos', () => {
      cy.visit('/produtos');
      cy.contains(/produtos|catálogo/i).should('be.visible');
    });

    it('Deve exibir lista de produtos', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card, [class*="product"]')
        .should('have.length.greaterThan', 0);
    });

    it('Deve exibir informações básicas dos produtos', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().within(() => {
        cy.get('img').should('exist'); // Imagem
        cy.contains(/[A-Za-z]/i).should('exist'); // Nome
      });
    });

    it('Deve permitir paginação de produtos', () => {
      cy.visit('/produtos');
      cy.get('button').contains(/próxima|next|>/).should('exist');
      cy.get('button').contains(/próxima|next|>/).click();
      cy.url().should('include', 'page');
    });

    it('Deve permitir buscar produtos por nome', () => {
      cy.visit('/produtos');
      cy.get('input[type="text"][placeholder*="buscar"], input[placeholder*="Buscar"], [data-testid="search-input"]')
        .first()
        .type('shampoo');

      cy.get('[data-testid="product-card"], .product-card').should('exist');
    });

    it('Deve permitir filtrar por categoria', () => {
      cy.visit('/produtos');
      cy.get('select[name="categoria"], button:contains("Categoria"), [data-testid="category-filter"]')
        .first()
        .click();

      cy.get('option, [role="option"]').not(':first').first().click();
      cy.get('[data-testid="product-card"], .product-card').should('exist');
    });

    it('Deve permitir filtrar por tipo de cabelo', () => {
      cy.visit('/produtos');
      cy.get('button:contains("Tipo de Cabelo"), [data-testid="hair-type-filter"]').first().click();
      cy.get('[role="option"], .option').first().click();

      cy.get('[data-testid="product-card"], .product-card').should('exist');
    });

    it('Deve permitir filtrar por tipo de pele', () => {
      cy.visit('/produtos');
      cy.get('button:contains("Tipo de Pele"), [data-testid="skin-type-filter"]').first().click();
      cy.get('[role="option"], .option').first().click();

      cy.get('[data-testid="product-card"], .product-card').should('exist');
    });

    it('Deve permitir ordenar produtos por preço', () => {
      cy.visit('/produtos');
      cy.get('select[name="sort"], button:contains("Ordenar"), [data-testid="sort-filter"]')
        .first()
        .click();

      cy.get('option:contains("Preço"), [role="option"]:contains("Preço")').first().click();
      cy.get('[data-testid="product-card"], .product-card').should('exist');
    });
  });

  describe('Página de Detalhes do Produto', () => {
    it('Deve exibir detalhes completos do produto', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.contains(/detalhes|informações|especificações/i).should('exist');
      cy.get('img').should('exist');
      cy.contains(/preço|composição|descrição/i).should('exist');
    });

    it('Deve exibir múltiplas imagens do produto', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.get('img[alt*="produto"], [data-testid="product-image"]').should('have.length.greaterThan', 0);
    });

    it('Deve permitir navegação entre imagens', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.get('button[aria-label*="próxima"], button:contains(">"), [data-testid="next-image"]')
        .should('exist')
        .click();

      cy.get('img[alt*="produto"], [data-testid="product-image"]').should('exist');
    });

    it('Deve exibir preço e informações de compra', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.contains(/r\$|\d+,\d{2}/).should('exist');
      cy.contains(/comprar|ir à loja|ver preço/i).should('exist');
    });

    it('Deve exibir marca do produto', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.contains(/marca|fabricante/i).should('exist');
    });

    it('Deve permitir adicionar produto aos favoritos', () => {
      cy.login('test@example.com', 'Senha123!@#');
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.get('button[data-testid="favorite-button"], button:contains("❤"), button:contains("Favoritar")')
        .first()
        .click();

      cy.contains(/adicionado aos favoritos|removido|coração/i).should('exist');
    });
  });

  describe('Avaliações de Produtos', () => {
    it('Deve exibir avaliações do produto', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.contains(/avaliações|comentários|reviews/i).should('exist');
    });

    it('Deve exibir classificação média do produto', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.contains(/estrelas|★|rating|classificação/i).should('exist');
    });

    it('Deve permitir deixar avaliação logado', () => {
      cy.login('test@example.com', 'Senha123!@#');
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.get('button:contains("Avaliar"), button:contains("Deixar Avaliação")')
        .first()
        .click();

      cy.get('button[aria-label*="estrela"], [data-testid="rating-button"]').should('exist');
    });

    it('Deve permitir escrever comentário na avaliação', () => {
      cy.login('test@example.com', 'Senha123!@#');
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.get('button:contains("Avaliar"), button:contains("Comentar")')
        .first()
        .click();

      cy.get('textarea[placeholder*="comentário"], textarea[placeholder*="Comentário"]')
        .type('Produto excelente, recomendo!');

      cy.get('button:contains("Enviar"), button:contains("Publicar")')
        .first()
        .click();

      cy.contains(/obrigado|publicado|sucesso/i).should('be.visible');
    });

    it('Deve exibir erro ao tentar avaliar sem estar logado', () => {
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();

      cy.get('button:contains("Avaliar")').first().click();

      // Verifica se redirecionou para login ou mostra mensagem
      cy.url().then(url => {
        if (!url.includes('/login')) {
          cy.contains(/faça login|entre/i).should('exist');
        }
      });
    });
  });
});
