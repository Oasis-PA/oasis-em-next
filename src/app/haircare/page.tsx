"use client";

import React from 'react';
import Link from "next/link";
import Script from 'next/script'; 
import { Header, Footer } from "@/components";
import '@/styles/hair-care.css';
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
    "/images/hair-care/imagecach.png",
    "/images/hair-care/imageamrcn.png",
    "/images/hair-care/imagemld.png",
    "/images/hair-care/Rectangle361.png"
  ];

  return (
    <>
    <Header/>
    <main>
      <section className="retangulo" id="barra">
        <div className="aaa">
          <article id='as-melhores-dicas'>
            <h1 id="asM">AS MELHORES DICAS PARA SEU CABELO</h1>
          
          </article>
          <aside className="grupo-retangulos">
            <div className="retangulo-item">cortes</div>
            <div className="retangulo-item">penteados</div>
            <div className="retangulo-item">tratamentos</div>
            <div className="retangulo-item">pinturas</div>
          </aside>
        </div>
        <img src="/images/hair-care/image_47-removebg-preview.png" alt="" id="img47" />
      </section>

      <section className="container-imagens">
        <article className="grupo-img">
          <img id="img350" src="/images/hair-care/Rectangle 350.png" alt="" />
          <aside className="img-com-botao">
            <img id="img352" src="/images/hair-care/Rectangle 352.png" alt="" />
            <button id="bntRoxo"><Link href='/tinturas'>CONHEÇA</Link></button>
          </aside>
          <img id="img351" src="/images/hair-care/Rectangle 351.png" alt="" />
        </article>
      </section>

      <h3 id="nossosTutoriais">Nossos tutoriais</h3>

      <section className="container-retangulos">
        <article className="retangulo-roxo">
          <div className="circulo-roxo"></div>
          <h1 id="trança">TRANÇA EMBUTIDA</h1>
          <ol className="lista-tranca">
            <li>Separe uma mecha no topo da cabeça e a divida em três partes iguais</li>
            <li>Comece trançando a lateral esquerda por cima da mecha do meio e depois repita...</li>
          </ol>
        </article>

        <article className="retangulo-roxo">
          <div className="circulo-roxo"></div>
          <h1 id="coques">COQUES</h1>
          <ol className="lista-coques">
            <li>Reúna todo o cabelo no topo da cabeça;</li>
            <li>Use a escova para pentear e deixar os fios bem esticados;</li>
            <li>Amarre com uma xuxinha;</li>
          </ol>
        </article>

        <article className="retangulo-roxo">
          <div className="circulo-roxo"></div>
          <h1 id="festivos">FESTIVOS</h1>
          <p className="lista-festivos">Antes de escolher um penteado, é importante considerar o tipo de evento que você vai participar. Para eventos mais formais, como casamentos e formaturas, penteados mais elaborados e sofisticados...</p>
        </article>
      </section>

      {/* --- Seção #barra2 COM CARROSSEL SIMPLES --- */}
        <section id="barra2">
          <div className="content">
            <article className="texto">
              <h1 id="nossosCortes">NOSSOS CORTES MAIS ACESSADOS</h1>
              <p id="osCortes">
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
            <div className="imgBarra2-carousel-container">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10} // Espaço pequeno entre slides (relevante se houver mais de 1 visível)
                slidesPerView={1} // MOSTRAR APENAS 1 SLIDE POR VEZ
                navigation // Habilita setas
                pagination={{ clickable: true }} // Habilita bolinhas
                loop={true} // Habilita loop
                className="simpleHairCareSwiper" // Nova classe para estilização
              >
                {carouselImages.map((src, index) => (
                  <SwiperSlide key={index}>
                    <img src={src} alt={`Imagem do carrossel ${index + 1}`} className="simple-carousel-image" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* --- FIM DO CARROSSEL --- */}
          </div>
        </section>

      <section className="container">
        <article className="item">
          <img src="/images/hair-care/image.png" alt="Imagem 1" className="imagem" id="img1" />
          <h1>SKINCARE</h1>
          <button className="botao-marrom" id="b1">conheça</button>
        </article>
        
        <article className="item">
          <img src="/images/hair-care/image (1).png" alt="Imagem 2" className="imagem" id="img2" />
          <h1>TINTURAS</h1>
          <button className="botao-marrom" id="b2">conheça</button>
        </article>

        <article className="item">
          <img src="/images/hair-care/image (2).png" alt="Imagem 3" className="imagem" id="img3" />
          <h1>CORTES</h1>
          <Link href="/corteS">
            <button className="botao-marrom" id="b3">conheça</button>
          </Link>
        </article>

        <article className="item">
          <img src="/images/hair-care/image (3).png" alt="Imagem 4" className="imagem" id="img4" />
          <h1>CRONOGRAMA CAPILAR</h1>
          <button className="botao-marrom" id="b4">conheça</button>
        </article>
      </section>

      <section className="container2">
        <aside className="dimg">
          <img src="/images/hair-care/image (4).png" alt="Imagem do óleo de rosa mosqueta" className="imagem2" id="oleo" />
          <img src="/images/hair-care/image (5).png" alt="Imagem do creme de rosa mosqueta" className="imagem2" id="creme" />
        </aside>
        
        <article className="texto">
          <h2 id="th2">
            Benefícios do Óleo de Rosa Mosqueta: <br />
            Aliado para a pele, cabelo e unhas
          </h2>
            <p id="tp">
            O óleo de rosa mosqueta oferece propriedades antioxidantes e ajuda a evitar o envelhecimento precoce. "Além disso, também age na manutenção da integridade e na regeneração da pele". <br /> Dessa forma, o ativo pode ser um grande aliado para a cicatrização e para a <u>melhora de inflamações</u>. <br />
            “Todos podem usar e sentir os benefícios do óleo de rosa mosqueta. Pode ser que pessoas com a <u>pele oleosa</u> não se sintam tão confortáveis com o sensorial do produto, porém ele não aumenta a oleosidade ou piora a acne, então, pode ser usado tranquilamente, mas é claro que sem excessos”.
            </p>
          <button className="botao-roxo"><Link href='/artigo/oleo-de-rosa-mosqueta'>CONHEÇA</Link></button>
        </article>
      </section>
      
      {/* Carrega o script da pasta /public de forma otimizada */}
      <Script src="/Hair-care.js" strategy="lazyOnload" />
    </main>
    
    <Footer/>
  </>
  );
};

export default HairCarePage;