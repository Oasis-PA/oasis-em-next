"use client";

import { Header, Footer } from "@/components";
import { useState } from "react";

import Link from "next/link";

import "@/styles/guia.css";

export default function Guia() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    // Seleciona os links <a> dentro de #s2, que são os novos containers dos cards
    const links = document.querySelectorAll<HTMLElement>('#s2 > a');
    
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
      <section className="section-header">
        <h1>Guia do site</h1>
        <p>Seu caminho para descobrir produtos, artigos e muito mais!</p>
      </section>

      <main>
        <section id="s1">
          <div id="guia">
            <Link href=''>
              <div>
                <h1>Páginas</h1>
                <img src="images/guia/seta-baixo.svg" alt="seta" />
              </div>
            </Link>

            <Link href='/produtos'>
              <div>
                <h1>Produtos</h1>
                <img src="images/guia/seta-lado.svg" alt="seta" />
              </div>
            </Link>
            
            <Link href='/artigos-geral'>
              <div>
                <h1>Artigos</h1>
                <img src="images/guia/seta-lado.svg" alt="seta" />
              </div>
            </Link>
          </div>
          <div id="linha"></div>
          
          <div id="search-container">
            <input 
              type="text" 
              id="search-input"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div id="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>
        </section>

        <section id="s2">   
          <Link href='/alimentacao' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag1-alimentacao.png" alt="" />
              <div className="pag-1">
                <h1>ALIMENTAÇÃO</h1>
                <p>Conteúdos práticos sobre como a nutrição influencia corpo, pele e cabelo. Dicas simples para manter saúde e beleza em equilíbrio no dia a dia.</p>
              </div>
            </div>
          </Link>

          <Link href='/cortes-geral' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag2-cortes.png" alt="" />
              <div className="pag-2">
                <h1>CORTES</h1>
                <p>Inspire-se com estilos de cortes variados para valorizar sua identidade e realçar sua beleza. Sugestões modernas, clássicas e práticas para diferentes tipos de cabelo.</p>
              </div>
            </div>
          </Link>

          <Link href='/central-ajuda' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag3-ajuda.png" alt="" />
              <div className="pag-2">
                <h1>CENTRAL DE AJUDA</h1>
                <p>Encontre respostas rápidas para suas dúvidas. Suporte simples e direto para facilitar sua experiência no site e no cuidado com sua beleza.</p>
              </div>
            </div>
          </Link>

          <Link href='/cronograma-capilar' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag4-cronograma.png" alt="" />
              <div className="pag-1">
                <h1>CRONOGRAMA CAPILAR</h1>
                <p>Aprenda a organizar os cuidados com hidratação, nutrição e reconstrução. Um guia prático para manter seus fios sempre fortes, saudáveis e cheios de vida.</p>
              </div>
            </div>
          </Link>

          <Link href='/favoritos' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag5-favoritos.png" alt="" />
              <div className="pag-1">
                <h1>FAVORITOS</h1>
                <p>Salve seus produtos e conteúdos preferidos em um só lugar. Facilite suas escolhas e retorne rapidamente ao que mais combina com você.</p>
              </div>
            </div>
          </Link>

          <Link href='/haircare' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag6-haircare.png" alt="" />
              <div className="pag-2">
                <h1>HAIRCARE</h1>
                <p>Aprenda a cuidar da sua coroa! Aqui você encontra as melhores dicas de hidratação, nutrição e finalização para realçar a beleza única dos seus cabelos crespos e cacheados.</p>
              </div>
            </div>
          </Link>

          <Link href='/infantil' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag7-infantil.png" alt="" />
              <div className="pag-2">
                <h1>INFANTIL</h1>
                <p>O cuidado que começa no berço. Dicas e rotinas para cuidar dos cabelos e da pele das crianças, fortalecendo a autoestima e o amor por sua identidade desde cedo.</p>
              </div>
            </div>
          </Link>

          <Link href='/meuperfil-before' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag8-perfil.png" alt="" />
              <div className="pag-1">
                <h1>MEU PERFIL</h1>
                <p>Crie seu perfil de beleza! Salve as informações do seu cabelo e pele para receber recomendações de produtos e dicas personalizadas, feitas especialmente para as suas necessidades.</p>
              </div>
            </div>
          </Link>

          <Link href='/parcerias-empresas' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag9-parceria.png" alt="" />
              <div className="pag-1">
                <h1>PARCERIA</h1>
                <p>Acreditamos no poder da união! Se sua marca ou trabalho tem como missão exaltar a beleza negra, queremos nos conectar. Conheça nossas oportunidades e vamos crescer juntos.</p>
              </div>
            </div>
          </Link>

          <Link href='/skincare' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag10-skincare.png" alt="" />
              <div className="pag-2">
                <h1>SKINCARE</h1>
                <p>Construa a rotina de cuidados ideal para você. Explore dicas de limpeza, hidratação e proteção para conquistar uma pele visivelmente mais saudável, luminosa e cheia de vida.</p>
              </div>
            </div>
          </Link>

          <Link href='/tinturas' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag11-tinturas.png" alt="" />
              <div className="pag-2">
                <h1>TINTURAS</h1>
                <p>Quer mudar a cor dos fios sem medo? Descubra técnicas de coloração e inspirações para cabelos crespos e cacheados, aprendendo a manter o visual vibrante com a saúde capilar em dia.</p>
              </div>
            </div>
          </Link>

          <Link href='/tendencias' className="pag-link">
            <div className="pag">
              <img src="images/guia/pag12-tendencias.png" alt="" />
              <div className="pag-1">
                <h1>TENDÊNCIAS</h1>
                <p>Fique por dentro das últimas tendências em beleza e cuidados capilares. Descubra o que está em alta e como adaptar as novidades ao seu estilo pessoal.</p>
              </div>
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}