import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const files = [
  "src/app/api/usuarios/upload-foto/route.ts",
  "src/app/api/usuarios/credenciais/route.ts",
  "src/app/api/usuarios/excluir/route.ts",
  "src/app/api/usuarios/pessoais/route.ts",
  "src/app/api/usuarios/perfil/route.ts",
  "src/app/api/avaliacoes/route.ts",
  "src/app/api/avaliacoes/[id]/route.ts",
  "src/app/api/favoritos/artigos/route.ts",
  "src/app/api/favoritos/artigos/[id]/route.ts",
  "src/app/api/favoritos/artigos/check/[id]/route.ts",
  "src/app/api/test-favorito/route.ts",
  "src/app/api/produtos/[id]/imagens/route.ts",
  "src/app/api/produtos/[id]/imagens/[imagemId]/route.ts",
];

files.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf-8');

    // Encontrar padrão de function com jwtVerify
    // function extractToken(...) { ... jwtVerify(...) ... }
    // Converter para async

    // Adicionar await antes de jwtVerify
    const hasJwtVerify = content.includes('jwtVerify(');
    if (hasJwtVerify) {
      // Converter function para async function
      content = content.replace(/^(\s*)function\s+(\w+)\s*\(/m, '$1async function $2 (');

      // Adicionar await antes de jwtVerify se não tiver
      content = content.replace(/([^a-zA-Z_])const\s+(\w+)\s*=\s*jwtVerify\(/g, '$1const $2 = await jwtVerify(');
      content = content.replace(/([^a-zA-Z_])const\s+(\w+)\s*=\s*(jwtVerify\()/g, '$1const $2 = await $3');

      // Adicionar encodificação de secret
      if (content.includes('jwtVerify(') && !content.includes('TextEncoder')) {
        content = content.replace(
          /const\s+(\w+)\s*=\s*await\s+jwtVerify\(([^,]+),\s*process\.env\.([A-Z_]+)!\)/g,
          'const secret = new TextEncoder().encode(process.env.$3!);\n  const $1 = await jwtVerify($2, secret)'
        );
      }

      fs.writeFileSync(fullPath, content);
      console.log(`✓ ${path.basename(file)}`);
    }
  }
});

console.log('\n✅ Correções de JWT concluídas');
