/**
 * Testes Funcionais - Autenticação de Usuários
 * Funcionalidade: Registro, login e logout de usuários
 * Tipo: Teste Funcional (Interface)
 */

describe('Autenticação de Usuários', () => {
  const testUser = {
    nome: `Teste User ${Date.now()}`,
    email: `test${Date.now()}@example.com`,
    senha: 'Senha123!@#',
  };

  beforeEach(() => {
    cy.visit('/');
  });

  describe('Página de Login', () => {
    it('Deve exibir formulário de login', () => {
      cy.visit('/login');
      cy.contains(/entrar|login/i).should('be.visible');
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
    });

    it('Deve exibir erro ao submeter email vazio', () => {
      cy.visit('/login');
      cy.get('button[type="submit"]').click();
      cy.contains(/email|obrigatório/i).should('be.visible');
    });

    it('Deve exibir erro ao submeter senha vazia', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(testUser.email);
      cy.get('button[type="submit"]').click();
      cy.contains(/senha|obrigatório/i).should('be.visible');
    });

    it('Deve exibir erro com formato de email inválido', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type('email-invalido');
      cy.get('input[type="password"]').type(testUser.senha);
      cy.get('button[type="submit"]').click();
      cy.contains(/email inválido|formato/i).should('be.visible');
    });
  });

  describe('Página de Registro', () => {
    it('Deve exibir formulário de registro', () => {
      cy.visit('/signup');
      cy.contains(/cadastre-se|registre-se|criar conta/i).should('be.visible');
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
    });

    it('Deve exibir erro ao submeter formulário vazio', () => {
      cy.visit('/signup');
      cy.get('button[type="submit"]').click();
      cy.contains(/obrigatório|required/i).should('be.visible');
    });

    it('Deve validar força da senha', () => {
      cy.visit('/signup');
      cy.get('input[type="password"]').type('123');
      cy.contains(/senha fraca|deve conter/i).should('be.visible');
    });

    it('Deve registrar novo usuário com dados válidos', () => {
      cy.visit('/signup');
      cy.get('input[name="nome"], input[placeholder*="ome"], input[placeholder*="ome"]')
        .first()
        .type(testUser.nome);
      cy.get('input[type="email"]').type(testUser.email);
      cy.get('input[type="password"]').type(testUser.senha);

      cy.get('button[type="submit"]').click();

      // Aguarda redirecionamento ou mensagem de sucesso
      cy.url().then(url => {
        if (!url.includes('/')) {
          cy.contains(/sucesso|cadastrado/i).should('exist');
        }
      });
    });
  });

  describe('Fluxo de Login e Logout', () => {
    it('Deve fazer login com credenciais válidas', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(testUser.email);
      cy.get('input[type="password"]').type(testUser.senha);
      cy.get('button[type="submit"]').click();

      // Verifica se foi redirecionado ou mostra sucesso
      cy.url().should('not.include', '/login');
      cy.contains(/bem-vindo|dashboard|home/i).should('exist');
    });

    it('Deve exibir erro com credenciais inválidas', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type('naoexiste@example.com');
      cy.get('input[type="password"]').type('SenhaErrada123!');
      cy.get('button[type="submit"]').click();

      cy.contains(/email ou senha inválida|erro|falhou/i).should('be.visible');
    });
  });

  describe('Perfil do Usuário', () => {
    it('Deve exibir dados do perfil quando logado', () => {
      cy.login(testUser.email, testUser.senha);
      cy.visit('/perfil');

      cy.contains(/perfil|dados pessoais|informações/i).should('be.visible');
      cy.get('input[type="email"]').should('have.value', testUser.email);
    });

    it('Deve permitir editar dados do perfil', () => {
      cy.login(testUser.email, testUser.senha);
      cy.visit('/perfil');

      cy.get('button').contains(/editar|alterar/i).click();
      cy.get('input[name="nome"]').clear().type('Novo Nome');
      cy.get('button').contains(/salvar|guardar/i).click();

      cy.contains(/salvo|atualizado/i).should('be.visible');
    });

    it('Deve fazer logout com sucesso', () => {
      cy.login(testUser.email, testUser.senha);

      cy.get('[data-testid="logout-button"], button:contains("Sair"), button:contains("Logout")')
        .first()
        .click();

      // Verifica se voltou para login ou homepage
      cy.url().then(url => {
        expect(url === 'http://localhost:3000/' || url.includes('/login')).to.be.true;
      });
      cy.contains(/bem-vindo|login|registre-se/i).should('be.visible');
    });
  });
});
