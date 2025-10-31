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

const decimalFiles = [
  'src/lib/zod-schemas/schemas/objects/DecimalFieldUpdateOperationsInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/NestedDecimalWithAggregatesFilter.schema.ts',
  'src/lib/zod-schemas/schemas/objects/NestedDecimalFilter.schema.ts',
  'src/lib/zod-schemas/schemas/objects/DecimalWithAggregatesFilter.schema.ts',
  'src/lib/zod-schemas/schemas/objects/DecimalFilter.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasUncheckedUpdateManyInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasUpdateManyMutationInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasCreateManyInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasUncheckedUpdateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasUpdateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasUncheckedCreateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasCreateInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasScalarWhereWithAggregatesInput.schema.ts',
  'src/lib/zod-schemas/schemas/objects/EmpresasWhereInput.schema.ts',
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

// Fix decimal refine issues
decimalFiles.forEach(file => {
  const filePath = join(rootDir, file);
  try {
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Remove problematic refine with isValidDecimalInput
    content = content.replace(/\.refine\(\(v\) => isValidDecimalInput\(v\), \{[^}]*message:[^}]*\}\)/g, '');

    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed ${file}`);
    }
  } catch (error) {
    console.warn(`⚠ Could not process ${file}: ${error.message}`);
  }
});

// Fix all influenciadores Decimal fields
const influenciadoresObjFiles = [
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

influenciadoresObjFiles.forEach(file => {
  const filePath = join(rootDir, file);
  try {
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Remove problematic refine with isValidDecimalInput for Decimal fields
    content = content.replace(/\.refine\(\(v\) => isValidDecimalInput\(v\), \{[^}]*\}\)/g, '');

    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed ${file}`);
    }
  } catch (error) {
    // Silent fail for missing files
  }
});

// Fix influenciadores schema casing issue
const influenciadoresFile = 'src/lib/zod-schemas/schemas/aggregateinfluenciadores.schema.ts';
try {
  const filePath = join(rootDir, influenciadoresFile);
  let content = readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Fix lowercase influenciadores to PascalCase Influenciadores in Prisma types
  content = content.replace(/Prisma\.influenciadores([A-Z])/g, 'Prisma.Influenciadores$1');

  if (content !== originalContent) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed ${influenciadoresFile}`);
  }
} catch (error) {
  console.warn(`⚠ Could not process ${influenciadoresFile}: ${error.message}`);
}

console.log('✓ Zod schema fixes applied');
