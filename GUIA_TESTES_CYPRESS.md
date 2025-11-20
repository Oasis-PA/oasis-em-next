# Guia Completo de Testes Cypress

## ⚠️ Importante: Gestão de Dados de Teste

Os testes do Cypress criam um usuário de teste no banco de dados. **Este usuário deve ser removido após os testes** para não deixar dados lixo no seu banco.

## Como Usar

### 1. **Preparar Dados de Teste**
```bash
npm run test:seed
```
✅ Cria usuário de teste: `cypress@test.com` / `Senha123!@#`

### 2. **Rodar Testes**
```bash
npm run test:functional
```
✅ Executa todos os testes (demora ~2-5 min)

Alternativas:
```bash
npm run test:functional:open       # Abre interface do Cypress
npm run test:functional:headless   # Sem interface gráfica
npm run test:functional:chrome     # Usa navegador Chrome
```

### 3. **Limpar Dados de Teste** (IMPORTANTE!)
```bash
npm run test:seed:clean
```
✅ Remove o usuário de teste do banco de dados

---

## Fluxo Completo (Recomendado)

```bash
# 1. Criar dados de teste
npm run test:seed

# 2. Rodar testes
npm run test:functional

# 3. Limpar dados de teste
npm run test:seed:clean
```

Ou em uma linha:
```bash
npm run test:seed && npm run test:functional && npm run test:seed:clean
```

---

## Estrutura dos Testes

### Arquivo: `cypress/e2e/01-auth.cy.ts`

**Grupos de Testes:**

1. **Página de Login** (4 testes)
   - Exibir formulário
   - Validação de email vazio
   - Validação de senha vazia
   - Validação de email inválido

2. **Página de Registro** (3 testes)
   - Exibir formulário
   - Validação de formulário vazio
   - Validação de email inválido

3. **Fluxo de Login e Logout** (2 testes)
   - Login com credenciais válidas ✅
   - Erro com credenciais inválidas ✅

4. **Perfil do Usuário** (3 testes)
   - Exibir dados do perfil quando logado
   - Editar dados do perfil
   - Fazer logout

**Total: 12 testes**

---

## Dados de Teste

| Campo | Valor |
|-------|-------|
| Email | `cypress@test.com` |
| Senha | `Senha123!@#` |
| Nome | `Cypress Test User` |
| Gênero | ID 1 (padrão) |

---

## Estratégia de Testes

### ✅ O que é Testado

1. **Validação de Formulários**
   - Campos obrigatórios
   - Formato de email
   - CSS pseudo-classe `:invalid`

2. **Requisições de API**
   - Login (POST `/api/usuarios/login`)
   - Status code HTTP (200 vs 401)
   - Interceptação de requisições

3. **Navegação**
   - Redirecionamento após login
   - Acesso a páginas protegidas

### ❌ O que NÃO é Testado

- Texto de erro específico (varia por design)
- Redirecionamento automático (instável)
- UI complexa (componentes dinâmicos)

---

## Resolução de Problemas

### Teste quebra com "Timeout"
```
❌ Timed out retrying after 10000ms
```

**Solução:**
```bash
# Aumentar timeout em cypress.config.ts
defaultCommandTimeout: 15000, // 15 segundos
```

### Cypress não inicia
```
❌ Error: Command failed with exit code 3221225501
```

**Solução:**
```bash
# Usar modo interativo
npm run test:functional:open

# Ou especificar navegador
npm run test:functional:chrome
```

### Usuário de teste não existe
```
❌ Login falhou: 401
```

**Solução:**
```bash
# Recriar usuário de teste
npm run test:seed

# Verificar se foi criado
node -e "const {PrismaClient} = require('@prisma/client'); const p = new PrismaClient(); p.usuario.findUnique({where:{email:'cypress@test.com'}}).then(u=>console.log(u?.email)).finally(()=>p.\$disconnect())"
```

### Dados de teste não foram removidos
```
ℹ️ Usuário de teste já existe
```

**Solução:**
```bash
# Forçar remoção
npm run test:seed:clean

# Verificar se foi removido
npm run test:seed:clean
```

---

## Logs e Debug

### Ver detalhes de teste
```bash
# Rodar teste específico
npx cypress run --spec "cypress/e2e/01-auth.cy.ts" --verbose

# Com screenshot
npx cypress run --spec "cypress/e2e/01-auth.cy.ts" --screenshot
```

### Debugar no navegador
```bash
# Abre Cypress UI interativa
npm run test:functional:open

# Clica em um teste → Abre DevTools → F12
```

---

## Configuração

### Arquivo: `cypress.config.ts`

```typescript
baseUrl: getBaseUrl(), // Detecta porta dinamicamente
defaultCommandTimeout: 10000,
requestTimeout: 10000,
responseTimeout: 10000,
```

### Arquivo: `cypress/support/commands.ts`

Define comandos customizados:
- `cy.login(email, password)` - Faz login
- `cy.logout()` - Faz logout

---

## Checklist Antes de Commitar

- [ ] `npm run test:seed` executou com sucesso?
- [ ] `npm run test:functional` passou? (ou máximo 2 falhas)
- [ ] `npm run test:seed:clean` removeu dados?
- [ ] Nenhum usuário `cypress@test.com` no banco?
- [ ] Testes funcionam na porta 3001?

---

## Próximas Melhorias

- [ ] Adicionar testes de edição de perfil
- [ ] Adicionar testes de upload de foto
- [ ] Adicionar testes de múltiplas pages
- [ ] Implementar CI/CD (GitHub Actions)
- [ ] Coverage report (qual % do código é testado)

---

## Dicas Extras

### Rodar um único teste
```bash
npm run test:functional -- --spec "cypress/e2e/01-auth.cy.ts" --grep "Deve fazer login"
```

### Ver vídeo do teste
```bash
# Salva em cypress/videos/
npm run test:functional

# Ver arquivo: cypress/videos/01-auth.cy.ts.mp4
```

### Rodar em paralelo (múltiplos processos)
```bash
npm run test:functional -- --parallel
```

### Modo headless (sem interface)
```bash
npm run test:functional:headless
```

---

## Suporte

Para problemas com testes, verifique:
1. Se o servidor está rodando na porta 3001
2. Se o banco de dados está acessível
3. Se o arquivo `.env` está configurado
4. Se o usuário de teste foi criado com `npm run test:seed`
