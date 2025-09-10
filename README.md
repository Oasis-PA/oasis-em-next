# 🌐 Oasis

Este é um projeto desenvolvido com [Next.js](https://nextjs.org), inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) – ORM para banco de dados
- [PostCSS](https://postcss.org/) – processamento de estilos
- [ESLint](https://eslint.org/) – padronização de código

---

## 📂 Estrutura de Pastas

```
src/
 ├── app/          # Páginas e rotas do Next.js (App Router)
 ├── components/   # Componentes reutilizáveis
 ├── script/       # Scripts utilitários
 ├── styles/       # Estilos globais e módulos CSS
prisma/
 └── schema.prisma # Configuração do banco de dados Prisma
public/
 ├── assets/       # Arquivos estáticos (imagens, ícones, etc.)
 └── *.svg
```

---

## ▶️ Executando o Projeto

Primeiro, instale as dependências:

```comand prompt
npm install
```

Depois, rode o servidor de desenvolvimento:

```comand prompt
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

---

## 🛠️ Desenvolvimento

- As páginas ficam dentro de `src/app/`
- Componentes reutilizáveis ficam em `src/components/`
- O Prisma é configurado em `prisma/schema.prisma`
- Arquivos públicos ficam em `public/`

---

## 📌 Rotas do Projeto

Aqui estão as principais rotas (atualize conforme for criando novas páginas):

- `/` → Página inicial
- `/about` → Página sobre
- `/api/...` → Rotas de API no Next.js
- (adicione outras rotas conforme necessário)

---

## 📚 Documentação Extra

- [Documentação do Next.js](https://nextjs.org/docs)
- [Tutorial Interativo de Next.js](https://nextjs.org/learn)
- [Prisma Docs](https://www.prisma.io/docs)

---

## ☁️ Deploy

O deploy recomendado é na [Vercel](https://vercel.com), criadores do Next.js.  
Para mais detalhes, veja: [Deploying Next.js](https://nextjs.org/docs/app/building-your-application/deploying).


// Comandos para criar a estrutura específica para suas APIs:

# 1. Criar pastas para seus testes
mkdir -p tests/api
mkdir -p tests/integration

# 2. Criar arquivos de teste específicos
touch tests/api/usuarios-cadastro.test.ts
touch tests/api/usuarios-check-email.test.ts
touch tests/integration/usuario-flow.test.ts

# 3. Instalar dependências se ainda não fez
npm install --save-dev jest @types/jest ts-jest @jest/globals @testing-library/jest-dom node-mocks-http dotenv-cli

# 4. Estrutura final dos seus testes:
tests/
├── setup.ts                           # ✅ Já existe
├── api/                              # 🆕 Nova pasta
│   ├── usuarios-cadastro.test.ts      # Testa POST /api/usuarios/cadastro
│   └── usuarios-check-email.test.ts   # Testa POST /api/usuarios/check-email
└── integration/                      # 🆕 Nova pasta
    └── usuario-flow.test.ts          # Testa fluxo completo

# 5. Comandos para executar:

# Todos os testes
npm run test

# Apenas testes de API
npm run test:api

# Apenas testes de integração
npm run test:integration

# Teste específico
npm run test:specific usuarios-cadastro.test.ts

# Em modo watch
npm run test:watch

# Com coverage
npm run test:coverage


# 1. Instalar dependências (se ainda não instalou)
npm install --save-dev jest @types/jest ts-jest @jest/globals @testing-library/jest-dom node-mocks-http dotenv-cli

# 2. Executar os testes
npm run test

# 3. Se der erro de banco, execute uma migration primeiro:
npx prisma migrate dev

# 4. Tentar novamente
npm run test