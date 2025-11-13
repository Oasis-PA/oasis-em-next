// file: app/produtos/[id]/page.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import "@/styles/tela-de-produto.css";
import {Header, Footer} from "@/components";

interface ProdutoData {
  id_produto: number;
  nome: string;
  url_loja: string | null;
  url_imagem: string | null;
  composicao: string;
  qualidades: string;
  mais_detalhes: string;
  tag_principal: string;
  preco?: string;
}

export default function PaginaDeProduto() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Estados
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDetalhe, setActiveDetalhe] = useState('composicao');
  const [isSetaLeft, setIsSetaLeft] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Refs
  const composicaoRef = useRef<HTMLHeadingElement>(null);
  const qualidadesRef = useRef<HTMLHeadingElement>(null);
  const maisDetalhesRef = useRef<HTMLHeadingElement>(null);

  // Dados do produto
  const [produtoData, setProdutoData] = useState<ProdutoData>({
    id_produto: 0,
    nome: "",
    url_loja: null,
    url_imagem: null,
    composicao: "",
    qualidades: "",
    mais_detalhes: "",
    tag_principal: "",
    preco: ""
  });

  // Buscar dados do produto
  useEffect(() => {
    if (!id) return;

    const fetchProduto = async () => {
      setLoading(true);
      setErro(null);

      try {
        const res = await fetch(`/api/produtos/${id}`);
        
        if (!res.ok) {
          throw new Error('Produto não encontrado');
        }

        const data = await res.json();
        setProdutoData(data);
      } catch (e: any) {
        setErro(e.message || 'Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

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

  // Debug: Monitorar mudanças no activeDetalhe
  useEffect(() => {
  }, [activeDetalhe]);

  // Debug: Monitorar dados do produto
  useEffect(() => {
      composicao: produtoData.composicao,
      qualidades: produtoData.qualidades,
      mais_detalhes: produtoData.mais_detalhes
    });
  }, [produtoData]);

  // Função para lidar com o clique no botão amarelo
  const handleBotaoAmareloClick = () => {
    if (produtoData.url_loja) {
      window.open(produtoData.url_loja, '_blank');
    }
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

  // Loading e erro
  if (loading) {
    return (
      <>
        <Header />
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Carregando produto...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (erro) {
    return (
      <>
        <Header />
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Erro: {erro}</p>
          <button onClick={() => router.push('/produtos')}>Voltar para produtos</button>
        </main>
        <Footer />
      </>
    );
  }

  const imageSrc = produtoData.url_imagem || '/images/produtos/default-placeholder.png';

  return (
    <>
      <Header className="header-transparente"/>

      <main>
        <article id="pagina1">
          <div className="img-container">
            <Image 
              id="img" 
              src={imageSrc} 
              alt={produtoData.nome} 
              width={300} 
              height={400}
              unoptimized={true}
            />
          </div>
          <section className="produto-info">
            <h2 id="nomeProduto">{produtoData.nome}</h2>
            <p id="menorValor">Valor</p>
            <h2 id="preco">R$ {produtoData.preco || "0,00"}</h2>
            
            <div className="detalhes">
              {/* COMPOSIÇÃO */}
              <h5
                ref={composicaoRef}
                className={`composicao ${activeDetalhe === 'composicao' ? 'active' : ''}`}
                onClick={() => handleDetalheClick('composicao')}
              >
                Composição
                <span className={`tooltip-text ${activeDetalhe === 'composicao' ? 'active' : ''}`}>
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
                Dicas de uso
                <span className={`tooltip-text ${activeDetalhe === 'maisDetalhes' ? 'active' : ''}`}>
                  {produtoData.mais_detalhes || "Informação não disponível"}
                </span>
              </h5>
            </div>

            <aside className="container" id="vaAoSite">
              <button 
                className="botaoAmarelo" 
                onClick={handleBotaoAmareloClick}
                disabled={!produtoData.url_loja}
              >
                <h3 className="VaParaCompra">
                  {produtoData.url_loja ? 'VÁ AO SITE' : 'LINK INDISPONÍVEL'}
                </h3>
              </button>
            </aside>
          </section>
        </article>

        <div id="linha"></div>

       
      </main>

      <Footer />
    </>
  );
}