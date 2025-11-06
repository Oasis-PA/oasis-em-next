/**
 * Testes Funcionais - Validações de Entrada
 * Funcionalidade: Validação de formulários e dados de entrada
 * Tipo: Teste Funcional (Interface)
 */

describe('Validações de Entrada', () => {
  describe('Validações de Cadastro de Usuário', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });

    it('Deve validar email obrigatório', () => {
      cy.get('input[name="nome"], input[placeholder*="ome"]').first().type('Teste');
      cy.get('input[type="password"]').type('Senha123!@#');
      cy.get('button[type="submit"]').click();

      cy.contains(/email|obrigatório|necessário/i).should('be.visible');
    });

    it('Deve validar senha obrigatória', () => {
      cy.get('input[name="nome"], input[placeholder*="ome"]').first().type('Teste');
      cy.get('input[type="email"]').type('teste@example.com');
      cy.get('button[type="submit"]').click();

      cy.contains(/senha|obrigatório/i).should('be.visible');
    });

    it('Deve validar formato de email', () => {
      cy.get('input[type="email"]').type('email-invalido');
      cy.get('input[type="password"]').type('Senha123!@#');
      cy.get('button[type="submit"]').click();

      cy.contains(/email inválido|formato/i).should('be.visible');
    });

    it('Deve validar força da senha', () => {
      cy.get('input[type="password"]').type('123');

      cy.contains(/senha fraca|muito fraca|maiúscula|número|caractere especial/i).should('be.visible');
    });

    it('Deve aceitar senha forte', () => {
      cy.get('input[type="password"]').type('Senha123!@#');

      // Verifica se mostra força ou se botão fica habilitado
      cy.get('body').then($body => {
        const hasStrengthText = $body.text().match(/força|ok|forte/i);
        if (!hasStrengthText) {
          cy.get('button[type="submit"]').should('be.enabled');
        }
      });
    });

    it('Deve validar comprimento mínimo da senha', () => {
      cy.get('input[type="password"]').type('Senha12');

      cy.contains(/mínimo|caracteres/i).should('be.visible');
    });

    it('Deve validar comprimento máximo da senha', () => {
      const longPassword = 'A'.repeat(256) + '!@#123';
      cy.get('input[type="password"]').type(longPassword);

      cy.contains(/máximo|caracteres/i).should('be.visible');
    });

    it('Deve validar que email já existe', () => {
      cy.get('input[type="email"]').type('teste@example.com');
      cy.get('input[type="password"]').type('Senha123!@#');
      cy.get('button[type="submit"]').click();

      // Tenta registrar novamente com mesmo email
      cy.get('input[type="email"]').clear().type('teste@example.com');
      cy.get('button[type="submit"]').click();

      cy.contains(/email já existe|cadastrado|já registrado/i).should('be.visible');
    });

    it('Deve validar que nomes são obrigatórios', () => {
      cy.get('input[type="email"]').type('teste@example.com');
      cy.get('input[type="password"]').type('Senha123!@#');
      cy.get('button[type="submit"]').click();

      cy.contains(/nome|obrigatório|necessário/i).should('be.visible');
    });
  });

  describe('Validações de Cadastro de Produtos', () => {
    beforeEach(() => {
      cy.login('admin@oasis.com', 'AdminPassword123!@#');
      cy.visit('/admin/produtos');
      cy.get('button:contains("Novo"), button:contains("Criar")').first().click();
    });

    it('Deve validar nome do produto obrigatório', () => {
      cy.get('input[name="preco"], input[placeholder*="Preço"]').type('29.90');
      cy.get('button[type="submit"]').click();

      cy.contains(/nome|obrigatório/i).should('be.visible');
    });

    it('Deve validar preço obrigatório e válido', () => {
      cy.get('input[name="nome"], input[placeholder*="Nome"]').type('Produto Teste');
      cy.get('input[name="preco"], input[placeholder*="Preço"]').type('abc');
      cy.get('button[type="submit"]').click();

      cy.contains(/preço inválido|número|obrigatório/i).should('be.visible');
    });

    it('Deve validar preço mínimo', () => {
      cy.get('input[name="nome"], input[placeholder*="Nome"]').type('Produto');
      cy.get('input[name="preco"], input[placeholder*="Preço"]').type('-10');
      cy.get('button[type="submit"]').click();

      cy.contains(/preço negativo|mínimo|válido/i).should('be.visible');
    });

    it('Deve validar URL de imagem', () => {
      cy.get('input[name="imageUrl"], input[placeholder*="Imagem"]').type('not-a-url');

      cy.contains(/url inválida|formato/i).should('be.visible');
    });

    it('Deve validar categoria selecionada', () => {
      cy.get('input[name="nome"]').type('Produto');
      cy.get('input[name="preco"]').type('29.90');
      cy.get('button[type="submit"]').click();

      cy.contains(/categoria|obrigatório|selecione/i).should('be.visible');
    });
  });

  describe('Validações de Avaliações', () => {
    beforeEach(() => {
      cy.login('test@example.com', 'Senha123!@#');
      cy.visit('/produtos');
      cy.get('[data-testid="product-card"], .product-card').first().click();
      cy.get('button:contains("Avaliar")').first().click();
    });

    it('Deve validar estrela de classificação obrigatória', () => {
      cy.get('textarea').type('Bom produto');
      cy.get('button[type="submit"]').click();

      cy.contains(/classificação|estrela|obrigatório/i).should('be.visible');
    });

    it('Deve validar comprimento mínimo do comentário', () => {
      cy.get('[data-testid="rating"]').first().click();
      cy.get('textarea').type('Bom');
      cy.get('button[type="submit"]').click();

      cy.contains(/mínimo|caracteres|palavras/i).should('be.visible');
    });

    it('Deve validar comprimento máximo do comentário', () => {
      const longComment = 'A'.repeat(5001);
      cy.get('[data-testid="rating"]').first().click();
      cy.get('textarea').type(longComment);

      cy.contains(/máximo|caracteres|limite/i).should('be.visible');
    });

    it('Deve permitir enviar avaliação válida', () => {
      cy.get('[data-testid="rating"]').first().click();
      cy.get('textarea').type('Este é um ótimo produto, recomendo muito!');
      cy.get('button[type="submit"]').click();

      cy.contains(/obrigado|publicado|sucesso|enviado/i).should('be.visible');
    });
  });

  describe('Validações de Formulário de Contato', () => {
    beforeEach(() => {
      cy.visit('/contato');
    });

    it('Deve validar nome obrigatório', () => {
      cy.get('input[type="email"]').type('teste@example.com');
      cy.get('textarea[name="mensagem"]').type('Mensagem teste');
      cy.get('button[type="submit"]').click();

      cy.contains(/nome|obrigatório/i).should('be.visible');
    });

    it('Deve validar email obrigatório', () => {
      cy.get('input[name="nome"]').type('Teste');
      cy.get('textarea[name="mensagem"]').type('Mensagem');
      cy.get('button[type="submit"]').click();

      cy.contains(/email|obrigatório/i).should('be.visible');
    });

    it('Deve validar mensagem obrigatória', () => {
      cy.get('input[name="nome"]').type('Teste');
      cy.get('input[type="email"]').type('teste@example.com');
      cy.get('button[type="submit"]').click();

      cy.contains(/mensagem|obrigatório/i).should('be.visible');
    });

    it('Deve enviar mensagem de contato válida', () => {
      cy.get('input[name="nome"]').type('Teste');
      cy.get('input[type="email"]').type('teste@example.com');
      cy.get('textarea[name="mensagem"]').type('Mensagem de teste para o suporte');
      cy.get('button[type="submit"]').click();

      cy.contains(/obrigado|enviado|sucesso|em breve/i).should('be.visible');
    });
  });

  describe('Validações de Edição de Perfil', () => {
    beforeEach(() => {
      cy.login('test@example.com', 'Senha123!@#');
      cy.visit('/perfil');
      cy.get('button:contains("Editar")').click();
    });

    it('Deve validar nome não vazio', () => {
      cy.get('input[name="nome"]').clear();
      cy.get('button[type="submit"]').click();

      cy.contains(/nome|obrigatório/i).should('be.visible');
    });

    it('Deve validar comprimento de nome', () => {
      cy.get('input[name="nome"]').clear().type('A');
      cy.get('button[type="submit"]').click();

      cy.contains(/mínimo|caracteres/i).should('be.visible');
    });

    it('Deve validar telefone válido', () => {
      cy.get('input[name="telefone"]').type('123');
      cy.get('button[type="submit"]').click();

      cy.contains(/telefone inválido|formato/i).should('be.visible');
    });

    it('Deve salvar alterações válidas de perfil', () => {
      cy.get('input[name="nome"]').clear().type('Novo Nome');
      cy.get('button[type="submit"]').click();

      cy.contains(/salvo|atualizado|sucesso/i).should('be.visible');
    });
  });
});
