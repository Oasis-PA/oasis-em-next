# 🚀 Como Testar o Cypress Agora

## ✅ Configuração Completa

Tudo já está configurado! Agora você tem 3 formas de rodar:

---

## 🎯 Forma 1: AUTOMÁTICA (Mais Fácil)

### Abrir Interface do Cypress
```bash
npm run test:functional:open
```

**O que acontece:**
1. ✨ Inicia Next.js na porta 3001 automaticamente
2. ⏳ Aguarda servidor estar pronto
3. 🎬 Abre interface do Cypress
4. 🛑 Quando você fechar o Cypress, o servidor é encerrado

### Rodar Testes em Headless
```bash
npm run test:functional
```

**O que acontece:**
- Executa todos os testes sem interface
- Gera screenshots de falhas
- Ideal para CI/CD

---

## 🎯 Forma 2: MANUAL (Mais Rápido para Dev)

### Passo 1: Abrir um terminal e rodar
```bash
npm run dev:test
```

**Saída esperada:**
```
   ▲ Next.js 15.5.0
   - Local:        http://localhost:3001
   - Experiments:  turbopack

 ✓ Ready in 2.3s
```

### Passo 2: Abrir OUTRO terminal e rodar
```bash
npm run cypress:open
```

**Vantagens:**
- ⚡ Mais rápido (servidor não reinicia)
- 🔥 Hot reload funciona
- 📊 Vê logs do Next.js em tempo real

---

## 🎯 Forma 3: PORTA CUSTOMIZADA

Se a porta 3001 estiver ocupada:

```bash
# Terminal 1
PORT=4000 npm run dev

# Terminal 2
CYPRESS_BASE_URL=http://localhost:4000 npm run cypress:open
```

---

## 📝 Estrutura dos Seus Testes

```
cypress/
└── e2e/
    └── 01-auth.cy.ts  # ← Este é o teste de autenticação
```

### Verificar o Teste
```bash
cat cypress/e2e/01-auth.cy.ts
```

---

## 🧪 Testando Agora Mesmo

### Teste Rápido

**1. Rodar teste específico:**
```bash
npm run test:functional:open
```

**2. Na interface que abrir:**
- Clique em "E2E Testing"
- Escolha um browser (Chrome recomendado)
- Clique no arquivo `01-auth.cy.ts`
- Veja os testes executarem!

---

## 🐛 Possíveis Erros e Soluções

### ❌ Erro: "Port 3001 already in use"

**Verificar o que está usando a porta:**
```bash
netstat -ano | findstr :3001
```

**Solução 1 - Matar processo:**
```bash
# Anote o PID da última coluna
taskkill /PID <número_do_pid> /F
```

**Solução 2 - Usar outra porta:**
```bash
PORT=3002 npm run dev:test
# Em outro terminal
CYPRESS_BASE_URL=http://localhost:3002 npm run cypress:open
```

### ❌ Erro: "Cannot find module 'start-server-and-test'"

**Solução:**
```bash
npm install
```

### ❌ Erro: Cypress não abre

**Solução:**
```bash
# Limpar cache do Cypress
npx cypress cache clear
npx cypress install
```

---

## 📊 Verificar se Está Funcionando

### 1. Verificar porta livre
```bash
netstat -ano | findstr :3001
# Se não retornar nada = porta livre ✅
```

### 2. Iniciar servidor de teste
```bash
npm run dev:test
```

### 3. Em outro terminal, testar manualmente
```bash
curl http://localhost:3001
# Deve retornar HTML da página ✅
```

### 4. Rodar Cypress
```bash
npm run cypress:open
```

---

## 🎬 Exemplo Completo: Passo a Passo

```bash
# 1. Abrir terminal
cd C:\Users\023.919373\Documents\GitHub\oasis-em-next

# 2. Verificar se porta 3001 está livre
netstat -ano | findstr :3001

# 3. Rodar Cypress (modo automático)
npm run test:functional:open

# 4. Aguardar... (vai iniciar o Next.js e abrir o Cypress)

# 5. Na interface do Cypress:
#    - Clicar em "E2E Testing"
#    - Escolher "Chrome"
#    - Clicar em "01-auth.cy.ts"
#    - Ver os testes rodarem! 🎉
```

---

## 📈 Scripts Disponíveis

```bash
# Desenvolvimento normal (porta dinâmica)
npm run dev

# Desenvolvimento para testes (porta 3001 fixa)
npm run dev:test

# Cypress com servidor automático
npm run test:functional              # Headless
npm run test:functional:open         # Com interface
npm run test:functional:chrome       # No Chrome específico
npm run test:functional:headless     # Explicitamente headless

# Cypress manual (precisa do servidor rodando)
npm run cypress:open                 # Abrir interface
npm run cypress:run                  # Rodar headless

# Todos os testes (Jest + Cypress)
npm run test:all
```

---

## ✅ Checklist Final

Antes de rodar os testes:

- [ ] `node_modules` instalados (`npm install`)
- [ ] Porta 3001 livre (ou outra escolhida)
- [ ] Arquivo `.env` configurado
- [ ] Banco de dados acessível

Depois de rodar:

- [ ] Testes passaram? ✅
- [ ] Screenshots gerados? (em `cypress/screenshots`)
- [ ] Vídeos gerados? (em `cypress/videos`)

---

## 🎓 Próximos Passos

1. **Criar mais testes:**
   ```bash
   # Copiar template
   cp cypress/e2e/01-auth.cy.ts cypress/e2e/02-meu-teste.cy.ts
   ```

2. **Adicionar comandos customizados:**
   - Editar `cypress/support/commands.ts`

3. **Configurar CI/CD:**
   - Usar `npm run test:functional` no GitHub Actions

---

**🚀 Pronto para testar!**

Execute agora:
```bash
npm run test:functional:open
```
