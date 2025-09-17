# 🌐 Oasis

Este é um projeto desenvolvido com [Next.js](https://nextjs.org), inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) – ORM para banco de dados
- [Supabase](https://supabase.com/) – Backend como serviço (PostgreSQL)
- [PostCSS](https://postcss.org/) – processamento de estilos
- [ESLint](https://eslint.org/) – padronização de código
- [Jest](https://jestjs.io/) – framework de testes

---

## 📂 Estrutura de Pastas

```
src/
 ├── app/          # Páginas e rotas do Next.js (App Router)
 │   ├── api/      # Rotas da API
 │   │   ├── todos/         # Endpoints para todos
 │   │   └── usuarios/      # Endpoints para usuários
 │   ├── alimentacao/       # Páginas da seção alimentação
 ├── components/   # Componentes reutilizáveis
 ├── script/       # Scripts utilitários
 ├── styles/       # Estilos globais e módulos CSS
prisma/
 └── schema.prisma # Configuração do banco de dados Prisma
public/
 ├── assets/       # Arquivos estáticos (imagens, ícones, etc.)
 └── *.svg
tests/
 ├── api/          # Testes das rotas da API
 ├── integration/  # Testes de integração
 └── setup.ts      # Configuração dos testes
```

---

## ⚙️ Configuração do Ambiente

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase
DATABASE_URL="postgresql://user:password@host:port/database"
DIRECT_URL="postgresql://user:password@host:port/database"

# Supabase URLs (opcional para autenticação)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### 2. Instalação das Dependências

```bash
npm install
```

### 3. Configuração do Banco de Dados

```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Visualizar o banco (opcional)
npx prisma studio
```

---

## ▶️ Executando o Projeto

Primeiro, certifique-se de que as dependências estão instaladas e o banco está configurado:

```bash
npm install
npx prisma generate
npx prisma migrate dev
```

Depois, rode o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

---

## 🗄️ Banco de Dados (Supabase)

### Comandos Prisma Úteis

```bash
# Gerar cliente após mudanças no schema
npx prisma generate

# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações em produção
npx prisma migrate deploy

# Resetar banco de dados (cuidado!)
npx prisma migrate reset

# Abrir interface visual do banco
npx prisma studio

# Fazer seed do banco (se configurado)
npx prisma db seed
```

### Conexão com Supabase

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em **Settings** → **Database**
3. Copie a **Connection String** para o `DATABASE_URL`
4. Use a mesma URL para `DIRECT_URL` (necessário para migrações)

---

## 🛠️ API Routes

### Estrutura das APIs

```
src/app/api/
├── todos/
│   ├── route.ts          # GET/POST /api/todos
│   └── [id]/
│       └── route.ts      # GET/PUT/DELETE /api/todos/[id]
└── usuarios/
    ├── cadastro/
    │   └── route.ts      # POST /api/usuarios/cadastro
    └── check-email/
        └── route.ts      # POST /api/usuarios/check-email
```

### Endpoints Disponíveis

#### **Usuários**
- `POST /api/usuarios/cadastro` - Cadastrar novo usuário
- `POST /api/usuarios/check-email` - Verificar se email existe

#### **Todos**
- `GET /api/todos` - Listar todos
- `POST /api/todos` - Criar novo todo
- `GET /api/todos/[id]` - Buscar todo específico
- `PUT /api/todos/[id]` - Atualizar todo
- `DELETE /api/todos/[id]` - Deletar todo

### Testando APIs Manualmente

#### 1. Usando curl

```bash
# Cadastrar usuário
curl -X POST http://localhost:3000/api/usuarios/cadastro \
  -H "Content-Type: application/json" \
  -d '{"nome": "João", "email": "joao@email.com", "senha": "123456"}'

# Verificar email
curl -X POST http://localhost:3000/api/usuarios/check-email \
  -H "Content-Type: application/json" \
  -d '{"email": "joao@email.com"}'

# Listar todos
curl http://localhost:3000/api/todos

# Criar todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Minha tarefa", "concluido": false}'
```

#### 2. Usando Postman/Insomnia

1. Importe a collection de APIs (se disponível)
2. Configure a base URL: `http://localhost:3000`
3. Teste cada endpoint com os dados apropriados

---

## 🧪 Testes

### Estrutura de Testes

```
tests/
├── setup.ts                          # Configuração global dos testes
├── api/                             # Testes das rotas da API
│   ├── usuarios-cadastro.test.ts     # Testa POST /api/usuarios/cadastro
│   ├── usuarios-check-email.test.ts  # Testa POST /api/usuarios/check-email
│   └── todos.test.ts                 # Testa rotas de todos
└── integration/                     # Testes de integração
    └── usuario-flow.test.ts         # Testa fluxo completo de usuário
```

### Comandos de Teste

```bash
# Instalar dependências de teste (se ainda não instalou)
npm install --save-dev jest @types/jest ts-jest @jest/globals @testing-library/jest-dom node-mocks-http dotenv-cli

# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage

# Executar apenas testes de API
npm run test:api

# Executar apenas testes de integração
npm run test:integration

# Executar teste específico
npm run test:specific usuarios-cadastro.test.ts
```

### Configuração do Banco para Testes

1. Crie um banco de dados separado para testes no Supabase
2. Configure a variável `DATABASE_URL_TEST` no `.env.test`
3. Execute migrações no banco de teste:

```bash
# Usando arquivo de ambiente específico
npx dotenv -e .env.test -- npx prisma migrate dev
```

### Exemplo de Teste de API

```typescript
// tests/api/usuarios-cadastro.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/usuarios/cadastro/route';

describe('/api/usuarios/cadastro', () => {
  it('deve cadastrar um usuário com sucesso', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        nome: 'João',
        email: 'joao@teste.com',
        senha: '123456'
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const data = JSON.parse(res._getData());
    expect(data.email).toBe('joao@teste.com');
  });
});
```

---

## 📌 Rotas do Projeto

### Páginas Principais

- `/` → Página inicial
- `/alimentacao` → Seção de alimentação
- `/about` → Página sobre (se existir)

### Rotas da API

- `/api/usuarios/*` → Endpoints relacionados a usuários
- `/api/todos/*` → Endpoints relacionados a tarefas

---

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor de desenvolvimento
npm run build            # Build para produção
npm run start            # Iniciar servidor de produção
npm run lint             # Executar ESLint

# Banco de dados
npm run db:generate      # Gerar cliente Prisma
npm run db:migrate       # Executar migrações
npm run db:studio        # Abrir Prisma Studio
npm run db:seed          # Executar seed (se configurado)

# Testes
npm run test             # Executar todos os testes
npm run test:watch       # Testes em modo watch
npm run test:coverage    # Testes com coverage
npm run test:api         # Apenas testes de API
npm run test:integration # Apenas testes de integração
```

---

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Erro de conexão com banco
```bash
# Verifique se as variáveis de ambiente estão corretas
# Execute as migrações novamente
npx prisma migrate dev
```

#### 2. Erro no Prisma Client
```bash
# Regenerar o cliente
npx prisma generate
```

#### 3. Testes falhando
```bash
# Certifique-se de que o banco de teste está configurado
# Execute migrações no banco de teste
npx dotenv -e .env.test -- npx prisma migrate dev
```

#### 4. Porta 3000 já em uso
```bash
# Use uma porta diferente
npm run dev -- -p 3001
```

---

## 📚 Documentação Extra

- [Documentação do Next.js](https://nextjs.org/docs)
- [Tutorial Interativo de Next.js](https://nextjs.org/learn)
- [Prisma Docs](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

---

## ☁️ Deploy

### Vercel (Recomendado)

1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente de produção
3. O deploy será automático a cada push

### Configurações de Deploy

```bash
# Build command
npm run build

# Output directory
.next

# Install command
npm install
```

Para mais detalhes, veja: [Deploying Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Guidelines de Desenvolvimento

- Siga os padrões do ESLint
- Adicione testes para novas funcionalidades
- Use TypeScript para tipagem
- Mantenha o código limpo e bem documentado
- Execute os testes antes de fazer commit

---

## 📝 License

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.