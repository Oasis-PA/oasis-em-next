"use client";

import { Header, Footer } from "@/components";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/tinturas.module.css";

export default function Tinturas() {
  return (
    <div className={styles.pageTinturasWrapper}>
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className={styles.representam}>
          <h1>Cores que Representam</h1>
          <h5>
            Tinturas pensadas para realçar a sua beleza única — com tons
            vibrantes, profundos e que respeitam sua identidade.
          </h5>
        </section>

        {/* SECTION S1 - TIPOS DE TINTURA */}
        <section className={styles.s1}>
          <h1>Tipos de Tintura para Cabelos</h1>
          <div className={styles.tipos}>
            {/* CARD 1 */}
            <div className={`${styles.cardItem} ${styles.card1}`}>
              <div className={styles.conteudo}>
                <h1>TINTURA <br />TEMPORÁRIA</h1>
                <p>
                  É uma coloração que age só na parte externa do fio e sai com
                  poucas lavagens (1 a 3). Ideal para mudanças rápidas, como em
                  festas ou testes de cor. Não contém amônia e não danifica o
                  cabelo. Funciona melhor em cabelos claros ou descoloridos.
                </p>
              </div>
              <Image 
                className={styles.numeros} 
                src="/images/tinturas/1.png" 
                alt="Número 1"
                width={50} 
                height={50} 
              />
            </div>

            {/* CARD 2 */}
            <div className={`${styles.cardItem} ${styles.card2}`}>
              <div className={styles.conteudo}>
                <h1>TINGIMENTO <br />NATURAL</h1>
                <p>
                  Usa ingredientes naturais, como henna, chá preto ou casca de
                  noz. É menos agressivo e mais ecológico, mas tem cores
                  limitadas e resultados que variam conforme o tom natural do
                  cabelo. Pode durar algumas semanas.
                </p>
                <Image 
                  className={styles.numeros} 
                  src="/images/tinturas/2.png" 
                  alt="Número 2"
                  width={50} 
                  height={50} 
                />
              </div>
            </div>

            {/* CARD 3 */}
            <div className={`${styles.cardItem} ${styles.card3}`}>
              <div className={styles.conteudo}>
                <h1>TINTURA SEMI-<br />PERMANENTE</h1>
                <p>
                  Penetra levemente no fio e dura entre 6 a 12 lavagens. Não tem
                  amônia, não clareia os fios e é boa para realçar tons,
                  escurecer ou dar brilho. Ideal para quem quer mudar a cor sem
                  danificar muito o cabelo.
                </p>
                <Image 
                  className={styles.numeros} 
                  src="/images/tinturas/3.png" 
                  alt="Número 3"
                  width={50} 
                  height={50} 
                />
              </div>
            </div>

            {/* CARD 4 */}
            <div className={`${styles.cardItem} ${styles.card4}`}>
              <div className={styles.conteudo}>
                <h1>TINTURA <br />PERMANENTE</h1>
                <p>
                  Altera a estrutura do fio com amônia e oxidantes, permitindo
                  uma mudança duradoura. Pode clarear, escurecer e cobre 100%
                  dos fios brancos. Exige retoque da raiz a cada poucas semanas.
                  É a mais eficaz, mas também a mais agressiva.
                </p>
                <Image 
                  className={styles.numeros} 
                  src="/images/tinturas/4.png" 
                  alt="Número 4"
                  width={50} 
                  height={50} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- SEÇÃO S2 (ESTILO REVISTA) --- */}
        <section className={styles.s2}>
          {/* Card Esquerda: Imagem Cheia */}
          <Link href="artigo/10-tons-fantasticos" className={styles.cardLinkWrapper}>
            <div className={styles.artigo1}>
              <div className={styles.tagsWrapper}>
                 <span className={styles.pillTag}>Moda</span>
                 <span className={styles.pillTag}>Marcas</span>
              </div>
              <h1>10 TONS FANTÁSTICOS PARA SAIR DO BÁSICO</h1>
            </div>
          </Link>

          {/* Card Direita: Card Branco "Sugestão" */}
          <div className={styles.artigo2}>
            <div className={styles.cardHeaderRow}>
                <Image
                  src="/images/tinturas/oasis-logo.png"
                  alt="Oasis Logo"
                  width={65}
                  height={40}
                  className={styles.oasisLogo}
                />
                <button className={styles.tagSugestao} type="button">SUGESTÃO</button>
            </div>
            
            <div className={styles.imageContainerS2}>
                 <Image 
                    src="/images/tinturas/foto-sugestao.png"
                    alt="Destaque Sugestão"
                    width={500}
                    height={300}
                    style={{objectFit: "cover", width: "100%", height: "100%"}}
                 />
            </div>
            <div className={styles.linhaWrapper}>
              <Image
                src="/images/tinturas/linha.png"
                alt="Linha decorativa"
                width={1200}
                height={2}
                style={{ objectFit: "contain", width: "100%", height: "auto" }}
                className={styles.linhaImg}
                priority
              />
            </div>
            <p>
              Descubra como equilibrar tintura e tratamento no seu cronograma
              capilar. Devolva brilho, força e vida aos cabelos coloridos!
            </p>
          </div>
        </section>

        {/* --- SEÇÃO S3 (BANNERS HORIZONTAIS) --- */}
        <section className={styles.s3}>
          <Link href="artigo/nago-colorida" className={styles.bannerLink}>
            <div className={`${styles.bannerItem} ${styles.artigo3}`}>
               <div className={`${styles.bannerContent} ${styles.rightAlign}`}>
                  <h1>NAGO COLORIDA: <br />15 ESTILOS DIFERENTES</h1>
                  <div className={styles.tagsWrapper}>
                    <span className={styles.pillTag}>Moda</span>
                    <span className={styles.pillTag}>Marcas</span>
                  </div>
               </div>
            </div>
          </Link>

          <Link href="artigo/produtos-indispensaveis" className={styles.bannerLink}>
            <div className={`${styles.bannerItem} ${styles.artigo4}`}>
               <div className={`${styles.bannerContent} ${styles.leftAlign}`}>
                  <h1>PRODUTOS INDISPENSÁVEIS PARA CABELOS PINTADOS</h1>
                  <div className={styles.tagsWrapper}>
                    <span className={styles.pillTag}>Moda</span>
                    <span className={styles.pillTag}>Marcas</span>
                  </div>
               </div>
            </div>
          </Link>
        </section>

        <div className={styles.linha}></div>

        {/* --- SEÇÃO S4 (ARTIGOS EM ALTA - GRID) --- */}
        <section className={styles.s4}>
          <h1>ARTIGOS EM ALTA</h1>
          
          <div className={styles.s4Grid}>
            
            <Link href="artigo/cuidados-noturnos" className={styles.gridItem}>
              <div className={`${styles.cardS4} ${styles.artigo5}`}>
                <h1>Cuidados noturnos para cabelo e pele</h1>
              </div>
            </Link>

            <Link href="artigo/transicao-capilar" className={styles.gridItem}>
              <div className={`${styles.cardS4} ${styles.artigo6}`}>
                <h1>Transição capilar: primeiros cuidados essenciais</h1>
              </div>
            </Link>

            <Link href="artigo/acidificacao-no-cabelo" className={styles.gridItem}>
              <div className={`${styles.cardS4} ${styles.artigo7}`}>
                <h1>Acidificação capilar</h1>
              </div>
            </Link>

            <Link href="artigo/protetor-solar-para-peles-retintas" className={styles.gridItem}>
              <div className={`${styles.cardS4} ${styles.artigo8}`}>
                <h1>Protetor solar para pele retinta</h1>
              </div>
            </Link>

            {/* O Botão fica no meio na versão Desktop */}
            <Link href="/artigos-geral" className={`${styles.gridItem} ${styles.buttonWrapper}`}>
                <button className={styles.botaoS4}>VER MAIS</button>
            </Link>

            <Link href="artigo/como-fazer-waves" className={styles.gridItem}>
              <div className={`${styles.cardS4} ${styles.artigo9}`}>
                <h1>Como fazer waves?</h1>
              </div>
            </Link>
            
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}