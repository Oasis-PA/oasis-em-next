import Link from "next/link";
import { prisma } from "@/lib/prisma";
import '@/styles/artigo1.css';

export const dynamic = 'force-dynamic';

export default async function ArtigosListPage() {
  const artigo = await prisma.artigo.findMany({
    select: { id: true, titulo: true, slug: true },
    orderBy: { criadoEm: "desc" },
  });

 return (
  <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
    <h1>Todos os artigos</h1>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {artigo
        .filter((a) => a.slug && a.titulo)
        .map((artigo) => (
          <li key={artigo.id} style={{ marginBottom: "1rem" }}>
            <Link href={`/artigo/${artigo.slug}`}>
              <span style={{ textDecoration: "underline", color: "#48D5D2", cursor: "pointer" }}>
                {artigo.titulo}
              </span>
            </Link>
          </li>
        ))}
    </ul>
  </main>
);

};
