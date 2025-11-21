import { prisma } from '../src/lib/prisma';

async function makeUserAdmin(email: string) {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      console.log(`❌ Usuário com email "${email}" não encontrado.`);
      return;
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { email },
      data: { is_admin: true },
    });

    console.log(`✅ Usuário "${usuarioAtualizado.nome}" (${usuarioAtualizado.email}) agora é administrador!`);
  } catch (error) {
    console.error('❌ Erro ao definir admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

const email = process.argv[2];

if (!email) {
  console.log('❌ Uso: npx ts-node scripts/make-admin.ts <email>');
  console.log('Exemplo: npx ts-node scripts/make-admin.ts usuario@example.com');
  process.exit(1);
}

makeUserAdmin(email);
