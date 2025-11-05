# 🧪 Guia de Testes E2E com Cypress

## 📋 Pré-requisitos

Antes de executar os testes Cypress, você precisa:

### 1. Criar Usuário de Teste no Banco de Dados

Os testes E2E usam um usuário fixo para garantir consistência. Você precisa criar este usuário **uma vez** no banco de dados.

**Credenciais do usuário de teste:**
- **Email**: `cypress@test.com`
- **Senha**: `Senha123!@#`
- **Nome**: `Cypress Test User`

### Opção A: Criar via Interface (Recomendado)

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev:test
   ```

2. Acesse http://localhost:3001/cadastro

3. Complete o processo de cadastro em duas etapas:
   - **Etapa 1** (`/cadastro`):
     - Nome: `Cypress Test User`
     - Email: `cypress@test.com`

   - **Etapa 2** (`/cadastro2`):
     - Senha: `Senha123!@#`
     - Confirmar Senha: `Senha123!@#`
     - Selecione gênero: `Masculino` ou `Feminino` (id_genero: 1 ou 2)
     - Complete outros campos obrigatórios

4. Pronto! O usuário está criado.

### Opção B: Criar via Seed Script (Se o Banco Estiver Acessível)

```bash
npm run test:seed
```

**Nota**: Este comando só funciona se você tem acesso direto ao banco de dados (Supabase deve estar acessível).

---

## 🚀 Executar Testes

### 1. Modo Interativo (Interface Gráfica)

```bash
# Inicia servidor automaticamente e abre Cypress
npm run test:functional:open
```

**Vantagens:**
- Ver os testes rodando em tempo real
- Debug visual
- Seletor de testes individual

### 2. Modo Headless (Linha de Comando)

```bash
# Executa todos os testes sem interface
npm run test:functional
```

**Vantagens:**
- Mais rápido
- Ideal para CI/CD
- Gera screenshots de falhas

### 3. Outros Comandos

```bash
# Modo headless explícito
npm run test:functional:headless

# Executar no Chrome
npm run test:functional:chrome

# Abrir Cypress manualmente (servidor deve estar rodando)
npm run cypress:open

# Executar teste específico
npm run cypress:run -- --spec "cypress/e2e/01-auth.cy.ts"
```

---

## 📂 Estrutura dos Testes

```
cypress/
├── e2e/                          # Testes E2E
│   ├── 01-auth.cy.ts            # Autenticação (login/logout)
│   ├── 02-produtos.cy.ts        # Funcionalidades de produtos
│   ├── 03-favoritos.cy.ts       # Sistema de favoritos
│   ├── 04-artigos.cy.ts         # Artigos do blog
│   └── 06-validacoes.cy.ts      # Validações de formulários
│
├── support/
│   ├── commands.ts              # Comandos customizados (cy.login, cy.logout)
│   ├── e2e.ts                   # Configuração global
│   └── seed-test-user.ts        # Script para criar usuário de teste
│
└── README.md                     # Este arquivo
```

---

## ⚙️ Configuração

### Porta do Servidor de Testes

Os testes rodam na **porta 3001** para evitar conflitos com o servidor de desenvolvimento normal (porta 3000).

Configuração em [`cypress.config.ts`](../cypress.config.ts):
```typescript
baseUrl: 'http://localhost:3001'
```

Script em [`package.json`](../package.json):
```json
"dev:test": "cross-env PORT=3001 next dev --turbopack"
```

### Timeouts

Os timeouts foram aumentados para acomodar operações mais lentas:

- `requestTimeout`: 30 segundos
- `responseTimeout`: 30 segundos
- `defaultCommandTimeout`: 10 segundos
- `pageLoadTimeout`: 60 segundos

### Content Security Policy (CSP)

O CSP foi ajustado em modo de desenvolvimento para permitir que o Cypress funcione corretamente.

Ver [`next.config.ts`](../next.config.ts) linha 74-83.

---

## 🧪 Comandos Customizados

### `cy.login(email, senha)`

Faz login programático através da interface.

**Uso:**
```typescript
cy.login('cypress@test.com', 'Senha123!@#');
```

**O que faz:**
1. Visita `/login`
2. Preenche email e senha
3. Clica no botão de submit
4. Aguarda resposta da API
5. Verifica redirecionamento (se sucesso) ou lança erro (se falha)

### `cy.logout()`

Faz logout através da interface.

**Uso:**
```typescript
cy.logout();
```

---

## 🐛 Troubleshooting

### Erro: "Timed out retrying after 10000ms: expected 'http://localhost:3001/login' to not include '/login'"

**Causa:** O login falhou e o usuário não foi redirecionado.

**Soluções:**
1. **Verificar se o usuário de teste existe no banco de dados**
   - Execute a Opção A ou B de criação de usuário

2. **Ver logs do servidor de testes**
   - Terminal onde roda `npm run dev:test` mostra erros da API

3. **Verificar resposta da API**
   - O comando `cy.login` agora mostra o status e body da resposta em caso de falha

### Erro: "Can't reach database server"

**Causa:** Banco de dados Supabase não está acessível.

**Soluções:**
1. Verifique sua conexão com a internet
2. Confirme que o Supabase está ativo
3. Use a **Opção A** (criar via interface) ao invés do seed script

### Erro: "cy.visit() failed trying to load: ESOCKETTIMEDOUT"

**Causa:** Servidor de testes não está rodando ou não respondeu a tempo.

**Soluções:**
1. Certifique-se de que o servidor está rodando:
   ```bash
   npm run dev:test
   ```

2. Verifique se a porta 3001 está livre:
   ```bash
   # Windows PowerShell
   netstat -ano | findstr :3001
   ```

3. Use `npm run test:functional:open` que inicia o servidor automaticamente

---

## ✅ Status dos Testes

| Teste | Status | Observações |
|-------|--------|-------------|
| Formulário de login | ✅ PASSA | - |
| Formulário de registro | ✅ PASSA | - |
| Login com credenciais válidas | ⚠️ DEPENDE | Requer usuário de teste no BD |
| Login com credenciais inválidas | ✅ PASSA | - |
| Validações de email/senha | ⚠️ PARCIAL | Validação client-side limitada |
| Fluxo de logout | ⚠️ DEPENDE | Requer login bem-sucedido |
| Perfil de usuário | ⚠️ DEPENDE | Requer login bem-sucedido |

---

## 📝 Notas Importantes

1. **Usuário de Teste Fixo**: Os testes usam `cypress@test.com` como usuário fixo ao invés de criar usuários dinâmicos a cada execução.

2. **Cadastro Multi-etapas**: O processo de cadastro da aplicação tem 2 etapas (`/cadastro` → `/cadastro2`), então o teste de registro está desabilitado (`.skip()`).

3. **Testes Dependentes**: Vários testes dependem de login bem-sucedido, então certifique-se de que o usuário de teste existe antes de rodar a suíte completa.

4. **Rate Limiting**: Se você executar muitos testes de login rapidamente, pode atingir o rate limit (5 tentativas a cada 15 minutos). Aguarde ou limpe o rate limit no banco de dados.

---

## 🔗 Links Úteis

- [Documentação do Cypress](https://docs.cypress.io/)
- [Guia de Boas Práticas do Cypress](https://docs.cypress.io/guides/references/best-practices)
- [Documentação Principal de Testes](../readmes/EXECUTAR_TESTES.md)
- [Status dos Testes Cypress](../CYPRESS_STATUS.md)

---

**Sistema Oasis - Testes E2E**
**Atualizado em: 2025-11-05**
