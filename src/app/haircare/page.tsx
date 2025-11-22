"use client";

import React from 'react';
import Link from "next/link";
import Script from 'next/script';
import { Header, Footer } from "@/components";
import styles from '@/styles/hair-care.module.css';
import { useState } from "react";
// --- IMPORTAÇÕES PARA O SWIPER ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Importar os estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// --- FIM DAS IMPORTAÇÕES ---

const HairCarePage: React.FC = () => {

  const carouselImages = [
    "/images/hair-care/corte-pixie.png",
    "/images/hair-care/wolfcut.png",
    "/images/hair-care/social.png",
    "/images/hair-care/camadas-borboleta.png",
    "/images/hair-care/americano.png",
    "images/hair-care/low-fade.png"
  ];

  return (
    <>
    <Header/>
    <div className={styles.wrapper}>

    
    <main>
      <section className={styles.barra}>
        <div className={styles.aaa}>
          <article>
            <h1 className={styles.asM}>AS MELHORES DICAS PARA SEU CABELO</h1>

          </article>
          <aside className={styles.grupoRetangulos}>
            <div className={styles.retanguloItem}>cortes</div>
            <div className={styles.retanguloItem}>penteados</div>
            <div className={styles.retanguloItem}>tratamentos</div>
            <div className={styles.retanguloItem}>pinturas</div>
          </aside>
        </div>
        <img src="/images/hair-care/image_47-removebg-preview.png" alt="" className={styles.img47} />
      </section>

      <section className={styles.containerImagens}>
        <article className={styles.grupoImg}>
          <img src="/images/hair-care/Rectangle 350.png" alt="" />
          <aside className={styles.imgComBotao}>
            <img className={styles.img352} src="/images/hair-care/Rectangle 352.png" alt="" />
            <button className={styles.bntRoxo}><Link href='/tinturas'>CONHEÇA</Link></button>
          </aside>
          <img src="/images/hair-care/Rectangle 351.png" alt="" />
        </article>
      </section>

      <h3 className={styles.nossosTutoriais}>Nossos tutoriais</h3>

      <section className={styles.containerRetangulos}>
        <article className={styles.retanguloRoxo}>
          <div className={styles.circuloRoxo}></div>
          <h1 className={styles.tranca}>TRANÇA EMBUTIDA</h1>
          <ol className={styles.listaTraca}>
            <li>Separe uma mecha no topo da cabeça e a divida em três partes iguais</li>
            <li>Comece trançando a lateral esquerda por cima da mecha do meio e depois repita...</li>
          </ol>
        </article>

        <article className={styles.retanguloRoxo}>
          <div className={styles.circuloRoxo}></div>
          <h1 className={styles.coques}>COQUES</h1>
          <ol className={styles.listaCoques}>
            <li>Reúna todo o cabelo no topo da cabeça;</li>
            <li>Use a escova para pentear e deixar os fios bem esticados;</li>
            <li>Amarre com uma xuxinha;</li>
          </ol>
        </article>

        <article className={styles.retanguloRoxo}>
          <div className={styles.circuloRoxo}></div>
          <h1 className={styles.festivos}>FESTIVOS</h1>
          <p className={styles.listaFestivos}>Antes de escolher um penteado, é importante considerar o tipo de evento que você vai participar. Para eventos mais formais, como casamentos e formaturas, penteados mais elaborados e sofisticados...</p>
        </article>
      </section>

      {/* --- Seção barra2 COM CARROSSEL SIMPLES --- */}
        <section className={styles.barra2}>
          <div className={styles.content}>
            <article className={styles.texto}>
              <h1 className={styles.nossosCortes}>NOSSOS CORTES MAIS ACESSADOS</h1>
              <p className={styles.osCortes}>
                Os cortes para cabelos cacheados estão dominando as
                tendências! Com opções que valorizam o volume e o movimento
                natural dos fios, esses estilos são pura expressão de personalidade e
                autenticidade. Dos mais clássicos aos ousados, há um visual perfeito
                para cada estilo. <br />
                Quer dar um upgrade no look e descobrir os cortes que estão em
                alta? Aqui, você encontra inspirações incríveis e dicas essenciais
                para manter o cabelo sempre impecável. Prontos para se jogar
                nessa? Vamos explorar!
              </p>
            </article>

            {/* --- CARROSSEL SWIPER SIMPLES --- */}
            <div className={styles.imgBarra2CarouselContainer}>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                className={styles.simpleHairCareSwiper}
                >
                {carouselImages.map((src, index) => (
                  <SwiperSlide key={index}>
                    <img src={src} alt={`Imagem do carrossel ${index + 1}`} className={styles.simpleCarouselImage} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* --- FIM DO CARROSSEL --- */}
          </div>
        </section>

      <section className={styles.container}>
        <div className={styles.dupla}>
          <div className={styles.dupla2}>
            <article className={styles.item}>
              <img src="/images/hair-care/image.png" alt="Imagem 1" className={styles.imagem} />
            </article>
            <h1>SKINCARE</h1>
              <button className={styles.botaoMarrom}>conheça</button>
          </div>

          <div className={styles.dupla2}>
            <article className={styles.item}>
              <img src="/images/hair-care/image (1).png" alt="Imagem 2" className={styles.imagem} />

            </article>
                  <h1>TINTURAS</h1>
              <button className={styles.botaoMarrom}>conheça</button>
          </div>
        </div>

        <div className={styles.dupla}>
          <div className={styles.dupla2}>
            <article className={styles.item}>
              <img src="/images/hair-care/image (2).png" alt="Imagem 3" className={styles.imagem} />

            </article>
            <h1>CORTES</h1>
              <Link href="/corteS">
                <button className={styles.botaoMarrom}>conheça</button>
              </Link>
          </div>

          <div className={styles.dupla2}>
            <article className={styles.item}>
              <img src="/images/hair-care/image (3).png" alt="Imagem 4" className={styles.imagem} />

            </article>
            <h1>CRONOGRAMA</h1>
              <button className={styles.botaoMarrom}>conheça</button>
          </div>
        </div>
      </section>
      <section className={styles.container2}>
        <aside className={styles.dimg}>
          <img src="/images/hair-care/image (4).png" alt="Imagem do óleo de rosa mosqueta" className={styles.oleo} />
          <img src="/images/hair-care/image (5).png" alt="Imagem do creme de rosa mosqueta" className={styles.creme} />
        </aside>

        <article className={styles.texto}>
          <h2 className={styles.th2}>
            Benefícios do Óleo de Rosa Mosqueta: <br />
            Aliado para a pele, cabelo e unhas
          </h2>
            <p className={styles.tp}>
            O óleo de rosa mosqueta oferece propriedades antioxidantes e ajuda a evitar o envelhecimento precoce. "Além disso, também age na manutenção da integridade e na regeneração da pele". <br /> Dessa forma, o ativo pode ser um grande aliado para a cicatrização e para a <u>melhora de inflamações</u>. <br />
            "Todos podem usar e sentir os benefícios do óleo de rosa mosqueta. Pode ser que pessoas com a <u>pele oleosa</u> não se sintam tão confortáveis com o sensorial do produto, porém ele não aumenta a oleosidade ou piora a acne, então, pode ser usado tranquilamente, mas é claro que sem excessos".
            </p>
          <button className={styles.botaoRoxo}><Link href='/artigo/oleo-de-rosa-mosqueta'>CONHEÇA</Link></button>
        </article>
      </section>
      
      {/* Carrega o script da pasta /public de forma otimizada */}
      <Script src="/Hair-care.js" strategy="lazyOnload" />
    </main>
    
       </div>
       <Footer/> 
</>
  );
};

export default HairCarePage;