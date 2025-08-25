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
