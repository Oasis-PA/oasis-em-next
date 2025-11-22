# 📚 Documentação de API - OASIS-EM-NEXT

## 🏗️ Stack Tecnológico

### Frontend
- **Next.js 14** - Framework React com SSR
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS Modules** - Estilo encapsulado

### Backend
- **Next.js API Routes** - Backend serverless
- **Node.js** - Runtime
- **Prisma ORM** - Banco de dados
- **PostgreSQL (Supabase)** - Database

### Autenticação
- **JWT (JSON Web Tokens)** - Token-based auth
- **Bcrypt** - Password hashing
- **jose** - JWT verification

### Ferramentas
- **ESLint** - Code linting
- **Jest** - Testing framework
- **Cypress** - E2E testing
- **Prisma Migrate** - Database migrations

---

## 🔐 Autenticação

### Login de Usuário
```
POST /api/usuarios/login
Content-Type: application/json

{
  "email": "user@example.com",
  "senha": "password123"
}

Response:
{
  "id_usuario": 1,
  "nome": "João Silva",
  "email": "user@example.com"
}

Cookie: auth-token=<JWT>
```

### Login Admin
```
POST /api/admin/auth
Content-Type: application/json

{
  "username": "admin",
  "password": "senha_admin"
}

Response: { token: "jwt_token" }
Cookie: admin-token=<JWT>
```

### Verificação de Autenticação
- Tokens armazenados em **HttpOnly Cookies**
- Válidos por 7 dias
- Renovação automática em cada requisição

---

## 👤 Endpoints de Usuários

### Cadastro
```
POST /api/usuarios/register
{
  "nome": "João",
  "email": "joao@example.com",
  "senha": "123456",
  "genero": "M",
  "dataNascimento": "1990-01-15"
}
```

### Perfil
```
GET /api/usuarios/perfil
Response: { id_usuario, nome, email, genero, dataNascimento, avatar }
```

### Atualizar Perfil
```
PUT /api/usuarios/update
{
  "nome": "João Silva",
  "genero": "M",
  "dataNascimento": "1990-01-15"
}
```

### Credenciais
```
PUT /api/usuarios/credenciais
{
  "senhaAtual": "old_pass",
  "novaSenha": "new_pass"
}
```

### Upload de Foto
```
POST /api/usuarios/upload-foto
Content-Type: multipart/form-data
[binary image data]
```

### Excluir Conta
```
DELETE /api/usuarios/excluir
```

---

## 📰 Endpoints de Artigos

### Listar Artigos
```
GET /api/artigos
Response: [{ id, titulo, slug, resumo, conteudo, status, tags }]
```

### Buscar Artigo
```
GET /api/artigos/[slug]
Response: { id, titulo, slug, conteudo, tags, autor, dataPublicacao }
```

### Admin: Listar Todos
```
GET /api/admin/artigos?status=publicado
Headers: Authorization: Bearer [admin-token]
Response: [{ id, titulo, status, tags, createdAt }]
```

### Admin: Criar Artigo
```
POST /api/admin/artigos
Headers: Authorization: Bearer [admin-token]
{
  "titulo": "Novo Artigo",
  "slug": "novo-artigo",
  "conteudo": "...",
  "resumo": "...",
  "status": "publicado",
  "tagIds": [1, 2, 3]
}
```

### Admin: Editar Artigo
```
PUT /api/admin/artigos/[id]
{
  "titulo": "Título Atualizado",
  "conteudo": "...",
  "status": "publicado"
}
```

### Admin: Deletar Artigo
```
DELETE /api/admin/artigos/[id]
```

---

## ❤️ Endpoints de Favoritos

### Artigos Favoritos

**Listar**
```
GET /api/favoritos/artigos
Response: [{ id, artigoId, titulo, slug, resumo }]
```

**Adicionar**
```
POST /api/favoritos/artigos
{
  "artigoId": 1
}
```

**Remover**
```
DELETE /api/favoritos/artigos/[id]
```

**Verificar se é Favorito**
```
GET /api/favoritos/artigos/check/[artigoId]
Response: { isFavorite: boolean }
```

---

## 🛍️ Endpoints de Produtos

### Listar Produtos
```
GET /api/produtos?page=1&limit=12&marca=Farm&categoria=Cabelo
Response: {
  produtos: [{ id, nome, preco, imagens, avaliacao }],
  total: 150,
  page: 1
}
```

### Detalhes do Produto
```
GET /api/produtos/[id]
Response: {
  id, nome, descricao, preco,
  imagens: [{ url, ordem }],
  avaliacoes: [{ nota, comentario, usuario }],
  categoria, marca
}
```

### Upload de Imagens (Admin)
```
POST /api/produtos/[id]/imagens
Content-Type: multipart/form-data
[binary image data]
```

### Reordenar Imagens (Admin)
```
PUT /api/produtos/[id]/imagens/[imagemId]
{
  "ordem": 2
}
```

---

## ⭐ Endpoints de Avaliações

### Criar Avaliação
```
POST /api/avaliacoes
{
  "produtoId": 1,
  "nota": 5,
  "comentario": "Excelente produto!"
}
```

### Listar Avaliações de Produto
```
GET /api/avaliacoes?produtoId=1
Response: [{ id, nota, comentario, usuario, data }]
```

### Atualizar Avaliação
```
PUT /api/avaliacoes/[id]
{
  "nota": 4,
  "comentario": "Bom, mas esperava mais"
}
```

### Deletar Avaliação
```
DELETE /api/avaliacoes/[id]
```

---

## 🏷️ Endpoints de Tags

### Listar Tags
```
GET /api/tags
Response: [{ id, nome }]
```

### Criar Tag (Admin)
```
POST /api/tags
{
  "nome": "nova-tag"
}
```

### Atualizar Tag (Admin)
```
PUT /api/tags/[id]
{
  "nome": "tag-atualizada"
}
```

---

## ✂️ Endpoints de Cortes

### Listar Cortes
```
GET /api/cortes
Response: [{ id, nome, descricao, imagem }]
```

### Detalhes do Corte
```
GET /api/cortes/[id]
Response: {
  id, nome, descricao, comoFazer, historia, imagem
}
```

### Admin: Criar Corte
```
POST /api/cortes
{
  "nome": "Corte Moderno",
  "descricao": "...",
  "comoFazer": "...",
  "historia": "...",
  "imagem": "url"
}
```

---

## 🏢 Endpoints de Empresas/Influenciadores

### Listar Empresas
```
GET /api/empresas
Response: [{ id, nome, logo, descricao, site }]
```

### Listar Influenciadores
```
GET /api/parcerias/influenciadores
Response: [{ id, nome, area, followers, instagram }]
```

---

## 🔐 Headers Obrigatórios

### Autenticação de Usuário
```
Cookie: auth-token=<JWT>
```

### Autenticação Admin
```
Cookie: admin-token=<JWT>
```

### Content-Type
```
Content-Type: application/json
(ou multipart/form-data para uploads)
```

---

## 📊 Status Codes

| Código | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Não autenticado |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Conflito (ex: email já existe) |
| 500 | Internal Server Error - Erro no servidor |

---

## 🗄️ Modelo de Dados

### Usuário
```
{
  id_usuario: Integer (PK)
  nome: String
  email: String (UNIQUE)
  senha: String (hashed)
  genero: Enum
  dataNascimento: DateTime
  avatar: String?
  criadoEm: DateTime
  atualizadoEm: DateTime
}
```

### Artigo
```
{
  id: Integer (PK)
  titulo: String
  slug: String (UNIQUE)
  conteudo: Text
  resumo: String
  status: Enum (publicado, rascunho, agendado)
  dataPublicacao: DateTime?
  criadoEm: DateTime
  atualizadoEm: DateTime
}
```

### Produto
```
{
  id: Integer (PK)
  nome: String
  descricao: Text
  preco: Decimal
  marca: String
  categoria: String
  ativo: Boolean
  criadoEm: DateTime
}
```

---

## 🔄 Fluxos Principais

### 1. Registro e Login
1. Usuário entra email/senha em `/register`
2. Senha hasheada com bcrypt
3. Usuário recebe JWT em cookie
4. Cookie enviado automaticamente em requisições seguintes

### 2. Criar e Publicar Artigo
1. Admin cria artigo com status `rascunho`
2. Admin pode editar antes de publicar
3. Ao publicar, status muda para `publicado`
4. Artigos publicados aparecem em `/artigos`

### 3. Favoritar Artigo
1. Usuário autenticado adiciona artigo aos favoritos
2. POST `/api/favoritos/artigos` com `artigoId`
3. Artigo aparece em `/api/favoritos/artigos`

### 4. Avaliar Produto
1. Usuário autenticado cria avaliação
2. POST `/api/avaliacoes` com nota (1-5) e comentário
3. Avaliação aparece no detalhe do produto

---

## 📝 Exemplo de Requisição Completa

```bash
# 1. Fazer login
curl -X POST https://oasis.com/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","senha":"123456"}' \
  -c cookies.txt

# 2. Buscar artigos com autenticação
curl -X GET https://oasis.com/api/artigos \
  -b cookies.txt

# 3. Adicionar aos favoritos
curl -X POST https://oasis.com/api/favoritos/artigos \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"artigoId":5}'
```

---

## 🚀 Deploy

- **Frontend:** Vercel (auto-deploy no push para main)
- **Backend:** Vercel Serverless Functions
- **Database:** Supabase PostgreSQL
- **Storage:** Supabase Storage (para imagens)

---

## 📚 Referências

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [JWT Intro](https://jwt.io/introduction)
- [Supabase Docs](https://supabase.com/docs)
