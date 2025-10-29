# 🧪 Guia Rápido - Executar Testes do Sistema Oasis

## 📊 Visão Geral dos Testes

O sistema Oasis possui **213 testes automatizados** com **100% de aprovação**:

```
┌─────────────────────────────────────────────────────┐
│  📊 TESTES DO SISTEMA OASIS                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ✅ Testes Unitários/API:       145 testes (~15s)  │
│     - Validação de dados        41 testes          │
│     - Endpoints de API          104 testes         │
│                                                     │
│  ✅ Testes de Integração:       68 testes (~45s)   │
│     - Usuários (DB Real)        19 testes          │
│     - Produtos (DB Real)        18 testes          │
│     - Artigos (DB Real)         16 testes          │
│     - Relacionamentos/Cascades  15 testes          │
│                                                     │
│  📈 TOTAL:                      213 testes (~60s)  │
│  🎯 Taxa de Aprovação:          100%               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Comandos Rápidos

### 1️⃣ Executar TODOS os Testes (Recomendado)

```bash
# Executar todos os testes unitários + integração
npm test && npm run test:integration
```

**Resultado esperado:** 213 testes aprovados em ~60 segundos

---

### 2️⃣ Executar Apenas Testes Unitários/API

```bash
# Executar testes rápidos (validação + API)
npm test
```

**Resultado esperado:** 145 testes aprovados em ~15 segundos

---

### 3️⃣ Executar Apenas Testes de Integração

```bash
# Primeira vez: configurar banco de dados de teste
npm run test:integration:setup

# Executar testes de integração
npm run test:integration
```

**Resultado esperado:** 68 testes aprovados em ~45 segundos

---

## 📁 Tipos de Testes Disponíveis

### Testes Unitários e de Validação

```bash
# Testes de validação (schemas Zod)
npm run test:validations

# Testes de API (endpoints)
npm run test:api

# Teste específico
npm run test:specific -- usuario.test.ts
```

### Testes de Integração (Banco de Dados Real)

```bash
# Todos os testes de integração
npm run test:integration

# Testes específicos de integração
npm run test:integration -- usuarios.integration.test.ts
npm run test:integration -- produtos.integration.test.ts
npm run test:integration -- artigos.integration.test.ts
npm run test:integration -- relacionamentos.integration.test.ts
```

### Outros Comandos Úteis

```bash
# Modo watch (reexecutar ao salvar arquivos)
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage

# Resetar banco de dados de teste
npm run test:db:reset
```

---

## 📋 Estrutura dos Testes

```
tests/
├── 📂 validations/              (41 testes)
│   ├── usuario.test.ts          Validação de usuários
│   └── produto.test.ts          Validação de produtos
│
├── 📂 api/                      (104 testes)
│   ├── usuarios-*.test.ts       APIs de usuários
│   ├── produtos-*.test.ts       APIs de produtos
│   ├── admin-*.test.ts          APIs de admin
│   └── favoritos-*.test.ts      APIs de favoritos
│
└── 📂 integration/              (68 testes) ⭐
    ├── usuarios.integration.test.ts        (19 testes)
    ├── produtos.integration.test.ts        (18 testes)
    ├── artigos.integration.test.ts         (16 testes)
    └── relacionamentos.integration.test.ts (15 tests)
```

---

## ✅ O Que é Testado?

### Testes Unitários/API (145 testes)
- ✅ Validação de schemas Zod
- ✅ Regras de negócio (senhas fortes, emails válidos)
- ✅ Endpoints de API (request/response)
- ✅ Autenticação e autorização
- ✅ Formatação de dados

### Testes de Integração (68 testes)
- ✅ **Transações de banco de dados** (commit/rollback)
- ✅ **Constraints de unicidade** (email duplicado, slug duplicado)
- ✅ **Relacionamentos** (One-to-Many, Many-to-Many)
- ✅ **Operações CASCADE** (deleção em cascata)
- ✅ **Integridade referencial** (foreign keys)

---

## 🎯 Exemplos de Testes

### Exemplo 1: Teste de Validação

```typescript
it('deve rejeitar senha sem caractere especial', () => {
  const dados = {
    senha: 'SenhaForte123',
    confirmaSenha: 'SenhaForte123',
  };

  expect(() => cadastroEtapa2Schema.parse(dados))
    .toThrow('Senha deve conter ao menos um caractere especial');
});
// ✅ PASS
```

### Exemplo 2: Teste de Integração (Constraint Único)

```typescript
it('deve rejeitar criação de usuário com email duplicado', async () => {
  await prisma.usuario.create({
    data: { nome: 'João', email: 'joao@teste.com', senha: 'hash', id_genero: 1 }
  });

  await expect(
    prisma.usuario.create({
      data: { nome: 'Maria', email: 'joao@teste.com', senha: 'hash', id_genero: 2 }
    })
  ).rejects.toThrow(); // ❌ Erro de constraint único
});
// ✅ PASS
```

### Exemplo 3: Teste de CASCADE Delete

```typescript
it('deve deletar produto e suas imagens em cascade', async () => {
  const produto = await prisma.produto.create({
    data: {
      nome: 'Produto',
      marca: 'Marca',
      preco: 30.00,
      id_categoria: 1,
      imagens: {
        create: [
          { url: 'https://exemplo.com/img1.jpg', ordem: 1 },
          { url: 'https://exemplo.com/img2.jpg', ordem: 2 },
        ],
      },
    },
  });

  await prisma.produto.delete({ where: { id: produto.id } });

  const imagens = await prisma.imagemProduto.findMany({
    where: { id_produto: produto.id },
  });

  expect(imagens.length).toBe(0); // ✅ Imagens deletadas em cascade
});
// ✅ PASS
```

---

## 🐛 Troubleshooting

### Problema: Testes de integração falhando

```bash
# Solução: Reconfigurar banco de dados de teste
npm run test:integration:setup
```

### Problema: "Database connection failed"

```bash
# Solução: Verificar variáveis de ambiente
cat .env.test

# Recriar conexão
npm run test:db:reset
```

### Problema: Testes lentos

**Esperado:**
- Testes unitários: ~15 segundos
- Testes de integração: ~45 segundos (operações reais de banco de dados)

Se estiver mais lento, verifique:
- Conexão com o banco de dados
- Recursos do sistema (memória, CPU)

---

## 📚 Documentação Completa

- 📄 **Relatório Completo de Testes:** [PLANO_RELATORIO_TESTES.md](PLANO_RELATORIO_TESTES.md)
- 📄 **Guia de Testes de Integração:** [README_TESTES_INTEGRACAO.md](README_TESTES_INTEGRACAO.md)

---

## 🎉 Resultados Esperados

### Testes Unitários/API
```bash
> npm test

Test Suites: 21 passed, 21 total
Tests:       145 passed, 145 total
Snapshots:   0 total
Time:        ~15s

✅ 100% de aprovação
```

### Testes de Integração
```bash
> npm run test:integration

🔧 Configurando ambiente de testes de integração...
✅ Conectado ao banco de dados de teste
✅ Banco de dados limpo
✅ Dados básicos criados

Test Suites: 4 passed, 4 total
Tests:       68 passed, 68 total
Time:        ~45s

✅ 100% de aprovação
```

---

**Sistema Oasis - Testes Automatizados**
**Desenvolvido com ❤️ pela equipe Oasis**
