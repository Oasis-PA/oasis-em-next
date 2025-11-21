// test-supabase-upload.js
// Script de teste para verificar o upload no Supabase Storage

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Carrega variáveis de ambiente
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Variáveis de ambiente não configuradas!');
  console.error('Certifique-se de que NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY estão no .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testSupabaseStorage() {
  console.log('🧪 Iniciando teste do Supabase Storage...\n');

  // 1. Verificar conexão
  console.log('1️⃣ Verificando conexão com Supabase...');
  console.log(`   URL: ${SUPABASE_URL}`);
  console.log(`   Service Role Key: ${SUPABASE_KEY.substring(0, 20)}...`);

  // 2. Listar buckets
  console.log('\n2️⃣ Listando buckets disponíveis...');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

  if (bucketsError) {
    console.error('❌ Erro ao listar buckets:', bucketsError.message);
    return;
  }

  console.log(`   Encontrados ${buckets.length} bucket(s):`);
  buckets.forEach(bucket => {
    console.log(`   - ${bucket.name} (público: ${bucket.public})`);
  });

  // 3. Verificar se bucket 'artigos-imagens' existe
  console.log('\n3️⃣ Verificando bucket "artigos-imagens"...');
  const artigosBucket = buckets.find(b => b.name === 'artigos-imagens');

  if (!artigosBucket) {
    console.error('❌ Bucket "artigos-imagens" não encontrado!');
    console.log('\n📝 Para criar o bucket:');
    console.log('   1. Acesse: https://supabase.com/dashboard');
    console.log('   2. Vá em Storage > New Bucket');
    console.log('   3. Nome: artigos-imagens');
    console.log('   4. Marque como público');
    console.log('   5. Salve');
    console.log('\n   Ou leia o arquivo SUPABASE_STORAGE_SETUP.md para instruções detalhadas.');
    return;
  }

  console.log(`   ✅ Bucket encontrado! (público: ${artigosBucket.public})`);

  if (!artigosBucket.public) {
    console.warn('   ⚠️  AVISO: Bucket não está marcado como público!');
  }

  // 4. Criar imagem de teste
  console.log('\n4️⃣ Criando imagem de teste...');
  const testImageBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
  const timestamp = Date.now();
  const fileName = `test-upload-${timestamp}.png`;
  const filePath = `artigos/${fileName}`;

  console.log(`   Arquivo: ${filePath}`);

  // 5. Fazer upload
  console.log('\n5️⃣ Fazendo upload da imagem...');
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('artigos-imagens')
    .upload(filePath, testImageBuffer, {
      contentType: 'image/png',
      upsert: false,
      cacheControl: '3600'
    });

  if (uploadError) {
    console.error('❌ Erro no upload:', uploadError.message);
    if (uploadError.message.includes('Bucket not found')) {
      console.log('\n💡 O bucket não foi encontrado. Crie-o seguindo as instruções acima.');
    } else if (uploadError.message.includes('policy')) {
      console.log('\n💡 Erro de permissão. Configure as políticas RLS:');
      console.log('   SQL Editor do Supabase:');
      console.log(`
   CREATE POLICY "Service role pode fazer upload"
   ON storage.objects FOR INSERT
   TO service_role
   WITH CHECK (bucket_id = 'artigos-imagens');
      `);
    }
    return;
  }

  console.log('   ✅ Upload realizado com sucesso!');
  console.log(`   Path: ${uploadData.path}`);

  // 6. Obter URL pública
  console.log('\n6️⃣ Gerando URL pública...');
  const { data: urlData } = supabase.storage
    .from('artigos-imagens')
    .getPublicUrl(filePath);

  console.log(`   ✅ URL gerada: ${urlData.publicUrl}`);

  // 7. Limpar - deletar arquivo de teste
  console.log('\n7️⃣ Limpando arquivo de teste...');
  const { error: deleteError } = await supabase.storage
    .from('artigos-imagens')
    .remove([filePath]);

  if (deleteError) {
    console.warn('   ⚠️  Erro ao deletar arquivo de teste:', deleteError.message);
  } else {
    console.log('   ✅ Arquivo de teste deletado');
  }

  // 8. Resumo
  console.log('\n' + '='.repeat(50));
  console.log('✅ TESTE CONCLUÍDO COM SUCESSO!');
  console.log('='.repeat(50));
  console.log('\n📌 Próximos passos:');
  console.log('   1. O sistema de upload está funcionando!');
  console.log('   2. Teste criando um artigo pela interface admin');
  console.log('   3. Faça upload de uma imagem de header ou conteúdo');
  console.log('\n🎉 Tudo pronto para usar o Supabase Storage!\n');
}

// Executar teste
testSupabaseStorage().catch(error => {
  console.error('\n❌ Erro inesperado:', error);
  process.exit(1);
});
