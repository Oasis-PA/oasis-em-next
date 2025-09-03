-- CreateTable
CREATE TABLE "public"."Genero" (
    "id_genero" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id_genero")
);

-- CreateTable
CREATE TABLE "public"."TipoCabelo" (
    "id_tipo_cabelo" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "TipoCabelo_pkey" PRIMARY KEY ("id_tipo_cabelo")
);

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "senha" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3),
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_genero" INTEGER NOT NULL,
    "id_tipo_cabelo" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "public"."Categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "public"."Produto" (
    "id_produto" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "marca" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable
CREATE TABLE "public"."Avaliacao" (
    "id_avaliacao" SERIAL NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "data_avaliacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id_avaliacao")
);

-- CreateTable
CREATE TABLE "public"."Favorito" (
    "id_favorito" SERIAL NOT NULL,
    "data_favoritado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("id_favorito")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id_tag" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id_tag")
);

-- CreateTable
CREATE TABLE "public"."ProdutoTag" (
    "id_produto" INTEGER NOT NULL,
    "id_tag" INTEGER NOT NULL,

    CONSTRAINT "ProdutoTag_pkey" PRIMARY KEY ("id_produto","id_tag")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genero_nome_key" ON "public"."Genero"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Genero_sigla_key" ON "public"."Genero"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "TipoCabelo_nome_key" ON "public"."TipoCabelo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "public"."Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nome_key" ON "public"."Tag"("nome");

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_id_genero_fkey" FOREIGN KEY ("id_genero") REFERENCES "public"."Genero"("id_genero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_id_tipo_cabelo_fkey" FOREIGN KEY ("id_tipo_cabelo") REFERENCES "public"."TipoCabelo"("id_tipo_cabelo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Produto" ADD CONSTRAINT "Produto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "public"."Categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Avaliacao" ADD CONSTRAINT "Avaliacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Avaliacao" ADD CONSTRAINT "Avaliacao_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "public"."Produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorito" ADD CONSTRAINT "Favorito_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorito" ADD CONSTRAINT "Favorito_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "public"."Produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProdutoTag" ADD CONSTRAINT "ProdutoTag_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "public"."Produto"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProdutoTag" ADD CONSTRAINT "ProdutoTag_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "public"."Tag"("id_tag") ON DELETE RESTRICT ON UPDATE CASCADE;
