# Guia de Testes de Integração - Sistema Oasis

## 📋 Visão Geral

Os testes de integração do sistema Oasis validam operações completas com **banco de dados real**, incluindo:

- ✅ **Transações de banco de dados**
- ✅ **Constraints de unicidade** (emails duplicados, slugs duplicados)
- ✅ **Relacionamentos entre tabelas** (One-to-Many, Many-to-Many)
- ✅ **Operações CASCADE** (deleção em cascata)
- ✅ **Integridade referencial** (foreign keys)

---

## 🚀 Execução Rápida

```bash
# 1. Configurar banco de dados de teste (primeira vez)
npm run test:integration:setup

# 2. Executar todos os testes de integração
npm run test:integration

# 3. Executar testes específicos
npm run test:integration -- usuarios.integration.test.ts
npm run test:integration -- produtos.integration.test.ts
npm run test:integration -- artigos.integration.test.ts
npm run test:integration -- relacionamentos.integration.test.ts
```

---

## 🗂️ Estrutura dos Testes

```
tests/integration/
├── setup.ts                           # Configuração global (beforeAll, afterAll)
├── usuarios.integration.test.ts       # Testes de usuários (19 testes)
├── produtos.integration.test.ts       # Testes de produtos (18 testes)
├── artigos.integration.test.ts        # Testes de artigos (16 testes)
└── relacionamentos.integration.test.ts # Testes de relacionamentos e cascades (15 testes)

Total: 68 testes de integração
```

---

## 📊 Cobertura de Testes

### 1. Testes de Usuários (19 testes)

#### Criação de Usuário (3 testes)
- ✅ Criar usuário com sucesso
- ✅ Rejeitar email duplicado (constraint único)
- ✅ Criar usuário com todos os campos opcionais

#### Leitura de Usuário (3 testes)
- ✅ Buscar usuário por email
- ✅ Buscar usuário com relacionamentos (gênero, tipo de cabelo)
- ✅ Retornar null ao buscar usuário inexistente

#### Atualização de Usuário (3 testes)
- ✅ Atualizar dados pessoais
- ✅ Alterar senha
- ✅ Rejeitar atualização para email duplicado

#### Deleção de Usuário (2 testes)
- ✅ Deletar usuário
- ✅ Deletar usuário e tokens de reset em cascade

#### Transações de Usuário (2 testes)
- ✅ Fazer rollback de transação ao falhar
- ✅ Criar usuário e perfil em transação atômica

---

### 2. Testes de Produtos (18 testes)

#### Criação de Produto (4 testes)
- ✅ Criar produto com sucesso
- ✅ Criar produto com relacionamentos (categoria, tag, tipo de cabelo)
- ✅ Criar produto com múltiplas imagens
- ✅ Rejeitar criação sem categoria (constraint NOT NULL)

#### Leitura de Produtos (4 testes)
- ✅ Listar produtos com paginação
- ✅ Filtrar produtos por categoria
- ✅ Filtrar produtos por múltiplos critérios
- ✅ Buscar produtos por marca (case insensitive)

#### Atualização de Produto (2 testes)
- ✅ Atualizar dados do produto
- ✅ Atualizar apenas preço (atualização parcial)

#### Deleção de Produto (3 testes)
- ✅ Deletar produto
- ✅ Deletar produto e suas imagens em cascade
- ✅ Deletar produto e seus favoritos em cascade

#### Relacionamentos de Produto (2 testes)
- ✅ Criar produto com avaliações
- ✅ Calcular média de avaliações

---

### 3. Testes de Artigos (16 testes)

#### Criação de Artigo (4 testes)
- ✅ Criar artigo com sucesso
- ✅ Criar artigo com todas as propriedades opcionais
- ✅ Criar artigo com tags (many-to-many)
- ✅ Rejeitar slug duplicado (constraint único)

#### Leitura de Artigos (4 testes)
- ✅ Buscar artigo por slug
- ✅ Filtrar artigos por status
- ✅ Buscar artigos com tags
- ✅ Listar artigos ordenados por data de publicação

#### Atualização de Artigo (3 testes)
- ✅ Atualizar conteúdo do artigo
- ✅ Alterar status de rascunho para publicado
- ✅ Adicionar tags a artigo existente

#### Deleção de Artigo (3 testes)
- ✅ Deletar artigo
- ✅ Deletar artigo e suas tags em cascade
- ✅ Deletar artigo e seus favoritos em cascade

#### Favoritos de Artigos (3 testes)
- ✅ Adicionar artigo aos favoritos
- ✅ Rejeitar duplicação de favorito (constraint único)
- ✅ Listar artigos favoritados por usuário

---

### 4. Testes de Relacionamentos e Cascades (15 testes)

#### Relacionamentos One-to-Many (3 testes)
- ✅ Criar usuário com múltiplos favoritos de produtos
- ✅ Criar produto com múltiplas avaliações
- ✅ Criar produto com múltiplas imagens ordenadas

#### Relacionamentos Many-to-Many (3 testes)
- ✅ Criar artigo com múltiplas tags
- ✅ Buscar artigos por tag (relação inversa)
- ✅ Permitir que uma tag seja usada em múltiplos artigos

#### Operações CASCADE - Deleção (6 testes)
- ✅ Deletar usuário e todos os favoritos em cascade
- ✅ Deletar usuário e todas as avaliações em cascade
- ✅ Deletar produto e todas as imagens em cascade
- ✅ Deletar produto e todas as avaliações em cascade
- ✅ Deletar artigo e todas as tags (ArtigoTag) em cascade
- ✅ Verificar que tags não são deletadas (apenas ArtigoTag)

#### Constraints de Integridade Referencial (4 testes)
- ✅ Rejeitar criação de produto com categoria inexistente
- ✅ Rejeitar criação de usuário com gênero inexistente
- ✅ Rejeitar criação de favorito com usuário inexistente
- ✅ Rejeitar criação de avaliação com produto inexistente

#### Transações Complexas (3 testes)
- ✅ Criar usuário, produto e favorito em transação atômica
- ✅ Fazer rollback completo ao falhar em transação complexa
- ✅ Criar produto com imagens e avaliações em transação

---

## ⚙️ Configuração

### 1. Variáveis de Ambiente

**Arquivo: `.env.test`**

```env
# Banco de dados de teste (schema separado)
DATABASE_URL="postgresql://user:password@host:port/database?schema=test"

# Credenciais de admin para testes
ADMIN_USERNAME=admin_test
ADMIN_PASSWORD=test_password_123

# JWT Secret para testes
JWT_SECRET=test_secret_key_for_integration_tests
```

**⚠️ IMPORTANTE:**
- Use um **schema separado** (ex: `?schema=test`) ou banco de dados dedicado para testes
- Nunca use o banco de dados de produção ou desenvolvimento
- Os testes **limpam todos os dados** antes e depois da execução

---

### 2. Setup do Banco de Dados de Teste

```bash
# Criar estrutura do banco de dados de teste
npm run test:integration:setup

# Este comando executa:
# 1. prisma db push --force-reset (cria/reseta schema)
# 2. Cria dados básicos (gêneros, categorias, tags, etc.)
```

---

## 🔄 Fluxo de Execução dos Testes

### 1. beforeAll (Setup Global)
```typescript
// tests/integration/setup.ts

beforeAll(async () => {
  await prisma.$connect();           // Conectar ao banco
  await limparBancoDeDados();        // Limpar todas as tabelas
  await criarDadosBasicos();         // Criar gêneros, categorias, tags
});
```

### 2. afterEach (Limpeza Entre Testes)
```typescript
afterEach(async () => {
  // Limpar apenas dados de teste, manter dados básicos
  await prisma.favoritoArtigo.deleteMany();
  await prisma.favorito.deleteMany();
  await prisma.avaliacao.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.artigo.deleteMany();
  await prisma.usuario.deleteMany();
  // ... etc
});
```

### 3. afterAll (Teardown Global)
```typescript
afterAll(async () => {
  await limparBancoDeDados();        // Limpar tudo
  await prisma.$disconnect();        // Desconectar do banco
});
```

---

## 📝 Exemplos de Testes

### Exemplo 1: Teste de Constraint Único (Email)

```typescript
it('deve rejeitar criação de usuário com email duplicado', async () => {
  const senhaHash = await bcrypt.hash('SenhaForte123!', 10);

  // Criar primeiro usuário
  await prisma.usuario.create({
    data: {
      nome: 'João Silva',
      email: 'joao@teste.com',
      senha: senhaHash,
      id_genero: 1,
    },
  });

  // Tentar criar segundo usuário com mesmo email
  await expect(
    prisma.usuario.create({
      data: {
        nome: 'Maria Silva',
        email: 'joao@teste.com', // Email duplicado
        senha: senhaHash,
        id_genero: 2,
      },
    })
  ).rejects.toThrow(); // ✅ Deve lançar erro
});
```

---

### Exemplo 2: Teste de CASCADE Delete

```typescript
it('deve deletar produto e suas imagens em cascade', async () => {
  // Criar produto com imagens
  const produto = await prisma.produto.create({
    data: {
      nome: 'Produto com Imagens',
      marca: 'Marca Teste',
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

  // Deletar produto
  await prisma.produto.delete({
    where: { id: produto.id },
  });

  // Verificar que imagens foram deletadas em cascade
  const imagens = await prisma.imagemProduto.findMany({
    where: { id_produto: produto.id },
  });

  expect(imagens.length).toBe(0); // ✅ Imagens deletadas
});
```

---

### Exemplo 3: Teste de Transação com Rollback

```typescript
it('deve fazer rollback de transação ao falhar', async () => {
  try {
    await prisma.$transaction(async (tx) => {
      // Criar usuário (sucesso)
      await tx.usuario.create({
        data: {
          nome: 'João Silva',
          email: 'joao@teste.com',
          senha: 'hash',
          id_genero: 1,
        },
      });

      // Tentar criar com email duplicado (vai falhar)
      await tx.usuario.create({
        data: {
          nome: 'Maria Silva',
          email: 'joao@teste.com', // Duplicado!
          senha: 'hash',
          id_genero: 2,
        },
      });
    });
  } catch (error) {
    // Esperado falhar
  }

  // Verificar que NENHUM usuário foi criado (rollback)
  const usuarios = await prisma.usuario.findMany({
    where: { email: 'joao@teste.com' },
  });

  expect(usuarios.length).toBe(0); // ✅ Rollback funcionou
});
```

---

### Exemplo 4: Teste de Relacionamento Many-to-Many

```typescript
it('deve criar artigo com múltiplas tags', async () => {
  const artigo = await prisma.artigo.create({
    data: {
      titulo: 'Guia de Hidratação',
      slug: 'guia-hidratacao',
      conteudo: 'Conteúdo...',
      status: 'publicado',
      tags: {
        create: [
          { id_tag: 1 }, // Hidratação
          { id_tag: 2 }, // Nutrição
          { id_tag: 4 }, // Vegano
        ],
      },
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  expect(artigo.tags.length).toBe(3); // ✅ 3 tags associadas
  expect(artigo.tags[0].tag.nome).toBe('Hidratação');
});
```

---

## 🐛 Troubleshooting

### Erro: "Database connection failed"

```bash
# Verifique a conexão com o banco de teste
dotenv -e .env.test -- npx prisma db pull

# Se falhar, verifique as credenciais no .env.test
```

---

### Erro: "Table does not exist"

```bash
# Recriar schema do banco de teste
npm run test:integration:setup
```

---

### Erro: "Unique constraint violation"

```bash
# Limpar banco de dados manualmente
dotenv -e .env.test -- npx prisma db push --force-reset

# Ou rodar setup novamente
npm run test:integration:setup
```

---

### Testes Lentos

Os testes de integração são naturalmente mais lentos que testes unitários devido às operações de banco de dados.

**Otimizações:**
- ✅ Usar `--runInBand` (já configurado) para execução sequencial
- ✅ Limpar apenas dados necessários entre testes
- ✅ Usar transações quando possível

**Tempo esperado:**
- Testes unitários: ~2-5 segundos (145 testes)
- Testes de integração: ~30-60 segundos (68 testes)

---

## 📈 Próximos Passos

### Testes Adicionais Planejados

1. **Testes de Performance de Queries**
   - Medir tempo de queries complexas
   - Validar índices do banco de dados

2. **Testes de Concorrência**
   - Múltiplos usuários acessando simultaneamente
   - Race conditions

3. **Testes de Migração de Dados**
   - Validar migrações do Prisma
   - Testar rollback de migrações

4. **Testes de Backup e Restore**
   - Validar integridade após backup
   - Testar restore de dados

---

## 📚 Referências

- [Documentação do Prisma - Testing](https://www.prisma.io/docs/guides/testing)
- [Jest Best Practices](https://jestjs.io/docs/getting-started)
- [Database Testing Patterns](https://martinfowler.com/articles/practical-test-pyramid.html)

---

**Desenvolvido com ❤️ pela equipe Oasis**
