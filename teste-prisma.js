// teste-prisma.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const genero = await prisma.genero.create({
    data: { nome: "Masculino", sigla: "M" },
  });
  console.log("Gênero criado:", genero);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
