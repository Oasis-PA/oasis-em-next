# 🚀 GUIA RÁPIDO - EXECUTAR TESTES

## ⚡ 30 Segundos para Começar

### 1. Abrir Terminal
```bash
cd c:\Users\stefano\Documents\GitHub\oasis-em-next
```

### 2. Instalar Dependências (se necessário)
```bash
npm install
```

### 3. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```
O servidor estará em: `http://localhost:3000`

### 4. Em Outro Terminal, Executar Testes

#### Opção A: Testes Backend (Rápido)
```bash
npm test
```

#### Opção B: Testes Funcionais (Interface Gráfica)
```bash
npm run test:functional:open
```

#### Opção C: Testes Funcionais (Modo Automático)
```bash
npm run test:functional
```

#### Opção D: TODOS OS TESTES
```bash
npm run test:all
```

---

## 📊 Tipos de Teste e Comandos

| Tipo | Comando | Tempo | Uso |
|---|---|---|---|
| **Unitários** | `npm test` | 30s | Validações rápidas |
| **API** | `npm run test:api` | 1m | Testes de endpoints |
| **Integração** | `npm run test:integration` | 2m | Fluxos completos |
| **Performance** | `npm run test:performance` | 1m | Benchmarks |
| **Funcional** | `npm run test:functional` | 3m | Interface |
| **Funcional (UI)** | `npm run test:functional:open` | ∞ | Interativo |
| **Todos** | `npm run test:all` | 5m | Completo |

---

## 🎮 Usar Cypress Interativamente

### 1. Abrir Cypress
```bash
npm run test:functional:open
```

### 2. Na Interface
- Escolha um arquivo de teste (ex: `01-auth.cy.ts`)
- Clique em "Run all specs" ou selecione um teste
- Acompanhe cada ação em tempo real
- Use DevTools para depurar

### 3. Atalhos Úteis
- `R` - Reexecutar teste
- `S` - Parar execução
- `Ctrl + Shift + I` - Abrir DevTools

---

## 📋 Arquivos de Teste

```
tests/
├── api/                          # Testes de API (22 testes)
│   ├── usuarios-*.test.ts       # Testes de usuários
│   ├── produtos.test.ts         # Testes de produtos
│   └── ...
├── validations/                 # Testes de validação (40 testes)
│   ├── usuario.test.ts
│   └── produto.test.ts
├── integration/                 # Testes de integração (68 testes)
│   ├── usuarios.integration.test.ts
│   └── produtos.integration.test.ts
├── performance/                 # Testes de performance (12 testes)
└── ...

cypress/
├── e2e/                         # Testes funcionais (115 testes)
│   ├── 01-auth.cy.ts           # Login/Signup
│   ├── 02-produtos.cy.ts       # Catálogo
│   ├── 03-favoritos.cy.ts      # Favoritos
│   ├── 04-artigos.cy.ts        # Artigos
│   ├── 05-responsividade.cy.ts # Responsive
│   └── 06-validacoes.cy.ts     # Validações
└── support/                     # Comandos customizados
```

---

## ✅ Resultado Esperado

### Testes Passando
```
✓ 282 testes passaram
✗ 0 testes falharam
⏱ Tempo: ~5 minutos
```

---

## 🐛 Troubleshooting Rápido

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Matar processo
npx kill-port 3000

# Ou usar outra porta
npm run dev -- -p 3001
```

### Erro: "Connection refused"
```bash
# Verificar se servidor está rodando
npm run dev
```

### Cypress não abre
```bash
# Limpar cache do Cypress
rm -rf node_modules/.cache

# Reinstalar
npm install cypress --save-dev
```

---

## 📸 Ver Screenshots dos Testes

Quando um teste falha, Cypress salva screenshots em:
```
cypress/screenshots/
```

---

## 📝 Executar Teste Específico

### Por Nome
```bash
npm run test:specific "login"
```

### Por Arquivo
```bash
npm run test:functional -- --spec "cypress/e2e/01-auth.cy.ts"
```

---

## 🎯 Checklist Para Apresentação

- [ ] `npm run dev` rodando
- [ ] `npm run test:functional:open` funcionando
- [ ] Mostrar testes passando
- [ ] Mostrar cobertura: `npm run test:coverage`
- [ ] Contar total de testes: `npm test -- --listTests | wc -l`

---

## 📊 Gerar Relatório de Cobertura

```bash
npm run test:coverage
```

Resultado estará em:
```
coverage/
├── lcov-report/
│   └── index.html     # Abrir no navegador
└── coverage-summary.json
```

---

## 🚦 Status dos Testes

```bash
# Ver todos os testes
npm test -- --listTests

# Ver quais falharam
npm test -- --bail

# Watch mode (reexecuta ao salvar)
npm run test:watch
```

---

## 💡 Pro Tips

### 1. Executar apenas novos testes
```bash
npm test -- --onlyChanged
```

### 2. Executar com mais detalhes
```bash
npm test -- --verbose
```

### 3. Debugar um teste
```bash
# Adicione isto no seu teste:
debugger;

# Execute:
node --inspect-brk node_modules/.bin/jest tests/seu-teste.test.ts
```

### 4. Mock de dados
```bash
# Ver dados de teste
cat cypress/fixtures/
```

---

## 📞 Documentação Completa

Para informações detalhadas:
- [TESTE_FUNCIONAL_README.md](./TESTE_FUNCIONAL_README.md) - Testes E2E
- [RESUMO_TESTES_COMPLETO.md](./RESUMO_TESTES_COMPLETO.md) - Visão geral

---

**Última Atualização**: 04/11/2025
**Versão**: 1.0.0
**Status**: ✅ Pronto para usar
