# Guia de Uso do Cypress com Porta Dinâmica

## 🎯 Problema Resolvido

O Next.js escolhe portas dinamicamente quando a 3000 está ocupada. Este guia mostra como configurar o Cypress para trabalhar com isso.

---

## 📦 Pacotes Instalados

```bash
npm install --save-dev start-server-and-test
```

**`start-server-and-test`**: Inicia o servidor Next.js, aguarda ele estar pronto, e então executa o Cypress.

---

## ⚙️ Configuração

### 1. Cypress Config (`cypress.config.ts`)

```typescript
export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3001',
    // ...
  },
});
```

**Porta 3001** é usada para testes E2E para evitar conflito com desenvolvimento.

### 2. Scripts do `package.json`

```json
{
  "scripts": {
    // Desenvolvimento normal (porta dinâmica)
    "dev": "next dev --turbopack",

    // Desenvolvimento para testes (porta fixa 3001)
    "dev:test": "cross-env PORT=3001 next dev --turbopack",

    // Cypress isolado (precisa do servidor rodando)
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",

    // Testes E2E completos (inicia servidor + cypress)
    "test:functional": "start-server-and-test dev:test http://localhost:3001 cypress:run",
    "test:functional:open": "start-server-and-test dev:test http://localhost:3001 cypress:open",
    "test:functional:headless": "start-server-and-test dev:test http://localhost:3001 'cypress run --headless'",
    "test:functional:chrome": "start-server-and-test dev:test http://localhost:3001 'cypress run --browser chrome'"
  }
}
```

---

## 🚀 Como Usar

### Opção 1: Tudo Automático (Recomendado)

**Executa testes em modo headless:**
```bash
npm run test:functional
```

**Abre interface do Cypress:**
```bash
npm run test:functional:open
```

**Testa no Chrome:**
```bash
npm run test:functional:chrome
```

✅ **Vantagens:**
- Inicia o servidor automaticamente na porta 3001
- Aguarda o servidor estar pronto
- Executa os testes
- Encerra o servidor ao finalizar

---

### Opção 2: Manual (Mais Controle)

**Terminal 1 - Iniciar servidor de testes:**
```bash
npm run dev:test
```

**Terminal 2 - Rodar Cypress:**
```bash
npm run cypress:open
# ou
npm run cypress:run
```

✅ **Vantagens:**
- Mais rápido se vai rodar testes múltiplas vezes
- Ver logs do Next.js em tempo real
- Hot reload funciona normalmente

---

### Opção 3: Porta Customizada

**Usar porta diferente:**
```bash
# Terminal 1
PORT=4000 npm run dev

# Terminal 2
CYPRESS_BASE_URL=http://localhost:4000 npm run cypress:open
```

---

## 🔍 Como Funciona

### `start-server-and-test`

Sintaxe:
```bash
start-server-and-test <start-script> <url> <test-script>
```

Exemplo:
```bash
start-server-and-test dev:test http://localhost:3001 cypress:run
```

**Fluxo:**
1. ▶️  Executa `npm run dev:test`
2. ⏳ Aguarda `http://localhost:3001` responder
3. ▶️  Executa `npm run cypress:run`
4. 🛑 Encerra o servidor quando os testes terminam

---

## 🎬 Exemplos de Uso

### Teste Rápido de uma Feature
```bash
# Abre Cypress, escolhe um teste específico
npm run test:functional:open
```

### Rodar Todos os Testes (CI/CD)
```bash
# Headless, gera vídeos e screenshots
npm run test:functional
```

### Debug com Chrome DevTools
```bash
npm run test:functional:chrome
```

### Rodar Testes + Testes Unitários
```bash
npm run test:all
```

---

## 🐛 Troubleshooting

### Erro: "Port 3001 already in use"

**Solução 1**: Matar processo na porta
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

**Solução 2**: Usar porta diferente
```bash
PORT=3002 npm run dev:test
# Em outro terminal
CYPRESS_BASE_URL=http://localhost:3002 npm run cypress:open
```

### Erro: "Timed out waiting for http://localhost:3001"

**Causa**: Servidor demora muito para iniciar (build inicial)

**Solução**: Aumentar timeout do `start-server-and-test`

```json
{
  "scripts": {
    "test:functional": "start-server-and-test dev:test http-get://localhost:3001 cypress:run"
  }
}
```

Ou adicionar variável de ambiente:
```bash
START_SERVER_AND_TEST_TIMEOUT=300000 npm run test:functional
```

### Erro: Cypress não encontra elementos

**Causa**: Página não carregou completamente

**Solução**: Adicionar wait no teste
```typescript
cy.visit('/login');
cy.wait(1000); // Aguarda 1 segundo
cy.get('[data-testid="email"]').should('be.visible');
```

---

## 📊 Comparação de Abordagens

| Abordagem | Prós | Contras |
|-----------|------|---------|
| **start-server-and-test** | ✅ Automático<br>✅ Ideal para CI/CD<br>✅ Sem conflitos de porta | ⚠️ Mais lento (reinicia servidor) |
| **Porta Fixa (3001)** | ✅ Rápido<br>✅ Previsível | ⚠️ Pode conflitar se outro app usa 3001 |
| **Manual (2 terminais)** | ✅ Mais rápido para dev<br>✅ Hot reload funciona | ⚠️ Precisa gerenciar 2 processos |

---

## 🎯 Recomendações

### Para Desenvolvimento Local:
```bash
# Terminal 1
npm run dev:test

# Terminal 2
npm run cypress:open
```

### Para CI/CD (GitHub Actions, etc):
```bash
npm run test:functional
```

### Para Debugging:
```bash
npm run test:functional:open
```

---

## 📝 Estrutura de Testes

```
cypress/
├── e2e/
│   ├── 01-auth.cy.ts          # Testes de autenticação
│   ├── 02-produtos.cy.ts       # Testes de produtos
│   └── 03-avaliacoes.cy.ts     # Testes de avaliações
├── fixtures/                   # Dados mock
├── support/
│   ├── commands.ts            # Comandos customizados
│   └── e2e.ts                 # Setup global
└── cypress.config.ts          # Configuração
```

---

## 🔧 Comandos Úteis

```bash
# Verificar se porta está livre
netstat -ano | findstr :3001

# Testar conexão com servidor
curl http://localhost:3001

# Ver logs do Cypress
npx cypress open --browser chrome --config video=true

# Limpar cache do Cypress
npx cypress cache clear
```

---

## 🎓 Próximos Passos

1. ✅ Configurar CI/CD com GitHub Actions
2. ✅ Adicionar testes de API (cy.request)
3. ✅ Implementar Visual Regression Testing
4. ✅ Configurar relatórios (Mochawesome)

---

## 📚 Recursos

- [Cypress Docs](https://docs.cypress.io/)
- [start-server-and-test](https://github.com/bahmutov/start-server-and-test)
- [Next.js + Cypress](https://nextjs.org/docs/testing#cypress)

---

**Autor**: Claude (Anthropic)
**Data**: 2025-11-05
**Versão**: 1.0
