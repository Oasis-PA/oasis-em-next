# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Em Desenvolvimento
- Sistema de autenticação com JWT
- Integração com Google OAuth
- Sistema de perfis de usuários
- CRUD de produtos e tags
- Testes unitários e de integração

## [0.1.0] - 2025-10-08

### Adicionado
- Estrutura inicial do projeto Next.js 15
- Configuração do Prisma ORM com Supabase
- Sistema de validação com Zod
- Páginas principais:
  - Página inicial (tela principal)
  - Skincare (100% responsiva)
  - Cronograma capilar
  - Hair care
  - Infantil
  - Tinturas
  - Tendências
  - Alimentação
  - Cortes
  - Produtos
  - Quizzes
  - Artigos
- Sistema de autenticação:
  - Cadastro de usuários
  - Login/Logout
  - Recuperação de senha
  - Upload de foto de perfil
- API Routes:
  - `/api/usuarios/*` - Gerenciamento de usuários
  - `/api/produtos/*` - Gerenciamento de produtos
  - `/api/tags/*` - Gerenciamento de tags
- Componentes reutilizáveis:
  - Header
  - Footer
  - Modal de senha
  - Avatar
  - Botões
  - Separadores
- Testes:
  - Configuração do Jest
  - Testes de API
  - Testes de integração
- Documentação inicial no README.md

### Dependências Principais
- Next.js 15.5.0
- React 19.1.0
- Prisma 6.17.0
- TypeScript 5.9.2
- Tailwind CSS 4
- Zod 3.25.76
- Jest 30.1.3

---

## Tipos de Mudanças

- `Adicionado` para novas funcionalidades
- `Modificado` para mudanças em funcionalidades existentes
- `Depreciado` para funcionalidades que serão removidas
- `Removido` para funcionalidades removidas
- `Corrigido` para correção de bugs
- `Segurança` para vulnerabilidades corrigidas
