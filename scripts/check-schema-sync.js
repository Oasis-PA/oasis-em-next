import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env' });

const prisma = new PrismaClient();

async function checkSchemaSync() {
  try {
    console.log('📋 Verificando sincronização entre schema.prisma e banco de dados...\n');

    // Ler schema.prisma
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    // Encontrar todos os modelos no schema
    const modelRegex = /^model\s+(\w+)\s*{/gm;
    const models = [];
    let match;
    while ((match = modelRegex.exec(schema)) !== null) {
      models.push(match[1]);
    }

    console.log(`📊 Modelos encontrados no schema (${models.length}):`);
    models.forEach(m => console.log(`   - ${m}`));

    // Verificar quais tabelas existem no banco
    console.log('\n🔗 Verificando tabelas no banco de dados...');

    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;

    const tableNames = tables.map(t => t.table_name);
    console.log(`\n📊 Tabelas encontradas no banco (${tableNames.length}):`);
    tableNames.forEach(t => console.log(`   - ${t}`));

    // Comparar (case-insensitive)
    console.log('\n📝 Análise de sincronização:');
    const tableNamesLower = tableNames.map(t => t.toLowerCase());
    const inSchemaButNotDb = models.filter(m =>
      !tableNamesLower.includes(m.toLowerCase())
    );
    const inDbButNotSchema = tableNames.filter(t =>
      !models.map(m => m.toLowerCase()).includes(t.toLowerCase()) &&
      t !== '_prisma_migrations'
    );

    if (inSchemaButNotDb.length === 0 && inDbButNotSchema.length === 0) {
      console.log('✅ Schema e banco estão sincronizados!');
    } else {
      if (inSchemaButNotDb.length > 0) {
        console.log(`\n⚠️  Modelos no schema mas NÃO no banco (${inSchemaButNotDb.length}):`);
        inSchemaButNotDb.forEach(m => console.log(`   - ${m}`));
      }
      if (inDbButNotSchema.length > 0) {
        console.log(`\n⚠️  Tabelas no banco mas NÃO no schema (${inDbButNotSchema.length}):`);
        inDbButNotSchema.forEach(t => console.log(`   - ${t}`));
      }
    }

    console.log('\n📋 Conclusão:');
    if (inSchemaButNotDb.length === 0 && inDbButNotSchema.length === 0) {
      console.log('✅ Banco está sincronizado. Não há migrations pendentes.');
    } else {
      console.log('⚠️  Existem divergências. Rode "npx prisma migrate dev" para sincronizar.');
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchemaSync();
