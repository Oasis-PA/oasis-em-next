#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = [
  'src/lib/zod-schemas/schemas/findFirstEmpresas.schema.ts',
  'src/lib/zod-schemas/schemas/findFirstOrThrowEmpresas.schema.ts',
  'src/lib/zod-schemas/schemas/findManyEmpresas.schema.ts',
  'src/lib/zod-schemas/schemas/findFirstTipoPele.schema.ts',
  'src/lib/zod-schemas/schemas/findFirstOrThrowTipoPele.schema.ts',
  'src/lib/zod-schemas/schemas/findManyTipoPele.schema.ts',
  'src/lib/zod-schemas/schemas/findFirstOrThrowArtigo.schema.ts',
  'src/lib/zod-schemas/schemas/findManyArtigo.schema.ts',
];

const rootDir = join(__dirname, '..');

files.forEach(file => {
  const filePath = join(rootDir, file);
  try {
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Remove empty include fields: "include: ,"
    content = content.replace(/include:\s*,/g, '');

    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed ${file}`);
    }
  } catch (error) {
    console.warn(`⚠ Could not process ${file}: ${error.message}`);
  }
});

console.log('✓ Zod schema fixes applied');
