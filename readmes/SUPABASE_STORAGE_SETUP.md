# Configuração do Supabase Storage para Artigos

Este documento descreve como configurar o bucket do Supabase Storage para armazenar imagens de artigos.

## Pré-requisitos

- Conta no Supabase configurada
- Variáveis de ambiente configuradas no `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

## Passos para Configuração

### 1. Acessar o Supabase Dashboard

1. Acesse [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. No menu lateral, clique em **Storage**

### 2. Criar o Bucket

1. Clique no botão **"New bucket"**
2. Configure o bucket com os seguintes dados:
   - **Name**: `artigos-imagens`
   - **Public bucket**: ✅ **Marcar como público**
   - **File size limit**: 5 MB (ou conforme necessário)
   - **Allowed MIME types**: deixe vazio ou adicione: `image/jpeg,image/png,image/gif,image/webp`

3. Clique em **"Create bucket"**

### 3. Configurar Políticas de Acesso (RLS)

Após criar o bucket, configure as políticas de segurança:

#### Política 1: Permitir Upload (apenas admin)

Se você quiser que apenas admins façam upload:

```sql
-- Esta política deve ser criada no SQL Editor do Supabase
CREATE POLICY "Admin pode fazer upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'artigos-imagens'
  AND auth.jwt()->>'role' = 'admin'
);
```

**OU**, se preferir permitir qualquer requisição autenticada via service role key (recomendado para sua API):

```sql
CREATE POLICY "Service role pode fazer upload"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'artigos-imagens');
```

#### Política 2: Permitir Leitura Pública

```sql
CREATE POLICY "Leitura pública de imagens"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'artigos-imagens');
```

### 4. Configurar via Interface do Supabase (Alternativa)

Se preferir usar a interface:

1. Vá em **Storage** > **Policies** > **artigos-imagens**
2. Clique em **"New Policy"**
3. Use o template **"Allow public read access"** para leitura pública
4. Crie outra política para permitir **INSERT** com role **service_role**

### 5. Verificar Configuração

Após configurar, teste fazendo upload de uma imagem através da interface admin do seu projeto.

## Estrutura de Arquivos

Os arquivos são salvos com a seguinte estrutura:

```
artigos-imagens/
└── artigos/
    ├── <slug>-header-<timestamp>.jpg
    ├── <slug>-conteudo-<timestamp>.png
    └── ...
```

Exemplo: `artigos/skincare-verao-header-1735123456789.jpg`

## URLs das Imagens

As URLs públicas seguem o formato:

```
https://<project-ref>.supabase.co/storage/v1/object/public/artigos-imagens/artigos/<filename>
```

## Migração de Imagens Antigas

Se você tinha imagens na pasta `public/images/artigos/`, será necessário:

1. Fazer upload manual via interface do Supabase Storage
2. Atualizar as URLs no banco de dados (tabela `artigo`, campos `imagemHeader` e URLs no `conteudo`)

## Vantagens desta Abordagem

✅ Persistência: Imagens não são perdidas em deploys
✅ CDN Global: Delivery otimizado
✅ Escalabilidade: Funciona com múltiplas instâncias
✅ Backup: Imagens incluídas no backup do Supabase
✅ Transformação: Possibilidade de redimensionar imagens on-the-fly
✅ Controle de Acesso: Políticas RLS para segurança

## Troubleshooting

### Erro: "Bucket not found"
- Verifique se o bucket `artigos-imagens` foi criado corretamente
- Certifique-se de que o nome está correto (sem espaços extras)

### Erro: "Permission denied"
- Verifique se as políticas RLS foram configuradas corretamente
- Confirme que `SUPABASE_SERVICE_ROLE_KEY` está configurada no `.env.local`

### Imagens não aparecem
- Verifique se o bucket está marcado como **público**
- Teste a URL diretamente no navegador
- Verifique as políticas de leitura

## Recursos Adicionais

- [Documentação oficial do Supabase Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)
