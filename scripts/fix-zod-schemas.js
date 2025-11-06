#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');

// Lista de arquivos que precisam de fixes
const filesToFix = [
  // Files with include issues
  'src/lib/zod-schemas/schemas/findFirstEmpresas.schema.ts',
  'src/lib/zod-schemas/schemas/findFirstOrThrowEmpresas.schema.ts',
  'src/lib/zod-schemas/schemas/findManyEmpresas.schema.ts',
  'src/lib/zod-schemas/schemas/findFirstTipoPele.schema.ts',
  'src/lib/zod-schemas/schemas/findFirstOrThrowTipoPele.schema.ts',
  'src/lib/zod-schemas/schemas/findManyTipoPele.schema.ts',
  'src/lib/zod-schemas/schemas/findFirstOrThrowArtigo.schema.ts',
  'src/lib/zod-schemas/schemas/findManyArtigo.schema.ts',

  // Decimal schema files with refine issues
  'src/lib/zod-schemas/schemas/objects/DecimalFieldUpdateOperationsInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/NestedDecimalWithAggregatesFilter.schema.ts',
  'src/lib/zod-schemas/schemas/objects/NestedDecimalFilter.schema.ts',
  'src/lib/zod-schemas/schemas/objects/DecimalWithAggregatesFilter.schema.ts',
  'src/lib/zod-schemas/schemas/objects/DecimalFilter.schema.ts',

  // Empresas Decimal schema files
  'src/lib/zod-schemas/schemas/objects/EmpresasUncheckedUpdateManyInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasUpdateManyMutationInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasCreateManyInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasUncheckedUpdateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasUpdateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasUncheckedCreateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasCreateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasScalarWhereWithAggregatesInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasWhereInput.schema.ts',

  // Influenciadores schema files
  'src/lib/zod-schemas/schemas/objects/influenciadoresCreateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/influenciadoresUncheckedCreateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/influenciadoresUpdateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/influenciadoresUncheckedUpdateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/influenciadoresUpdateManyMutationInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/influenciadoresUncheckedUpdateManyInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/influenciadoresCreateManyInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/influenciadoresWhereInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/influenciadoresScalarWhereWithAggregatesInput.schema.ts',
];

function fixZodSchemaFile(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Fix 1: Remove empty include fields
    content = content.replace(/include:\s*,/g, '');

    // Fix 2: Remove .refine() calls that cause syntax errors
    // This regex looks for .refine(...) with message property and removes it
    // Pattern: .refine((v) => isValidDecimalInput(v), { message: '...' })
    content = content.replace(
      /\.refine\(\s*\(v\)\s*=>\s*isValidDecimalInput\(v\)\s*,\s*\{\s*message\s*:\s*[^}]*\}\s*\)/g,
      ''
    );

    // Fix 3: Remove any remaining problematic .refine calls on Decimal types
    // Look for patterns like: z.union([...]).refine(...)
    content = content.replace(
      /\.refine\s*\(\s*\([^)]*\)\s*=>\s*[^,]*,\s*\{[^}]*\}\s*\)/g,
      ''
    );

    // Write back if changed
    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.warn(`⚠ Error processing ${filePath}: ${error.message}`);
    return false;
  }
}

// Fix influenciadores casing
function fixInfluenciadoresCasing(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Fix lowercase influenciadores to PascalCase Influenciadores
    content = content.replace(/Prisma\.influenciadores([A-Z])/g, 'Prisma.Influenciadores$1');

    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.warn(`⚠ Error processing ${filePath}: ${error.message}`);
    return false;
  }
}

// Process all files
let fixedCount = 0;
filesToFix.forEach(file => {
  const filePath = join(rootDir, file);
  if (fixZodSchemaFile(filePath)) {
    console.log(`✓ Fixed ${file}`);
    fixedCount++;
  }
});

// Fix influenciadores schema casing
const influenciadoresFile = 'src/lib/zod-schemas/schemas/aggregateinfluenciadores.schema.ts';
const influenciadoresPath = join(rootDir, influenciadoresFile);
if (fixInfluenciadoresCasing(influenciadoresPath)) {
  console.log(`✓ Fixed ${influenciadoresFile}`);
  fixedCount++;
}

console.log(`✓ Zod schema fixes applied (${fixedCount} files modified)`);
