import React from 'react';
import Link from 'next/link';
import { prisma } from "@/lib/prisma"; // Certifique-se que o caminho está correto
import { Header, Footer } from "@/components";
import styles from '@/styles/cortes-geral.module.css';

export const dynamic = 'force-dynamic'; // Garante que a página atualize se houver novos cortes

export default async function CorteGeral() {
  // Busca os cortes no banco de dados
  const cortes = await prisma.cortes.findMany({
    where: { status: "publicado" },
    select: {
      id: true,
      nome: true,
      slug: true,
      imagem_principal: true,
    },
    orderBy: { criadoEm: "desc" },
  });

  return (
    <div className={styles.wrapper}>
      <Header/>
      
      {/* Seção Hero / Busca */}
      <section className={styles.voceProcura}>
        <img src="/images/cortes-geral/temos.png" alt="" />
        <div className={styles.textoProcura}>
          <h1 className={styles.temos}>Temos o que voce procura</h1>
          <p className={styles.mudarVisual}>
            Deseja mudar o visual mas não sabe o que fazer? Te apresentamos as melhores inspirações a seguir
          </p>
        </div>
      </section>

        {/* ======================================================= */}
        {/* NOVA SEÇÃO: LISTAGEM DE CORTES DO BANCO DE DADOS        */}
        {/* ======================================================= */}
        
        <section className={styles.sectionTodosCortes}>
          <h1 className={styles.h1MelhoresCortes} style={{ marginTop: '100px', marginBottom: '60px' }}>
            Nossa Galeria
          </h1>
          
          {cortes.length > 0 ? (
            <div className={styles.gridCortes}>
              {cortes.map((corte) => (
                <Link href={`/corte/${corte.slug}`} key={corte.id} className={styles.cardCorte}>
                  <div className={styles.cardCorteImagemWrapper}>
                    {corte.imagem_principal ? (
                      <img 
                        src={corte.imagem_principal} 
                        alt={corte.nome} 
                        className={styles.cardCorteImg}
                      />
                    ) : (
                      <div className={styles.cardCortePlaceholder}>Sem Imagem</div>
                    )}
                  </div>
                  <div className={styles.cardCorteContent}>
                    <h2 className={styles.cardCorteTitulo}>{corte.nome}</h2>
                    {/* A classe aqui mudou para aplicar o estilo novo */}
                    <span className={styles.cardCorteButton}>
                      VER DETALHES
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Container para centralizar perfeitamente o texto quando vazio */
            <div className={styles.emptyStateContainer}>
              <p className={styles.p2} style={{ margin: 0 }}>
                Nenhum corte registrado no momento.
              </p>
            </div>
          )}
        </section>

        <main className={styles.container}>
        
        {/* Título Principal */}
        <h1 className={styles.h1MelhoresCortes}>Melhores Cortes</h1>
        <p className={styles.p1}>
          Para aqueles que desejam mudar a aparência e só<br className={styles.desktopOnly} /> precisam de uma inspiração.
        </p>
        
        {/* Artigo 1 */}
        <section className={styles.sectionArtigos}>   
          <img src="/images/cortes-geral/imagem-artigo1.png" alt="imagem-artigo1" />
          <div className={styles.divArtigo}>
            <h1 className={styles.h1TituloArtigo}>
              Melhores tipos de <br className={styles.desktopOnly}/>finalização
            </h1>
            <p className={styles.p2}>
              Quer finalizar seus cachos como uma profissional? 
              Invista em você! Clique abaixo e descubra as melhores 
              técnicas de finalização que deixam os cabelos definidos, 
              soltos e lindos por muito mais tempo!
            </p>
            <Link href='artigo/melhores-tipos-de-finalizacao' className={styles.button1}>
             DESCUBRA
            </Link>
          </div>
        </section>
        
        {/* Artigo 2 */}
        <section className={styles.sectionArtigos}>
          <div className={styles.divArtigo2}>
            <h1 className={styles.h1TituloArtigo}>
              Cabelos masculinos crespos: <br className={styles.desktopOnly} />guia completo de cuidados
            </h1>
            <p className={styles.p2}>
             Está cansado de cabelos ressecados e sem forma? Invista em você! 
             Clique abaixo e descubra o guia completo para cabelos crespos 
             masculinos, com cuidados, produtos e técnicas para fios impecáveis!
            </p>
            <Link href='artigo/cabelos-masculinos-crespos' className={styles.button1}>
            DESCUBRA
            </Link>
          </div>
          <img src="/images/cortes-geral/imagem-artigo2.png" alt="imagem-artigo2" />
        </section>

        {/* Artigo 3 */}
        <section className={styles.sectionArtigos}>
          <img src="/images/cortes-geral/imagem-artigo3.png" alt="imagem-artigo3" />
          <div className={styles.divArtigo}>
            <h1 className={styles.h1TituloArtigo}>
              Cortes que valorizam <br className={styles.desktopOnly} />o rosto redondo
            </h1>
            <p className={styles.p2}>
             Não sabe qual corte combina com seu rosto? Invista em você! Clique abaixo 
             e descubra os cortes que valorizam o rosto redondo, alongam o visual e realçam 
             sua beleza natural. Transformação garantida!
            </p>
            <Link href='artigo/cortes-que-valorizam-o-rosto-redondo' className={styles.button1}>
            DESCUBRA
            </Link>
          </div>
        </section>
        
      </main>
      <Footer/>
    </div>
  );
}