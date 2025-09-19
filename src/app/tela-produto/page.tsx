"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "@/styles/tela-de-produto.css";
import "@/styles/index.css";

export default function PaginaDeProduto() {
  // Estado para o tema (claro/escuro)
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Estado para a classe 'active' das seções
  const [activeDetalhe, setActiveDetalhe] = useState('composiçao');
  
  // Estado para a seta de navegação
  const [isSetaLeft, setIsSetaLeft] = useState(false);

  // Hook para o tema
  useEffect(() => {
    // Adiciona a classe 'dark' ao <html> baseado no estado
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

  // Função para lidar com o clique nos botões amarelos
  const handleBotaoAmareloClick = () => {
    window.location.href = "https://unsplash.com/es/fotos/botella-de-plastico-blanca-y-amarilla-kEgH3e1Cdb4";
  };
  
  // A lógica dos botões amarelos será aplicada diretamente no JSX no atributo onClick.
  // Você não precisa de um `useEffect` para isso, a menos que a URL seja dinâmica.

  // Funções para lidar com o clique nos detalhes (Composição, Qualidades, etc.)
  const handleDetalheClick = (detalhe: string) => {
    setActiveDetalhe(detalhe);
  };
  
  // Função para lidar com o clique na seta
  const handleSetaClick = () => {
    setIsSetaLeft(prev => !prev);
  };

  return (
    <>
      
       <div className="tema-container">
        <label htmlFor="tema" className="label">
          <input
            type="checkbox"
            name="tema"
            id="tema"
            className="check"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(prev => !prev)}
          />
          <div className="bolinha">
            <Image id="sol" className="imagem" src="/images/sol.png" alt="Sol" width={24} height={24} />
            <Image id="lua" className="imagem" src="/images/lua.png" alt="Lua" width={24} height={24} style={{ opacity: isDarkMode ? '1' : '0' }} />
          </div>
        </label>
      </div>

      <main>
        <article id="pagina1">
          <div className="img-container">
            <Image id="img" src="/images/tela-de-produto/Rectangle-187.png" alt="imagem" width={300} height={400} />
            <button className="vector">
              <Image src="/images/tela-de-produto/Vector-1.png" alt="vetor" width={24} height={24} />
            </button>
          </div>
          <section className="produto-info">
            <Image id="estrela" src="/images/tela-de-produto/Group-174-1.png" alt="estrela" width={100} height={20} />
            <h2 id="nomeProduto">Creme de Pentear Phytomanga Efeito Pesado 500ml</h2>
            <p id="menorValor">Menor Valor</p>
            <h2 id="preço">R$ 71,59</h2>
            <div className="detalhes">
              <h5
                className={`composiçao ${activeDetalhe === 'composiçao' ? 'active' : ''}`}
                onClick={() => handleDetalheClick('composiçao')}
              >
                Composição
                <span className="tooltip-text">
                  Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Sodium Citrate, Sodium Xylenesulfonate, Glycol Distearate, Sodium Chloride, Dimethicone, Parfum, Stearyl Alcohol, Citric Acid, Sodium Benzoate, Polyquaternium-6, Cetyl Alcohol, Tetrasodium Edta, Hexyl Cinnamal, Panthenol, Panthenyl Ethyl Ether, Histidine, Tocopheryl ...
                </span>
              </h5>
              <h5
                className={`qualidades ${activeDetalhe === 'qualidades' ? 'active' : ''}`}
                onClick={() => handleDetalheClick('qualidades')}
              >
                Qualidades
              </h5>
              <h5
                className={`maisDetalhes ${activeDetalhe === 'maisDetalhes' ? 'active' : ''}`}
                onClick={() => handleDetalheClick('maisDetalhes')}
              >
                Mais Detalhes
              </h5>
            </div>
            <aside className="container" id="vaAoSite">
              <button className="botaoAmarelo" onClick={handleBotaoAmareloClick}><h3 className="VaParaCompra">VÁ AO SITE</h3></button>
              <button className="botaoAmarelo" onClick={handleBotaoAmareloClick}><h3 className="VaParaCompra">VÁ AO SITE</h3></button>
              <button className="botaoAmarelo" onClick={handleBotaoAmareloClick}><h3 className="VaParaCompra">VÁ AO SITE</h3></button>
            </aside>
          </section>
        </article>

        <div id="linha"></div>

        <section className="produtos-similares-section">
          <h2 id="produtoSemelhantes">Produtos Semelhantes</h2>
          <div className="container produtos-grid" id="container1">
            <article className="retanguloExterno">
              <div className="retanguloInterno">
                <Image src="/images/tela-de-produto/Rectangle-194.png" alt="" width={150} height={150} />
              </div>
              <p id="ForçaeVigor">Força e vigor</p>
              <h2 id="descriçaoProduto">L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h2>
              <button id="botaoRoxo"><h3 id="VejaMais">Veja Mais</h3></button>
            </article>
            <article className="retanguloExterno">
              <div className="retanguloInterno">
                <Image src="/images/tela-de-produto/Rectangle-194-1.png" alt="" width={150} height={150} />
              </div>
              <p id="ForçaeVigor">Força e vigor</p>
              <h2 id="descriçaoProduto">L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h2>
              <button id="botaoRoxo"><h3 id="VejaMais">Veja Mais</h3></button>
            </article>
            <article className="retanguloExterno">
              <div className="retanguloInterno">
                <Image src="/images/tela-de-produto/Rectangle-194-2.png" alt="" width={150} height={150} />
              </div>
              <p id="ForçaeVigor">Força e vigor</p>
              <h2 id="descriçaoProduto">L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h2>
              <button id="botaoRoxo"><h3 id="VejaMais">Veja Mais</h3></button>
            </article>
            <article className="retanguloExterno">
              <div className="retanguloInterno">
                <Image src="/images/tela-de-produto/Rectangle-194-3.png" alt="" width={150} height={150} />
              </div>
              <p id="ForçaeVigor">Força e vigor</p>
              <h2 id="descriçaoProduto">L'Oréal Professionnel Óleo 10 em 1 Absolut Repair</h2>
              <button id="botaoRoxo"><h3 id="VejaMais">VEJA MAIS</h3></button>
            </article>
            <button id="seta" onClick={handleSetaClick} className={isSetaLeft ? 'left' : ''}>
              <Image src="/images/tela-de-produto/Vector-1.png" alt="seta" width={24} height={24} />
            </button>
          </div>
          <div className="mais-opcoes-container">
            <button id="botaoAmarelo2"><h3 id="maisOpções">MAIS OPÇÕES</h3></button>
          </div>
        </section>

        <section className="newsletter-section" aria-labelledby="recebaMais">
          <article className="retangulo" id="barra">
            <h3 id="recebaMais">RECEBA MAIS AVISOS E NOTIFICAÇÕES SOBRE SUAS LOJAS E ARTIGOS FAVORITOS!</h3>
            <form className="container" id="caixaEmail" aria-label="Formulário de inscrição para newsletter">
              <input type="email" className="caixa-texto" placeholder="Digite seu endereço de email" required />
              <button className="botao" type="submit">Enviar</button>
            </form>
          </article>
        </section>
      </main>
    </>
  );
}