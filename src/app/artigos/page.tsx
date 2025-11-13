// src/app/artigos/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Artigo, Tag, ArtigoTag } from '@prisma/client';
import '@/styles/artigo-geral.css';

// ===== FUNÇÕES DE TRUNCAMENTO PARA PROTEGER O LAYOUT =====
function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

function truncateTag(tag: string, maxLength: number = 15): string {
  if (!tag) return '';
  if (tag.length <= maxLength) return tag;
  return tag.substring(0, maxLength).trim() + '...';
}

function formatDate(criadoEm: Date, atualizadoEm: Date): string {
  // Se foi atualizado mais de 1 dia depois da criação, mostrar "Atualizado em"
  const diffInDays = Math.abs(new Date(atualizadoEm).getTime() - new Date(criadoEm).getTime()) / (1000 * 60 * 60 * 24);
  
  if (diffInDays > 1) {
    return 'Atualizado em ' + new Date(atualizadoEm).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
  
  return new Date(criadoEm).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

// ===== LIMITES RÍGIDOS PARA EXIBIÇÃO =====
const DISPLAY_LIMITS = {
  titulo: {
    card: 60,        // Título em cards pequenos
    destaque: 80,    // Título em cards grandes
    hero: 100        // Título em hero sections
  },
  resumo: {
    card: 120,       // Resumo em cards
    preview: 160     // Preview expandido
  },
  tags: {
    max: 3,          // Máximo de tags exibidas
    maxLength: 15    // Máximo de caracteres por tag
  }
};

export default async function ArtigosPage() {
  // Buscar artigos publicados ordenados por data de publicação
  let artigos: (Artigo & { ArtigoTag: (ArtigoTag & { Tag: Tag })[] })[] = [];

  try {
    artigos = await prisma.artigo.findMany({
      where: {
        status: 'publicado'
      },
      include: {
        ArtigoTag: {
          include: {
            Tag: true
          },
          take: DISPLAY_LIMITS.tags.max // Limitar tags na query
        }
      },
      orderBy: {
        dataPublicacao: 'desc'
      }
    });
  } catch (error) {
    // Se o banco não estiver acessível, retornar página vazia/fallback
    artigos = [];
  }

  // Separar artigos por seção
  const artigoMaisRecente = artigos[0];
  const segundoTerceiro = artigos.slice(1, 3);
  const quartoQuinto = artigos.slice(3, 5);
  const secaoDestaque = artigos.slice(5, 6)[0];
  const gruposQuadruplos = artigos.slice(6, 14); // 8 artigos (2 linhas de 4)
  const artigoGrande = artigos.slice(14, 15)[0];
  const ultimosArtigos = artigos.slice(15);

  return (
    <div className="artigos-page-wrapper">
      <h5>Artigos</h5>
      <p>Explore nossos artigos sobre beleza, cuidados e muito mais</p>

      <main>
          <h5>Recentes</h5>

          {/* GRUPO 1 - Artigo Mais Recente (Hero) */}
          {artigoMaisRecente && (
            <Link href={`/artigo/${artigoMaisRecente.slug}`} className="grupo-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              {artigoMaisRecente.imagemHeader && (
                <img src={artigoMaisRecente.imagemHeader} alt={artigoMaisRecente.titulo} />
              )}
              <p>{formatDate(artigoMaisRecente.criadoEm, artigoMaisRecente.atualizadoEm)}</p>
              <h4>{truncateText(artigoMaisRecente.titulo, DISPLAY_LIMITS.titulo.hero)}</h4>
              <div className="Cartegorias">
                {artigoMaisRecente.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                  <div key={at.tagId} id={`c${at.tagId}`}>
                    <p>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  </div>
                ))}
              </div>
            </Link>
          )}

          {/* GRUPOS 2 e 3 - Segundo e Terceiro Artigos */}
          {segundoTerceiro.map((artigo, index) => (
            <Link 
              href={`/artigo/${artigo.slug}`} 
              key={artigo.id}
              className={index === 0 ? "grupo-2" : "grupo-3"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="#000" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              {artigo.imagemHeader && (
                <img src={artigo.imagemHeader} alt={artigo.titulo} />
              )}
              <p className="data">{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
              <h4>{truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
              <p className="descrição">
                {truncateText(artigo.resumo || '', DISPLAY_LIMITS.resumo.card)}
              </p>
              <div className="Cartegorias-ladodireito">
                {artigo.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                  <p key={at.tagId}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                ))}
              </div>
            </Link>
          ))}

          {/* SEÇÃO - Artigo em Destaque */}
          {secaoDestaque && (
            <Link href={`/artigo/${secaoDestaque.slug}`} className="seção">
              <svg id="sorriso" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              <div id="data">
                <p>{formatDate(secaoDestaque.criadoEm, secaoDestaque.atualizadoEm)}</p>
              </div>
              <div id="texto">
                <h5>{truncateText(secaoDestaque.titulo, DISPLAY_LIMITS.titulo.destaque)}</h5>
              </div>
              <div className="Cartegorias" id="carte-seção">
                {secaoDestaque.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                  <div key={at.tagId} id={`c${at.tagId}`}>
                    <p>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  </div>
                ))}
              </div>
            </Link>
          )}
          {/* SEÇÃO 2 - Grade de 3 Artigos */}
          <div className="seção2">
            {/* GRUPO 4 */}
            {quartoQuinto[0] && (
              <Link href={`/artigo/${quartoQuinto[0].slug}`} key={quartoQuinto[0].id} className="grupo-4">
                {quartoQuinto[0].imagemHeader && (
                  <img src={quartoQuinto[0].imagemHeader} alt={quartoQuinto[0].titulo} />
                )}
                <h4>{truncateText(quartoQuinto[0].titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                <p className="descrição-s2">
                  {truncateText(quartoQuinto[0].resumo || '', DISPLAY_LIMITS.resumo.card)}
                </p>
                <p className="data" id="data4">{formatDate(quartoQuinto[0].criadoEm, quartoQuinto[0].atualizadoEm)}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                  <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="#000" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}

            {/* GRUPO 5 */}
            {quartoQuinto[1] && (
              <Link href={`/artigo/${quartoQuinto[1].slug}`} key={quartoQuinto[1].id} className="grupo-5">
                <p id="descri" className="descrição-s2">
                  {truncateText(quartoQuinto[1].resumo || '', DISPLAY_LIMITS.resumo.card)}
                </p>
                <div className="Cartegorias-grupo5">
                  {quartoQuinto[1].ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                    <p key={at.tagId}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  ))}
                </div>
                {quartoQuinto[1].imagemHeader && (
                  <img src={quartoQuinto[1].imagemHeader} alt={quartoQuinto[1].titulo} />
                )}
                <p className="data" id="data5">{formatDate(quartoQuinto[1].criadoEm, quartoQuinto[1].atualizadoEm)}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                  <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                <h4>{truncateText(quartoQuinto[1].titulo, DISPLAY_LIMITS.titulo.destaque)}</h4>
              </Link>
            )}

            {/* GRUPO 6 (se houver um terceiro artigo na seção2) */}
            {artigoGrande && (
              <Link href={`/artigo/${artigoGrande.slug}`} key={artigoGrande.id} className="grupo-4">
                {artigoGrande.imagemHeader && (
                  <img src={artigoGrande.imagemHeader} alt={artigoGrande.titulo} />
                )}
                <h4>{truncateText(artigoGrande.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                <p className="descrição-s2">
                  {truncateText(artigoGrande.resumo || '', DISPLAY_LIMITS.resumo.card)}
                </p>
                <p className="data" id="data4">{formatDate(artigoGrande.criadoEm, artigoGrande.atualizadoEm)}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                  <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="#000" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}
            
            <img src="/images/artigo-geral/gloss.png" alt="Gloss" id="mulher-gloss" />
          </div>
 <img id="linha" src="/images/artigo-geral/linha.png" alt="" />

          {/* LINHAS DE ARTIGOS QUADRUPLOS */}
          {gruposQuadruplos.length > 0 && (
            <>
              <div className="grupos-linha1">
                {gruposQuadruplos.slice(0, 4).map((artigo) => (
                  <Link href={`/artigo/${artigo.slug}`} key={artigo.id}>
                    {artigo.imagemHeader && (
                      <img src={artigo.imagemHeader} alt={artigo.titulo} />
                    )}
                    <p className="data-linha">{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                    <svg className="save-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                      <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                    <h4 className="h4-linha">
                      {truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}
                    </h4>
                    <p className="descrição-linha">
                      {truncateText(artigo.resumo || '', DISPLAY_LIMITS.resumo.card)}
                    </p>
                    <div className="Cartegorias-linha">
                      {artigo.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                        <p key={at.tagId}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>

              {gruposQuadruplos.length > 4 && (
                <div className="grupos-linha2">
                  {gruposQuadruplos.slice(4, 8).map((artigo) => (
                    <Link href={`/artigo/${artigo.slug}`} key={artigo.id}>
                      {artigo.imagemHeader && (
                        <img src={artigo.imagemHeader} alt={artigo.titulo} />
                      )}
                      <p className="data-linha">{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                      <svg className="save-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                        <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                      </svg>
                      <h4 className="h4-linha">
                        {truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}
                      </h4>
                      <p className="descrição-linha">
                        {truncateText(artigo.resumo || '', DISPLAY_LIMITS.resumo.card)}
                      </p>
                      <div className="Cartegorias-linha">
                        {artigo.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                          <p key={at.tagId}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

       <section className="cronograma-capilar">
            <img src="/images/artigo-geral/img cronograma capilar.png" alt="Mulher com cabelo cacheado" />
            <h5> Voce já fez o seu cronograma capilar?</h5>
            <button>
                <p>CRONOGRAMA</p>
            </button>
        </section>

          {/* SEÇÃO 3 - Últimos Artigos em Layout Especial */}
          {ultimosArtigos.length > 0 && (
            <div className="seção3">
              <Link href={`/artigo/${ultimosArtigos[0]?.slug}`} className="grupo-6">
                <p id="datas3">{formatDate(ultimosArtigos[0]?.criadoEm, ultimosArtigos[0]?.atualizadoEm)}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                  <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                <h4>{truncateText(ultimosArtigos[0]?.titulo, DISPLAY_LIMITS.titulo.destaque)}</h4>
                <div className="Cartegorias-g6">
                  {ultimosArtigos[0]?.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                    <p key={at.tagId}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                  ))}
                </div>
              </Link>

              <div className="linha1">
                {ultimosArtigos.slice(1, 3).map((artigo) => (
                  <Link href={`/artigo/${artigo.slug}`} key={artigo.id} className="grupo-7">
                    {artigo.imagemHeader && (
                      <img src={artigo.imagemHeader} alt={artigo.titulo} />
                    )}
                    <p className="datag7">{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                      <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                    <h4>{truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                    <div className="Cartegorias-g7">
                      {artigo.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                        <p key={at.tagId}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>

              {ultimosArtigos.length > 3 && (
                <div className="linha2">
                  {ultimosArtigos.slice(3, 5).map((artigo) => (
                    <Link href={`/artigo/${artigo.slug}`} key={artigo.id} className="grupo-7">
                      {artigo.imagemHeader && (
                        <img src={artigo.imagemHeader} alt={artigo.titulo} />
                      )}
                      <p className="datag7">{formatDate(artigo.criadoEm, artigo.atualizadoEm)}</p>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 22" fill="none">
                        <path d="M1 1V21L8 16.4545L15 21V1H1Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                      </svg>
                      <h4>{truncateText(artigo.titulo, DISPLAY_LIMITS.titulo.card)}</h4>
                      <div className="Cartegorias-g7">
                        {artigo.ArtigoTag.slice(0, DISPLAY_LIMITS.tags.max).map((at) => (
                          <p key={at.tagId}>{truncateTag(at.Tag.nome, DISPLAY_LIMITS.tags.maxLength)}</p>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
  );
}