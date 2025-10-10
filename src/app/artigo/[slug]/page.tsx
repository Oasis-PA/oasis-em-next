import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import '@/styles/artigoteste.css';

interface ArtigoProps {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';

export default async function ArtigoPage({ params }: ArtigoProps) {
  const artigo = await prisma.artigo.findUnique({ 
    where: { slug: params.slug } 
  });

  if (!artigo || !artigo.conteudo) {
    return (
      <main>
        <article>
          <p>Artigo não encontrado ou sem conteúdo.</p>
        </article>
      </main>
    );
  }

  return (
    <>
     
      <main>
      <article className="markdown-content">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1>{children}</h1>,
            h2: ({ children }) => <h3>{children}</h3>,
            h3: ({ children }) => <h3>{children}</h3>,
            p: ({ children }) => <p>{children}</p>,
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            ul: ({ children }) => <ul>{children}</ul>,
            ol: ({ children }) => <ol>{children}</ol>,
            li: ({ children }) => <li>{children}</li>,
          }}
        >
          {artigo.conteudo}
        </ReactMarkdown>
      </article>
    </main>

    </>
  );
}