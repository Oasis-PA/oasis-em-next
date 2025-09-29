import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { prisma } from "@/lib/prisma"; // seu client Prisma

// 1️⃣ Gerar rotas dinâmicas com base no banco
export const getStaticPaths: GetStaticPaths = async () => {
  const artigos: { slug: string }[] = await prisma.artigo.findMany({ select: { slug: true } });

  return {
    paths: artigos.map((a) => ({ params: { slug: a.slug } })),
    fallback: "blocking",
  };
};

// 2️⃣ Buscar dados de cada artigo
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const artigo = await prisma.artigo.findUnique({
    where: { slug: params?.slug as string },
  });

  if (!artigo) return { notFound: true };

  return {
    props: { artigo },
    revalidate: 60 * 120, // revalidar a cada 12 horas
  };
};

// 3️⃣ Componente que renderiza o artigo
export default function ArtigoPage({ artigo }: any) {
  return (
    <main>
      <h1>{artigo.titulo}</h1>
      <ReactMarkdown>{artigo.conteudo}</ReactMarkdown>
    </main>
  );
}
