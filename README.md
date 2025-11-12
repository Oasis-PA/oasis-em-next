# 🌐 Oasis - Plataforma de Bem-Estar

[![Licença: MIT](https://img.shields.io/badge/Licença-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blueviolet.svg?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

Oasis é uma plataforma web completa de bem-estar e beleza, desenvolvida como um Trabalho de Conclusão de Curso (TCC). O projeto utiliza tecnologias modernas para oferecer uma experiência de utilizador robusta e uma arquitetura de backend escalável.

---

## Tabela de Conteúdos

1.  [Tecnologias Principais](#-tecnologias-principais)
2.  [Configuração do Ambiente](#️-configuração-do-ambiente)
3.  [Fluxo de Trabalho do Banco de Dados](#-fluxo-de-trabalho-do-banco-de-dados)
4.  [Validação de Dados com Zod](#-validação-de-dados-com-zod)
5.  [Executando o Projeto](#-executando-o-projeto)
6.  [Estrutura da API](#-estrutura-da-api)
7.  [Testes](#-testes)
8.  [Deploy](#-deploy)

---

## 🚀 Tecnologias Principais

| Tecnologia | Descrição |
| :--- | :--- |
| **Next.js 14** | Framework React para produção, com renderização no servidor e geração estática. |
| **React** | Biblioteca para construção de interfaces de utilizador. |
| **TypeScript** | Superset de JavaScript que adiciona tipagem estática. |
| **Prisma** | ORM de última geração para Node.js e TypeScript. |
| **Supabase** | Backend como serviço, utilizando um banco de dados PostgreSQL. |
| **Zod** | Biblioteca para validação de esquemas com foco em TypeScript. |
| **Tailwind CSS** | Framework de CSS utility-first para estilização rápida. |
| **Jest** | Framework para testes de JavaScript. |

---

## ⚙️ Configuração do Ambiente

Siga estes passos para configurar o seu ambiente de desenvolvimento local.

### 1. Clone o Repositório
```bash
git clone [https://github.com/seu-usuario/oasis-em-next.git](https://github.com/seu-usuario/oasis-em-next.git)
cd oasis-em-next
2. Instale as Dependências
Bash

npm install
3. Configure as Variáveis de Ambiente
O projeto utiliza dois ficheiros .env para gerir as conexões com o banco de dados.

A) Crie o ficheiro .env.local (Para a Aplicação)

Bash

# / .env.local
# Usado para rodar a aplicação (npm run dev)
DATABASE_URL="postgresql://postgres.yyvjzgxyxgalnnwcjfqh:[SUA-SENHA]@[aws-1-sa-east-1.pooler.supabase.com:6543/postgres](https://aws-1-sa-east-1.pooler.supabase.com:6543/postgres)"

# Suas outras chaves...
JWT_SECRET="gere-um-segredo-forte"
NEXT_PUBLIC_SUPABASE_URL="[https://yyvjzgxyxgalnnwcjfqh.supabase.co](https://yyvjzgxyxgalnnwcjfqh.supabase.co)"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anon-do-supabase"
B) Crie o ficheiro .env (Para Comandos do Prisma)

Bash

# / .env
# Usado para comandos do Prisma (ex: npm run prisma:migrate)
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.yyvjzgxyxgalnnwcjfqh.supabase.co:5432/postgres"
Por que dois ficheiros? O Supabase exige o uso de um Connection Pooler para a aplicação, mas os comandos de gestão do Prisma (migrate, db pull, etc.) precisam de uma conexão direta ao banco. Os nossos scripts no package.json gerem qual ficheiro usar automaticamente.

🗄️ Fluxo de Trabalho do Banco de Dados
Após configurar as variáveis de ambiente, utilize os scripts do package.json para interagir com o banco de dados.

Nota: Estes scripts são atalhos convenientes que usam dotenv-cli para carregar as variáveis de ambiente corretas (do ficheiro .env) antes de executar o comando npx prisma correspondente. Recomenda-se usar estes scripts em vez de rodar npx diretamente.

1. Sincronize o esquema local com o banco de dados remoto:

Bash

npm run prisma:pull
2. Gere o cliente Prisma e os esquemas Zod:

Bash

npm run prisma:generate
3. Execute as migrações (se houver novas):

Bash

npm run prisma:migrate
🚀 Validação de Dados com Zod
Este projeto utiliza o prisma-zod-generator para garantir que as validações de dados estejam sempre sincronizadas com o schema.prisma.

O Fluxo de Trabalho
Modifique o schema.prisma: Qualquer alteração na estrutura do banco é feita aqui.

Gere os Esquemas Zod: Após modificar o schema.prisma, rode o comando npm run prisma:generate.

Use os Esquemas na API: Importe os esquemas gerados de src/lib/zod-schemas/ para validar os dados nas suas rotas.

Exemplo de Uso:

TypeScript

// Em: src/app/api/produtos/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ZodError } from 'zod';
import { productSchema } from '@/lib/zod-schemas/product';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = productSchema.parse(body);
    const novoProduto = await prisma.produto.create({ data: validatedData });
    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    // ...
  }
}
▶️ Executando o Projeto
Bash

npm run dev
Abra http://localhost:3000 no seu navegador.

🛠️ Estrutura da API
A API segue um padrão RESTful e está localizada em src/app/api/.

Endpoints Principais
Autenticação

POST /api/usuarios/cadastro: Registar um novo utilizador.

POST /api/usuarios/login: Autenticar um utilizador.

POST /api/usuarios/logout: Invalidar a sessão.

Utilizadores

GET /api/usuarios/perfil: Obter dados do utilizador autenticado.

PATCH /api/usuarios/perfil: Atualizar dados do utilizador.

Produtos

GET /api/produtos: Listar produtos.

POST /api/produtos: Criar um novo produto.

Tags

GET /api/tags: Listar tags.

POST /api/tags: Criar uma nova tag.

🧪 Testes
O projeto possui uma suíte completa de **~177 testes** cobrindo 6 níveis:

```bash
# Executar todos os testes
npm test

# Testes unitários e validações (50 testes)
npm run test:validations
npm run test:api

# Testes de integração (68 testes)
npm run test:integration

# Testes avançados (59 testes)
npm run test:performance    # Performance de queries
npm run test:concurrency    # Concorrência e race conditions
npm run test:migration      # Migrações e integridade
npm run test:backup         # Backup e restore
npm run test:advanced       # Todos os avançados

# Outros
npm run test:watch          # Modo watch
npm run test:coverage       # Cobertura de código
```

📖 **Para documentação completa de testes, consulte:** [`tests/README.md`](./tests/README.md)

---

## 🎨 Isolamento de CSS e Arquitetura de Estilos

O projeto implementa uma **estratégia de isolamento de CSS** para evitar conflitos entre páginas ao navegar pela aplicação.

### Problema Resolvido
Em aplicações Next.js, imports de CSS são globais por padrão. Isso causava conflitos quando:
- Navegando entre páginas diferentes
- Usando o botão "voltar" do navegador
- Estilos de uma página "vazavam" para outras

### Solução Implementada
Cada página/grupo de páginas possui um **wrapper CSS único**:

| Wrapper | Páginas Afetadas | Arquivo CSS |
|---------|------------------|-------------|
| `.page-produtos-wrapper` | `/produtos` | `produtos.css` |
| `.page-login-cadastro-wrapper` | `/login`, `/cadastro`, `/cadastro2` | `tela-de-cadastro.css` |
| `.page-perfil-wrapper` | `/perfil` | `editar-perfil.css` |
| `.page-gerenciamento-wrapper` | `/gerenciamento` | `editar-perfil.css` |

### Exemplo de Implementação

**Antes (CSS global - causava conflitos):**
```css
main * { margin: 0; padding: 0; }
body { display: flex; }
```

**Depois (CSS isolado):**
```css
.page-produtos-wrapper * { margin: 0; padding: 0; }
.page-produtos-wrapper { display: flex; }
```

**Uso no componente:**
```tsx
export default function ProdutosPage() {
  return (
    <div className="page-produtos-wrapper">
      {/* Conteúdo da página */}
    </div>
  );
}
```

### Benefícios
- ✅ Navegação entre páginas sem conflitos de estilo
- ✅ Botão "voltar" funciona corretamente
- ✅ Cada página mantém seus estilos isolados
- ✅ Fácil manutenção e debugging

---

## ⚠️ Notas Importantes para Ambiente de Desenvolvimento

### Conexão com Banco de Dados
O projeto utiliza **Supabase** hospedado externamente. Em ambientes com **firewall restritivo** (como redes corporativas ou SENAI), a conexão pode falhar:

```
Can't reach database server at `db.yyvjzgxyxgalnnwcjfqh.supabase.co:5432`
```

**Soluções:**
1. **Rede doméstica/aberta**: Funciona normalmente
2. **Hotspot móvel**: Conexão alternativa recomendada
3. **VPN corporativa**: Pode resolver bloqueios de firewall
4. **Banco local (desenvolvimento)**: Configurar PostgreSQL local

### Interface Funcional Sem Banco
Mesmo sem conexão com o banco, você pode:
- ✅ Navegar por todas as páginas
- ✅ Visualizar o design e layout responsivo
- ✅ Testar navegação e CSS isolado
- ✅ Ver componentes React funcionando
- ❌ Login/cadastro (requer banco)
- ❌ Listagem de produtos (requer banco)
- ❌ Salvar dados (requer banco)

### Testes Cypress
Os testes E2E falharão **sem conexão com banco**, mas isso é esperado. A suíte completa funciona em ambiente com conectividade adequada.

---

## 🏛️ Arquitetura e Documentação Técnica
Para uma análise aprofundada da arquitetura do projeto, das decisões técnicas e dos fluxos de trabalho detalhados, consulte a nossa documentação completa na pasta docs/.

01 - Visão Geral da Arquitetura

02 - Banco de Dados (Prisma & Supabase)

03 - Validação de Dados (Zod)

04 - API e Autenticação (Next.js & JWT)

05 - Frontend (React & Tailwind)

06 - Testes (Jest)

07 - Deploy