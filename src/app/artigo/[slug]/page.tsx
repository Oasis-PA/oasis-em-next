import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import '@/styles/artigo-geral.css';


interface ArtigoProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const artigos: { slug: string }[] = await prisma.artigo.findMany({
    select: { slug: true },
  });

  return artigos
    .filter((a) => a.slug)
    .map((a) => ({ slug: a.slug }));
}

export default async function ArtigoPage({ params }: ArtigoProps) {
  const artigo = await prisma.artigo.findUnique({ where: { slug: params.slug } });

  if (!artigo || !artigo.conteudo) {
    return (
      <main style={{ padding: "2rem" }}>
        <p>Artigo não encontrado ou sem conteúdo.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{artigo.titulo}</h1>
      <ReactMarkdown>{artigo.conteudo}</ReactMarkdown>
    </main>
  );
}
