"use client";

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/page.module.css';

const slidesData = [
  {
    h2: "Tratamentos inovadores",
    h1: "CUIDADO SEM LIMITES",
    backgroundImage: "/images/tela-principal/banner1.png",
    link: "/cronograma-capilar"
  },
  {
    h2: "Descubra seu melhor visual",
    h1: "REINVENTE SEU ESTILO",
    backgroundImage: "/images/tela-principal/banner2.png",
    link: "/haircare"
  },
  {
    h2: "O melhor de uma pele renovada",
    h1: "BELEZA QUE EMPODERA",
    backgroundImage: "/images/tela-principal/banner3.png",
    link: "/skincare"
  }
];

const cortesData = {
  feminino: [
    { title: 'CORTE PIXIE', image: '/images/tela-principal/img-corte (1).png', link: '/corte-modelo' },
    { title: 'WOLFCUT', image: '/images/tela-principal/img-corte (2).png', link: '/corte-modelo' },
    { title: 'FRANJA', image: '/images/tela-principal/img-corte (3).png', link: '/corte-modelo' },
    { title: 'CAMADAS', image: '/images/tela-principal/img-corte (4).png', link: '/corte-modelo' },
  ],
  masculino: [
    { title: 'AMERICANO', image: '/images/tela-principal/img-corte (8).png', link: '/corte-modelo' },
    { title: 'LOW FADE', image: '/images/tela-principal/img-corte (7).png', link: '/corte-modelo' },
    { title: 'MULLET', image: '/images/tela-principal/img-corte (6).png', link: '/corte-modelo' },
    { title: 'SOCIAL', image: '/images/tela-principal/img-corte (5).png', link: '/corte-modelo' },
  ],
  mais50: [
    { title: 'BORBOLETA', image: '/images/tela-principal/img-corte (12).png', link: '/corte-modelo' },
    { title: 'CURTO', image: '/images/tela-principal/img-corte (11).png', link: '/corte-modelo' },
    { title: 'SOCIAL', image: '/images/tela-principal/img-corte (10).png', link: '/corte-modelo' },
    { title: 'BOB ANGULAR', image: '/images/tela-principal/img-corte (9).png', link: '/corte-modelo' },
  ]
};


export default function OasisHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<'feminino' | 'masculino' | 'mais50'>('feminino');


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slidesData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (cardsContainerRef.current) {
        const scrollLeft = cardsContainerRef.current.scrollLeft;
        const newOpacity = Math.max(0, 1 - (scrollLeft / 300));
        setTextOpacity(newOpacity);
      }
    };

    const cardsContainer = cardsContainerRef.current;
    if (cardsContainer) {
      cardsContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (cardsContainer) {
        cardsContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const currentCortes = cortesData[activeCategory];

  return (
    <>
      <main 
        className={styles.mainContainer} 
        style={{ backgroundImage: `url(${slidesData[currentSlide].backgroundImage})` }}
      >
        <h2>{slidesData[currentSlide].h2}</h2>
        <h1>{slidesData[currentSlide].h1}</h1>

        <Link 
          href={slidesData[currentSlide].link} 
          className={styles.conhecaButton}
        >
          CONHEÇA
        </Link>

        <div className={styles.dotsContainer}>
          {slidesData.map((_, index) => (
            <button 
              key={index} 
              onClick={() => handleDotClick(index)}
              className={styles.dotButton}
            >
              <Image 
                src={
                  currentSlide === index 
                    ? "/images/tela-principal/bolinha-marcada.svg" 
                    : "/images/tela-principal/bolinha-naomarcada.svg"
                } 
                alt={`Ir para o slide ${index + 1}`}
                width={20}
                height={20}
              />
            </button>
          ))}
        </div>
      </main>

      <section className={styles.s1}>
        <div className={styles.texttopics} style={{ opacity: textOpacity }}>
          <h1>HOT TOPICS</h1>
          <h2>Fique por dentro dos assuntos mais quentes de beleza! Descubra dicas, 
          tendências e tire suas dúvidas.</h2>
        </div>
        <div className={styles.cards} ref={cardsContainerRef}>
          <Link href="#">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-ex.png" alt="" />
              <p>Como fazer acidificação no cabelo? Confira dicas</p>
            </div>
          </Link>

          <Link href="#">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-ex.png" alt="" />
              <p>Como fazer acidificação no cabelo? Confira dicas</p>
            </div>
          </Link>

          <Link href="#">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-ex.png" alt="" />
              <p>Como fazer acidificação no cabelo? Confira dicas</p>
            </div>
          </Link>

          <Link href="#">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-ex.png" alt="" />
              <p>Como fazer acidificação no cabelo? Confira dicas</p>
            </div>
          </Link>

          <Link href="#">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-ex.png" alt="" />
              <p>Como fazer acidificação no cabelo? Confira dicas</p>
            </div>
          </Link>

          <Link href="#">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-ex.png" alt="" />
              <p>Como fazer acidificação no cabelo? Confira dicas</p>
            </div>
          </Link>

          <Link href="#">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-ex.png" alt="" />
              <p>Como fazer acidificação no cabelo? Confira dicas</p>
            </div>
          </Link>

          <Link href="#">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-ex.png" alt="" />
              <p>Como fazer acidificação no cabelo? Confira dicas</p>
            </div>
          </Link>
        </div>
      </section>

      <section className={styles.s2}>
        <Link href='#'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-haircare.png" alt=""/>
            <h1>HAIR CARE</h1>
          </div>
        </Link>

        <Link href='#'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-tendencias.png" alt=""/>
            <h1>TENDÊNCIAS</h1>
          </div>
        </Link>

        <Link href='#'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-skincare.png" alt=""/>
            <h1>SKINCARE</h1>
          </div>
        </Link>

        <Link href='#'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-tinturas.png" alt=""/>
            <h1>TINTURAS</h1>
          </div>
        </Link>

        <Link href='#'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-produtos.png" alt=""/>
            <h1>PRODUTOS</h1>
          </div>
        </Link>

        <Link href='#'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-alimentacao.png" alt=""/>
            <h1>ALIMENTAÇÃO</h1>
          </div>
        </Link>

        <Link href='#'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-infantil.png" alt=""/>
            <h1>INFANTIL</h1>
          </div>
        </Link>
      </section>

      <section className={styles.s3}>
        <h1>Cortes em Alta</h1>
        <p>As melhores recomendações de cortes de cabelos para todos os gêneros e idades</p>
        <div className={styles.linha}></div>
        
        <div className={styles.categ}>
          <button
            className={`${styles.categoryButton} ${activeCategory === 'feminino' ? styles.activeCategory : ''}`}
            onClick={() => setActiveCategory('feminino')}
          >
            FEMININO
          </button>
          <button
            className={`${styles.categoryButton} ${activeCategory === 'masculino' ? styles.activeCategory : ''}`}
            onClick={() => setActiveCategory('masculino')}
          >
            MASCULINO
          </button>
          <button
            className={`${styles.categoryButton} ${activeCategory === 'mais50' ? styles.activeCategory : ''}`}
            onClick={() => setActiveCategory('mais50')}
          >
            PARA QUEM É +50
          </button>
        </div>
        <div className={styles.linha2}></div>
        
        <div className={styles.cortes}>
          {currentCortes.map((corte, index) => (
            <div className={styles.cortecardconteiner} key={index}>
              <div className={styles.cortecard}>
                <h1>{corte.title}</h1>
                <img src={corte.image} alt={`Imagem do ${corte.title}`} />
              </div>
              <Link href={corte.link} className={styles.conhecaCorteButton}>
                CONHEÇA
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}