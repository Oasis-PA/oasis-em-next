-- CreateTable "Genero"
CREATE TABLE "Genero" (
    "id_genero" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id_genero")
);

-- CreateTable "TipoCabelo"
CREATE TABLE "TipoCabelo" (
    "id_tipo_cabelo" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "TipoCabelo_pkey" PRIMARY KEY ("id_tipo_cabelo")
);

-- CreateTable "Usuario"
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "senha" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3),
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_genero" INTEGER NOT NULL,
    "id_tipo_cabelo" INTEGER,
    "sobrenome" TEXT,
    "sobre" TEXT,
    "url_foto" VARCHAR,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable "Categoria"
CREATE TABLE "Categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable "TipoPele"
CREATE TABLE "TipoPele" (
    "id_tipo_pele" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT,

    CONSTRAINT "TipoPele_pkey" PRIMARY KEY ("id_tipo_pele")
);

-- CreateTable "Tag"
CREATE TABLE "Tag" (
    "id_tag" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id_tag")
);

-- CreateTable "Produto"
CREATE TABLE "Produto" (
    "id_produto" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_categoria" INTEGER NOT NULL,
    "descricao" TEXT,
    "id_tag" INTEGER,
    "id_tipo_pele" INTEGER,
    "id_tipo_cabelo" INTEGER,
    "url_imagem" VARCHAR(500),
    "url_loja" VARCHAR(500),
    "composicao" TEXT,
    "qualidades" TEXT,
    "mais_detalhes" TEXT,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable "Avaliacao"
CREATE TABLE "Avaliacao" (
    "id_avaliacao" SERIAL NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "data_avaliacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id_avaliacao")
);

-- CreateTable "Favorito"
CREATE TABLE "Favorito" (
    "id_favorito" SERIAL NOT NULL,
    "data_favoritado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("id_favorito")
);

-- CreateTable "PasswordReset"
CREATE TABLE "PasswordReset" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordReset_pkey" PRIMARY KEY ("id")
);

-- CreateTable "Artigo"
CREATE TABLE "Artigo" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL DEFAULT 'NOT NULL',
    "slug" TEXT NOT NULL DEFAULT 'NOT NULL',
    "conteudo" TEXT NOT NULL DEFAULT 'NOT NULL',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "dataPublicacao" TIMESTAMPTZ(6),
    "resumo" TEXT,
    "imagemHeader" TEXT,
    "status" TEXT DEFAULT 'rascunho',
    "themeDark" BOOLEAN DEFAULT false,

    CONSTRAINT "Artigo_pkey" PRIMARY KEY ("id")
);

-- CreateTable "ImagemProduto"
CREATE TABLE "ImagemProduto" (
    "id_imagem_produto" SERIAL NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "url_imagem" TEXT NOT NULL,
    "ordem" INTEGER,

    CONSTRAINT "ImagemProduto_pkey" PRIMARY KEY ("id_imagem_produto")
);

-- CreateTable "ArtigoTag"
CREATE TABLE "ArtigoTag" (
    "artigoId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "ArtigoTag_pkey" PRIMARY KEY ("artigoId","tagId")
);

-- CreateTable "FavoritoArtigo"
CREATE TABLE "FavoritoArtigo" (
    "id_favorito_artigo" SERIAL NOT NULL,
    "data_favoritado" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "id_artigo" INTEGER NOT NULL,

    CONSTRAINT "FavoritoArtigo_pkey" PRIMARY KEY ("id_favorito_artigo")
);

-- CreateTable "Corte"
CREATE TABLE "Corte" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT,
    "historia" TEXT,
    "comoFazer" TEXT,
    "rostoCompativel" TEXT,
    "comoArrumar" TEXT,
    "imagemPrincipal" TEXT,
    "status" TEXT NOT NULL DEFAULT 'rascunho',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Corte_pkey" PRIMARY KEY ("id")
);

-- CreateTable "Empresas"
CREATE TABLE "Empresas" (
    "id" SMALLSERIAL NOT NULL,
    "nome_sobrenome" TEXT NOT NULL,
    "email_corporativo" TEXT NOT NULL DEFAULT '',
    "telefone" DECIMAL NOT NULL,
    "empresa_representada" VARCHAR NOT NULL,
    "total_colaboradores" INTEGER NOT NULL,
    "cargo" TEXT NOT NULL,
    "motivo_contato" TEXT NOT NULL,
    "data_solicitacao" TIMESTAMPTZ(6) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable "influenciadores"
CREATE TABLE "influenciadores" (
    "id" SMALLSERIAL NOT NULL,
    "nome_contato" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL DEFAULT '',
    "telefone" DECIMAL NOT NULL,
    "estado" VARCHAR(255) NOT NULL,
    "cidade" VARCHAR(255) NOT NULL,
    "perfil_principal" VARCHAR(255) NOT NULL,
    "numero_seguidores" VARCHAR(50) NOT NULL,
    "proposta" TEXT NOT NULL,
    "data_solicitacao" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(50) DEFAULT 'pendente',

    CONSTRAINT "influenciadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable "Cortes"
CREATE TABLE "Cortes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "historia" TEXT,
    "como_fazer" TEXT,
    "rosto_compativel" TEXT,
    "como_arrumar" TEXT,
    "imagem_principal" VARCHAR(500),
    "status" TEXT NOT NULL DEFAULT 'rascunho',
    "criadoEm" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMPTZ(6) NOT NULL,
    "data_publicacao" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cortes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genero_nome_key" ON "Genero"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Genero_sigla_key" ON "Genero"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "TipoCabelo_nome_key" ON "TipoCabelo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nome_key" ON "Tag"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_token_key" ON "PasswordReset"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Artigo_slug_key" ON "Artigo"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Corte_slug_key" ON "Corte"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Empresas_email_corporativo_key" ON "Empresas"("email_corporativo");

-- CreateIndex
CREATE UNIQUE INDEX "influenciadores_email_key" ON "influenciadores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cortes_slug_key" ON "Cortes"("slug");

-- CreateIndex
CREATE INDEX "ArtigoTag_artigoId_idx" ON "ArtigoTag"("artigoId");

-- CreateIndex
CREATE INDEX "ArtigoTag_tagId_idx" ON "ArtigoTag"("tagId");

-- CreateIndex
CREATE INDEX "influenciadores_data_solicitacao_idx" ON "influenciadores"("data_solicitacao" DESC);

-- CreateIndex
CREATE INDEX "influenciadores_email_idx" ON "influenciadores"("email");

-- CreateIndex
CREATE INDEX "influenciadores_status_idx" ON "influenciadores"("status");

-- CreateIndex
CREATE INDEX "Cortes_slug_idx" ON "Cortes"("slug");

-- CreateIndex
CREATE INDEX "Cortes_status_idx" ON "Cortes"("status");

-- CreateIndex
CREATE INDEX "fk_produto_imagem" ON "ImagemProduto"("id_produto");

-- CreateIndex
CREATE INDEX "idx_favorito_artigo_artigo" ON "FavoritoArtigo"("id_artigo");

-- CreateIndex
CREATE INDEX "idx_favorito_artigo_data" ON "FavoritoArtigo"("data_favoritado");

-- CreateIndex
CREATE INDEX "idx_favorito_artigo_usuario" ON "FavoritoArtigo"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "unique_usuario_artigo" ON "FavoritoArtigo"("id_usuario", "id_artigo");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_id_genero_fkey" FOREIGN KEY ("id_genero") REFERENCES "Genero"("id_genero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_id_tipo_cabelo_fkey" FOREIGN KEY ("id_tipo_cabelo") REFERENCES "TipoCabelo"("id_tipo_cabelo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "Tag"("id_tag") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_id_tipo_pele_fkey" FOREIGN KEY ("id_tipo_pele") REFERENCES "TipoPele"("id_tipo_pele") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_id_tipo_cabelo_fkey" FOREIGN KEY ("id_tipo_cabelo") REFERENCES "TipoCabelo"("id_tipo_cabelo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordReset" ADD CONSTRAINT "PasswordReset_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ImagemProduto" ADD CONSTRAINT "fk_produto_imagem" FOREIGN KEY ("id_produto") REFERENCES "Produto"("id_produto") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ArtigoTag" ADD CONSTRAINT "ArtigoTag_artigoId_fkey" FOREIGN KEY ("artigoId") REFERENCES "Artigo"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ArtigoTag" ADD CONSTRAINT "ArtigoTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id_tag") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FavoritoArtigo" ADD CONSTRAINT "fk_favorito_artigo_artigo" FOREIGN KEY ("id_artigo") REFERENCES "Artigo"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FavoritoArtigo" ADD CONSTRAINT "fk_favorito_artigo_usuario" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;
