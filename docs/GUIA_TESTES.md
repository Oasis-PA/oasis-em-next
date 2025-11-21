# 🧪 Guia Completo de Testes - Oasis

## Visão Geral

O projeto Oasis usa 3 tipos de testes com responsabilidades bem definidas:

| Tipo | Ferramenta | Responsabilidade | Comando |
|------|-----------|------------------|---------|
| **Unit** | Jest | Lógica complexa sem banco | `npm test` |
| **Integration** | Jest + Prisma | API + Banco de dados | `npm run test:integration` |
| **E2E** | Cypress | User journeys reais | `npm run test:e2e` |

---

## 1. Jest - Unit Tests (`npm test`)

### O que testar:
✅ Lógica de negócio complexa
✅ Funções utilitárias
✅ Cálculos e transformações
✅ Erros esperados

### O que NÃO testar:
❌ Validações Zod (Zod já testa automaticamente)
❌ Integração com banco (use integration tests)
❌ Interface do usuário (use Cypress)

### Exemplo ✅ CORRETO:

```typescript
// tests/unit/discount.test.ts
describe('calculateDiscount', () => {
  it('deve calcular desconto de 10% corretamente', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
  });

  it('deve lançar erro se percentual > 100', () => {
    expect(() => calculateDiscount(100, 150)).toThrow();
  });
});
```

### Exemplo ❌ EVITAR:

```typescript
// NÃO faça isso - é redundante com Zod
describe('emailSchema', () => {
  it('deve rejeitar email inválido', () => {
    expect(() => z.string().email().parse('invalido')).toThrow();
  });
});
```

### Executar:
```bash
npm test                 # Rodar todos os testes unit
npm test:watch          # Modo watch
npm test:coverage       # Com cobertura
```

---

## 2. Jest - Integration Tests (`npm run test:integration`)

### O que testar:
✅ API endpoints (POST, GET, PUT, DELETE)
✅ Interação com banco de dados
✅ Relacionamentos entre tabelas
✅ Constraints do banco (NOT NULL, UNIQUE, CASCADE)
✅ Paginação e filtros

### O que NÃO testar:
❌ Validações Zod (já cobertas por unit tests)
❌ Formatação de resposta HTTP (use Cypress)
❌ UI/Interface (use Cypress)

### Estrutura de Testes:

```
tests/integration/
├── setup.ts                          # Configuração Prisma
├── usuarios-auth.integration.test.ts # Autenticação
├── produtos.integration.test.ts      # Produtos
├── favoritos.integration.test.ts     # Favoritos
└── artigos.integration.test.ts       # Artigos
```

### Exemplo ✅ CORRETO:

```typescript
// tests/integration/usuarios-auth.integration.test.ts
describe('[INTEGRATION] Autenticação', () => {
  it('deve criar usuário com senha criptografada', async () => {
    const usuario = await prisma.usuario.create({
      data: {
        nome: 'João',
        email: 'joao@test.com',
        senha: await bcrypt.hash('123456', 10),
        id_genero: 1,
      },
    });

    expect(usuario.id_usuario).toBeDefined();
    expect(usuario.senha).not.toBe('123456'); // confirmando hash
  });

  it('deve deletar usuário e seus favoritos em cascade', async () => {
    // Criar usuário
    const usuario = await prisma.usuario.create({...});

    // Adicionar favorito
    const favorito = await prisma.favorito.create({
      data: { id_usuario: usuario.id_usuario, id_produto: 1 }
    });

    // Deletar usuário
    await prisma.usuario.delete({
      where: { id_usuario: usuario.id_usuario }
    });

    // Verificar que favorito também foi deletado (CASCADE)
    const favoriteRestante = await prisma.favorito.findUnique({
      where: { id_favorito: favorito.id_favorito }
    });
    expect(favoriteRestante).toBeNull();
  });
});
```

### Executar:
```bash
npm run test:integration      # Rodar todos os integration tests
npm run test:integration -- --testNamePattern="Autenticação" # Filtrar por padrão
```

---

## 3. Cypress - E2E Tests (`npm run test:e2e`)

### O que testar:
✅ User journeys completos (login → ação → resultado)
✅ Navegação entre páginas
✅ Interação com UI (cliques, inputs, etc)
✅ Validações visuais
✅ Responsividade

### O que NÃO testar:
❌ Lógica de negócio (use unit tests)
❌ Validações Zod (já cobertas por Zod e unit tests)
❌ Banco de dados diretamente (use integration tests)

### Estrutura:

```
cypress/
└── e2e/
    ├── 01-auth.cy.ts           # Login, logout, signup
    ├── 02-produtos.cy.ts       # Listar, filtrar, comprar
    ├── 03-favoritos.cy.ts      # Adicionar/remover favoritos
    ├── 04-artigos.cy.ts        # Listar, ler artigos
    └── 05-responsividade.cy.ts # Mobile, tablet, desktop
```

### Exemplo ✅ CORRETO:

```typescript
// cypress/e2e/01-auth.cy.ts
describe('User Login Flow', () => {
  it('user pode fazer login e acessar dashboard', () => {
    cy.visit('/');
    cy.get('[data-test=email]').type('user@test.com');
    cy.get('[data-test=password]').type('password123');
    cy.get('[data-test=submit]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-test=user-name]').should('contain', 'Meu Perfil');
  });
});
```

### Executar:
```bash
npm run test:e2e          # Rodar testes headless
npm run test:e2e:open    # Abrir Cypress interativo
```

---

## 4. Scripts de Teste (Simplificados)

Reduzimos de **15 para 7 scripts** principais:

### Desenvolvimento:
```bash
npm test              # Unit tests
npm test:watch       # Unit tests com auto-reload
npm test:coverage    # Cobertura de testes
```

### Integração:
```bash
npm run test:integration    # Integration tests (API + DB)
```

### E2E:
```bash
npm run test:e2e           # Cypress headless
npm run test:e2e:open      # Cypress interativo
```

### Tudo:
```bash
npm run test:all    # Unit + Integration + E2E
```

### Banco (apenas para setup):
```bash
npm run test:db:reset    # Resetar banco de teste
npm run test:db:push     # Sincronizar schema
npm run test:seed        # Popular com dados de teste
```

---

## 5. Separação de Responsabilidades

### ✅ Jest Unit Tests
**Responsável por:**
- Lógica pura (sem dependências externas)
- Funções utilitárias
- Validações de entrada
- Tratamento de erros

**NÃO é responsável por:**
- Interação com banco de dados
- HTTP/APIs
- Interface de usuário

### ✅ Jest Integration Tests
**Responsável por:**
- Testar APIs (POST, GET, PUT, DELETE)
- Interação com banco de dados via Prisma
- Relacionamentos de dados
- Constraints do banco (NOT NULL, UNIQUE, CASCADE)
- Paginação e filtros

**NÃO é responsável por:**
- Validações Zod (isso é feito pelo Zod ou unit tests)
- Formatação de resposta HTTP
- UI

### ✅ Cypress E2E
**Responsável por:**
- Testar fluxos de usuário completos
- Navegação entre páginas
- Interação com elementos HTML
- Validações visuais
- Responsividade

**NÃO é responsável por:**
- Testes de validação (isso é Zod)
- Lógica de negócio (isso é Jest)
- Banco de dados diretamente

---

## 6. Zod - Schema Validation

### ✅ Zod valida automaticamente:
```typescript
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter 6+ caracteres'),
});

// Zod automaticamente testa:
loginSchema.parse({ email: 'invalido', senha: '123' }); // Lança erro
```

### Não é necessário testar isso com Jest:
```typescript
// ❌ EVITAR - Zod já faz isso
it('deve rejeitar email inválido', () => {
  expect(() => loginSchema.parse({ email: 'invalido', senha: '123' })).toThrow();
});
```

---

## 7. Fluxo de CI/CD Recomendado

```bash
# 1. Unit tests (rápido, sem dependências externas)
npm test

# 2. Linting (verificar código)
npm run lint

# 3. Build (garantir que compila)
npm run build

# 4. Integration tests (requer banco de teste)
npm run test:integration

# 5. E2E tests (requer servidor rodando)
npm run test:e2e
```

---

## 8. Exemplo Prático: Testando "Favoritar Produto"

### 1️⃣ Unit Test (Jest)
```typescript
// tests/unit/favoritos.test.ts
describe('isFavoritoValido', () => {
  it('deve validar se usuário_id e produto_id são números', () => {
    expect(isFavoritoValido({ usuario_id: 1, produto_id: 1 })).toBe(true);
    expect(isFavoritoValido({ usuario_id: 'abc', produto_id: 1 })).toBe(false);
  });
});
```

### 2️⃣ Integration Test (Jest + Prisma)
```typescript
// tests/integration/favoritos.integration.test.ts
describe('[INTEGRATION] Favoritos', () => {
  it('deve adicionar produto aos favoritos no banco', async () => {
    const favorito = await prisma.favorito.create({
      data: { id_usuario: 1, id_produto: 5 }
    });
    expect(favorito.id_favorito).toBeDefined();
  });

  it('deve deletar favorito ao remover produto (CASCADE)', async () => {
    // Produto é deletado → favorito também é deletado
  });
});
```

### 3️⃣ E2E Test (Cypress)
```typescript
// cypress/e2e/03-favoritos.cy.ts
describe('Favoritar Produto', () => {
  it('user pode adicionar produto aos favoritos', () => {
    cy.visit('/produtos');
    cy.get('[data-test=produto-1]').click();
    cy.get('[data-test=heart-btn]').click();
    cy.get('[data-test=favorited-badge]').should('be.visible');
  });
});
```

---

## 9. Como Executar Testes Localmente

### Setup inicial:
```bash
npm install                    # Instalar dependências
npm run test:db:reset         # Resetar banco de teste
npm run test:db:push          # Sincronizar schema
npm run test:seed             # Popular dados iniciais
```

### Rodar testes:
```bash
# Desenvolvimento (com watch)
npm test:watch

# Completo (unit + integration)
npm run test:all

# Apenas integração
npm run test:integration

# Apenas E2E
npm run test:e2e:open  # Interativo
npm run test:e2e       # Headless
```

---

## 10. Troubleshooting

### ❓ "Testes de integração falham com 'prisma not connected'"
✅ Solução: Executar `npm run test:db:reset` antes

### ❓ "Cypress não acha os elementos"
✅ Solução: Adicionar `data-test` attributes aos elementos HTML

### ❓ "Jest reclama de 'Cannot find module'"
✅ Solução: Verificar `moduleNameMapper` no `jest.config.cjs`

### ❓ "Testes flaky (falham aleatoriamente)"
✅ Solução: Aumentar timeouts no `jest.config.cjs` ou `cypress.config.ts`

---

## 📚 Resumo

| Teste | Quando | Tool | Tempo | Custo |
|-------|--------|------|-------|-------|
| **Unit** | A cada commit | Jest | Rápido | Baixo |
| **Integration** | Antes de PR | Jest + Prisma | Médio | Médio |
| **E2E** | Antes de deploy | Cypress | Lento | Alto |

**Recomendação:** Rodar `npm run test:all` antes de fazer commit/push para garantir tudo funcionando!

