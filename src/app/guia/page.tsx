"use client";

import { Header, Footer } from "@/components";
import { useState, useRef } from "react";

import Link from "next/link";

import styles from "@/styles/guia.module.css";

export default function Guia() {
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    const links = sectionRef.current?.querySelectorAll('a');

    if (!links) return;

    links.forEach(link => {
      // Procura o título e a descrição dentro do link
      const title = link.querySelector('h1')?.textContent?.toLowerCase() || '';
      const description = link.querySelector('p')?.textContent?.toLowerCase() || '';
      const searchLower = term.toLowerCase();

      // Verifica se o termo de busca corresponde ao título ou à descrição
      if (title.includes(searchLower) || description.includes(searchLower)) {
        // Mostra o link (e o card dentro dele)
        link.style.display = 'flex';
        link.style.opacity = '1';
        link.style.transform = 'scale(1)';
      } else {
        // Esconde o link se não houver correspondência
        link.style.display = 'none';
      }
    });
  };

  return (
    <>
    <Header />
    <div className={styles.wrapper}>
      <section className={styles.sectionHeader}>
        <h1 className={styles.sectionHeaderH1}>Guia do site</h1>
        <p className={styles.sectionHeaderP}>Seu caminho para descobrir produtos, artigos e muito mais!</p>
      </section>

      <main className={styles.main}>
        <section className={styles.s1}>
          <div className={styles.guia}>
            <Link href='' className={styles.guiaLink}>
              <div className={styles.guiaLinkDiv}>
                <h1 className={styles.guiaLinkH1}>Páginas</h1>
                <img src="images/guia/seta-baixo.svg" alt="seta" className={styles.guiaLinkImg} />
              </div>
            </Link>

            <Link href='/produtos' className={styles.guiaLink}>
              <div className={styles.guiaLinkDiv}>
                <h1 className={styles.guiaLinkH1}>Produtos</h1>
                <img src="images/guia/seta-lado.svg" alt="seta" className={styles.guiaLinkImg} />
              </div>
            </Link>

            <Link href='/artigos' className={styles.guiaLink}>
              <div className={styles.guiaLinkDiv}>
                <h1 className={styles.guiaLinkH1}>Artigos</h1>
                <img src="images/guia/seta-lado.svg" alt="seta" className={styles.guiaLinkImg} />
              </div>
            </Link>
          </div>
          <div className={styles.linha}></div>

          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput} 
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className={styles.searchIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>
        </section>

        <section className={styles.s2} ref={sectionRef}>
          <Link href='/alimentacao' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag1-alimentacao.png" alt="" className={styles.pagImg} />
              <div className={styles.pag1}>
                <h1 className={styles.pag1H1}>ALIMENTAÇÃO</h1>
                <p className={styles.pag1P}>Conteúdos práticos sobre como a nutrição influencia corpo, pele e cabelo. Dicas simples para manter saúde e beleza em equilíbrio no dia a dia.</p>
              </div>
            </div>
          </Link>

          <Link href='/cortes-geral' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag2-cortes.png" alt="" className={styles.pagImg} />
              <div className={styles.pag2}>
                <h1 className={styles.pag2H1}>CORTES</h1>
                <p className={styles.pag2P}>Inspire-se com estilos de cortes variados para valorizar sua identidade e realçar sua beleza. Sugestões modernas, clássicas e práticas para diferentes tipos de cabelo.</p>
              </div>
            </div>
          </Link>

          <Link href='/central-ajuda' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag3-ajuda.png" alt="" className={styles.pagImg} />
              <div className={styles.pag2}>
                <h1 className={styles.pag2H1}>CENTRAL DE AJUDA</h1>
                <p className={styles.pag2P}>Encontre respostas rápidas para suas dúvidas. Suporte simples e direto para facilitar sua experiência no site e no cuidado com sua beleza.</p>
              </div>
            </div>
          </Link>

          <Link href='/cronograma-capilar' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag4-cronograma.png" alt="" className={styles.pagImg} />
              <div className={styles.pag1}>
                <h1 className={styles.pag1H1}>CRONOGRAMA CAPILAR</h1>
                <p className={styles.pag1P}>Aprenda a organizar os cuidados com hidratação, nutrição e reconstrução. Um guia prático para manter seus fios sempre fortes, saudáveis e cheios de vida.</p>
              </div>
            </div>
          </Link>

          <Link href='/favoritos' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag5-favoritos.png" alt="" className={styles.pagImg} />
              <div className={styles.pag1}>
                <h1 className={styles.pag1H1}>FAVORITOS</h1>
                <p className={styles.pag1P}>Salve seus produtos e conteúdos preferidos em um só lugar. Facilite suas escolhas e retorne rapidamente ao que mais combina com você.</p>
              </div>
            </div>
          </Link>

          <Link href='/haircare' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag6-haircare.png" alt="" className={styles.pagImg} />
              <div className={styles.pag2}>
                <h1 className={styles.pag2H1}>HAIRCARE</h1>
                <p className={styles.pag2P}>Aprenda a cuidar da sua coroa! Aqui você encontra as melhores dicas de hidratação, nutrição e finalização para realçar a beleza única dos seus cabelos crespos e cacheados.</p>
              </div>
            </div>
          </Link>

          <Link href='/infantil' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag7-infantil.png" alt="" className={styles.pagImg} />
              <div className={styles.pag2}>
                <h1 className={styles.pag2H1}>INFANTIL</h1>
                <p className={styles.pag2P}>O cuidado que começa no berço. Dicas e rotinas para cuidar dos cabelos e da pele das crianças, fortalecendo a autoestima e o amor por sua identidade desde cedo.</p>
              </div>
            </div>
          </Link>

          <Link href='/meuperfil-before' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag8-perfil.png" alt="" className={styles.pagImg} />
              <div className={styles.pag1}>
                <h1 className={styles.pag1H1}>MEU PERFIL</h1>
                <p className={styles.pag1P}>Crie seu perfil de beleza! Salve as informações do seu cabelo e pele para receber recomendações de produtos e dicas personalizadas, feitas especialmente para as suas necessidades.</p>
              </div>
            </div>
          </Link>

          <Link href='/parcerias-empresas' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag9-parceria.png" alt="" className={styles.pagImg} />
              <div className={styles.pag1}>
                <h1 className={styles.pag1H1}>PARCERIA</h1>
                <p className={styles.pag1P}>Acreditamos no poder da união! Se sua marca ou trabalho tem como missão exaltar a beleza negra, queremos nos conectar. Conheça nossas oportunidades e vamos crescer juntos.</p>
              </div>
            </div>
          </Link>

          <Link href='/skincare' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag10-skincare.png" alt="" className={styles.pagImg} />
              <div className={styles.pag2}>
                <h1 className={styles.pag2H1}>SKINCARE</h1>
                <p className={styles.pag2P}>Construa a rotina de cuidados ideal para você. Explore dicas de limpeza, hidratação e proteção para conquistar uma pele visivelmente mais saudável, luminosa e cheia de vida.</p>
              </div>
            </div>
          </Link>

          <Link href='/tinturas' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag11-tinturas.png" alt="" className={styles.pagImg} />
              <div className={styles.pag2}>
                <h1 className={styles.pag2H1}>TINTURAS</h1>
                <p className={styles.pag2P}>Quer mudar a cor dos fios sem medo? Descubra técnicas de coloração e inspirações para cabelos crespos e cacheados, aprendendo a manter o visual vibrante com a saúde capilar em dia.</p>
              </div>
            </div>
          </Link>

          <Link href='/tendencias' className={styles.s2Link}>
            <div className={styles.pag}>
              <img src="images/guia/pag12-tendencias.png" alt="" className={styles.pagImg} />
              <div className={styles.pag1}>
                <h1 className={styles.pag1H1}>TENDÊNCIAS</h1>
                <p className={styles.pag1P}>Fique por dentro das últimas tendências em beleza e cuidados capilares. Descubra o que está em alta e como adaptar as novidades ao seu estilo pessoal.</p>
              </div>
            </div>
          </Link>
        </section>
      </main>
      </div>
      <Footer /> 
      </>
  );

}
