"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "@/styles/tela-de-produto.css";
import {Header, Footer} from "@/components";

export default function PaginaDeProduto() {
  // Estado para o tema (claro/escuro)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Estado para a classe 'active' das seções
  const [activeDetalhe, setActiveDetalhe] = useState('');

  // Estado para a seta de navegação
  const [isSetaLeft, setIsSetaLeft] = useState(false);

  // Refs para cada seção
  const composicaoRef = useRef<HTMLHeadingElement>(null);
  const qualidadesRef = useRef<HTMLHeadingElement>(null);
  const maisDetalhesRef = useRef<HTMLHeadingElement>(null);

  // Dados do produto (virão do banco)
  const [produtoData, setProdutoData] = useState({
    nome: "Creme de Pentear Phytomanga Efeito Pesado 500ml",
    preco: "71,59",
    url_loja: "https://unsplash.com/es/fotos/botella-de-plastico-blanca-y-amarilla-kEgH3e1Cdb4",
    url_imagem: "/images/tela-de-produto/Rectangle-187.png",
    composicao: "",
    qualidades: "",
    mais_detalhes: ""
  });

  // Hook para o tema
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Hook para o estilo das imagens de sol e lua
  useEffect(() => {
    const solImg = document.getElementById('sol') as HTMLImageElement;
    const luaImg = document.getElementById('lua') as HTMLImageElement;

    if (solImg && luaImg) {
      if (isDarkMode) {
        solImg.style.opacity = '0';
        luaImg.style.opacity = '1';
      } else {
        solImg.style.opacity = '1';
        luaImg.style.opacity = '0';
      }
    }
  }, [isDarkMode]);

  // Hook para detectar cliques fora dos detalhes
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const refs = [composicaoRef, qualidadesRef, maisDetalhesRef];
      const clickedOutside = refs.every(
        ref => ref.current && !ref.current.contains(event.target as Node)
      );

      if (clickedOutside && activeDetalhe) {
        setActiveDetalhe('');
      }
    };

    if (activeDetalhe) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDetalhe]);

  // Função para lidar com o clique no botão amarelo
  const handleBotaoAmareloClick = () => {
    window.location.href = produtoData.url_loja;
  };

  // Função para lidar com o clique nos detalhes
  const handleDetalheClick = (detalhe: string) => {
    if (activeDetalhe === detalhe) {
      setActiveDetalhe('');
    } else {
      setActiveDetalhe(detalhe);
    }
  };

  // Função para lidar com o clique na seta
  const handleSetaClick = () => {
    setIsSetaLeft(prev => !prev);
  };

  return (
    <div className="page-produto-wrapper">

      <Header/>

      <main>
        <article id="pagina1">
          <div className="img-container">
            <Image 
              id="img" 
              src={produtoData.url_imagem} 
              alt="imagem do produto" 
              width={300} 
              height={400} 
            />
          </div>
          <section className="produto-info">
            <h2 id="nomeProduto">{produtoData.nome}</h2>
            <p id="menorValor">Valor</p>
            <h2 id="preço">R$ {produtoData.preco}</h2>
            
            <div className="detalhes">
              {/* COMPOSIÇÃO */}
              <h5
                ref={composicaoRef}
                className={`composiçao ${activeDetalhe === 'composiçao' ? 'active' : ''}`}
                onClick={() => handleDetalheClick('composiçao')}
              >
                Composição
                <span className={`tooltip-text ${activeDetalhe === 'composiçao' ? 'active' : ''}`}>
                  {produtoData.composicao || "Informação não disponível"}
                </span>
              </h5>

              {/* QUALIDADES */}
              <h5
                ref={qualidadesRef}
                className={`qualidades ${activeDetalhe === 'qualidades' ? 'active' : ''}`}
                onClick={() => handleDetalheClick('qualidades')}
              >
                Qualidades
                <span className={`tooltip-text ${activeDetalhe === 'qualidades' ? 'active' : ''}`}>
                  {produtoData.qualidades || "Informação não disponível"}
                </span>
              </h5>

              {/* MAIS DETALHES */}
              <h5
                ref={maisDetalhesRef}
                className={`maisDetalhes ${activeDetalhe === 'maisDetalhes' ? 'active' : ''}`}
                onClick={() => handleDetalheClick('maisDetalhes')}
              >
                Mais Detalhes
                <span className={`tooltip-text ${activeDetalhe === 'maisDetalhes' ? 'active' : ''}`}>
                  {produtoData.mais_detalhes || "Informação não disponível"}
                </span>
              </h5>
            </div>

            <aside className="container" id="vaAoSite">
              <button className="botaoAmarelo" onClick={handleBotaoAmareloClick}>
                <h3 className="VaParaCompra">VÁ AO SITE</h3>
              </button>
            </aside>
          </section>
        </article>

        <div id="linha"></div>

       
      </main>

      <Footer/>    </div>
  );

}