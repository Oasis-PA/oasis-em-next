# 🧪 Guia de Testes

## Rodar Todos os Testes
```bash
npm run test:all
```

Executa testes de integração (Jest).

---

## Rodar Testes de Integração
```bash
npm run test:integration
```

Testa os fluxos principais do sistema contra o banco de dados.

**Testes inclusos:**
- ✅ Artigos (CRUD)
- ✅ Favoritos (criar, deletar, buscar)
- ✅ Produtos (listagem, filtros)

---

## Rodar Testes E2E (Cypress)
```bash
npm run cypress:open
```

Interface visual do Cypress para rodar testes no navegador.

**Ou rodar headless:**
```bash
npm run cypress:run
```

---

## Testes Funcionais
```bash
npm run test:functional
```

Testes de funcionalidades específicas.

---

## Estrutura de Testes

```
tests/
├── integration/           # Testes de integração com banco
│   ├── artigos.integration.test.ts
│   ├── favoritos.integration.test.ts
│   └── produtos.integration.test.ts
└── cypress/              # Testes E2E
    └── e2e/
```

---

## Limpeza e Seed de Testes

```bash
# Limpar banco de dados de teste
npm run test:db:clean

# Adicionar dados de teste
npm run test:seed
```

---

## ⚠️ Importante

1. **Banco de teste separado** - Não afeta o banco de dados principal
2. **Setup automático** - Testes criam/deletam dados conforme necessário
3. **Rápido** - A maioria dos testes roda em menos de 5 segundos
