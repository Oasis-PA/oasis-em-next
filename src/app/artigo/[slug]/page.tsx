import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import Header from "../../../components/header";
import '@/styles/artigoteste.css';

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
  const artigo = await prisma.artigo.findUnique({
    where: { slug: params.slug }
  });

  if (!artigo || !artigo.conteudo) {
    return (
      <>
        <Header />
        <main>
          <article>
            <p>Artigo não encontrado ou sem conteúdo.</p>
          </article>
        </main>
      </>
    );
  }

  // 👇 Constrói automaticamente o caminho da imagem baseado no slug
  const imagemHeader = `/images/artigos/${params.slug}-header.png`;

  return (
    <>
      <Header backgroundImage={imagemHeader} />
      
      <main>
        <article className="markdown-content">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1>{children}</h1>,
              h2: ({ children }) => <h3>{children}</h3>,
              h3: ({ children }) => <h3>{children}</h3>,
              p: ({ children, node }) => {
                // Verifica se o parágrafo contém apenas uma imagem
                const hasOnlyImage = node?.children?.length === 1 && 
                                    node.children[0].type === 'element' && 
                                    node.children[0].tagName === 'img';
                
                // Se só tem imagem, não envolve em <p>
                if (hasOnlyImage) {
                  return <>{children}</>;
                }
                
                return <p>{children}</p>;
              },
              strong: ({ children }) => <strong>{children}</strong>,
              em: ({ children }) => <em>{children}</em>,
              ul: ({ children }) => <ul>{children}</ul>,
              ol: ({ children }) => <ol>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              img: ({ src, alt, title }) => {
                // Extrai classe customizada do alt text se houver
                const match = alt?.match(/^(.*?)\s*\{([^}]+)\}$/);
                const altText = match ? match[1].trim() : alt;
                const customClass = match ? match[2].trim() : '';
                
                return (
                  <figure className={`artigo-figura ${customClass}`}>
                    <img 
                      src={src} 
                      alt={altText || ''} 
                      className="artigo-imagem"
                    />
                    {title && <figcaption>{title}</figcaption>}
                  </figure>
                );
              },
            }}
          >
            {artigo.conteudo}
          </ReactMarkdown>
        </article>
      </main>
    </>
  );
}