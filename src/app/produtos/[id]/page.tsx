"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import styles from "@/styles/tela-de-produto.module.css"; 
import { Header, Footer } from "@/components";

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
  tags?: Array<{ id: number; nome: string; principal: boolean }>; // ✅ NOVO (opcional)
}

export default function PaginaDeProduto() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Estados
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDetalhe, setActiveDetalhe] = useState("composicao");
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
    preco: "",
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
          throw new Error("Produto não encontrado");
        }

        const data = await res.json();
        setProdutoData(data);
      } catch (e: any) {
        setErro(e.message || "Erro ao carregar produto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  // Hook para o tema (Mantido global pois afeta document)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Hook para o estilo das imagens de sol e lua (Mantido lógica original)
  useEffect(() => {
    const solImg = document.getElementById("sol") as HTMLImageElement;
    const luaImg = document.getElementById("lua") as HTMLImageElement;

    if (solImg && luaImg) {
      if (isDarkMode) {
        solImg.style.opacity = "0";
        luaImg.style.opacity = "1";
      } else {
        solImg.style.opacity = "1";
        luaImg.style.opacity = "0";
      }
    }
  }, [isDarkMode]);

  // Hook para detectar cliques fora dos detalhes
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const refs = [composicaoRef, qualidadesRef, maisDetalhesRef];
      const clickedOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node)
      );

      if (clickedOutside && activeDetalhe) {
        setActiveDetalhe("");
      }
    };

    if (activeDetalhe) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDetalhe]);

  // Função para lidar com o clique no botão amarelo
  const handleBotaoAmareloClick = () => {
    if (produtoData.url_loja) {
      window.open(produtoData.url_loja, "_blank");
    }
  };

  // Função para lidar com o clique nos detalhes
  const handleDetalheClick = (detalhe: string) => {
    if (activeDetalhe === detalhe) {
      setActiveDetalhe("");
    } else {
      setActiveDetalhe(detalhe);
    }
  };

  // Função para lidar com o clique na seta
  const handleSetaClick = () => {
    setIsSetaLeft((prev) => !prev);
  };

  // Loading e erro
  if (loading) {
    return (
      <div className={styles.pageProdutoWrapper}>
        <Header />
        <main className={styles.loadingContainer}>
          <p>Carregando produto...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (erro) {
    return (
      <div className={styles.pageProdutoWrapper}>
        <Header />
        <main className={styles.erroContainer}>
          <p>Erro: {erro}</p>
          <button onClick={() => router.push("/produtos")}>
            Voltar para produtos
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const imageSrc =
    produtoData.url_imagem || "/images/produtos/default-placeholder.png";

  return (
    <>
      <div className={styles.pageProdutoWrapper}>
        {/* Adicionado Wrapper para garantir escopo do CSS */}
        <Header className={styles.headerTransparente} />

        <main>
          <article className={styles.pagina1}>
            <div className={styles.imgContainer}>
              <Image
                className={styles.produtoImg}
                src={imageSrc}
                alt={produtoData.nome}
                width={300}
                height={400}
                unoptimized={true}
              />
            </div>
            <section className={styles.produtoInfo}>
              <h2 className={styles.nomeProduto}>{produtoData.nome}</h2>
              <p className={styles.menorValor}>Valor</p>
              <h2 className={styles.preco}>
                R$ {produtoData.preco || "0,00"}
              </h2>

              <div className={styles.detalhes}>
                {/* COMPOSIÇÃO */}
                <h5
                  ref={composicaoRef}
                  className={`${styles.composicao} ${
                    activeDetalhe === "composicao" ? styles.active : ""
                  }`}
                  onClick={() => handleDetalheClick("composicao")}
                >
                  Composição
                  <span className={styles.tooltipText}>
                    {produtoData.composicao || "Informação não disponível"}
                  </span>
                </h5>

                {/* QUALIDADES */}
                <h5
                  ref={qualidadesRef}
                  className={`${styles.qualidades} ${
                    activeDetalhe === "qualidades" ? styles.active : ""
                  }`}
                  onClick={() => handleDetalheClick("qualidades")}
                >
                  Qualidades
                  <span className={styles.tooltipText}>
                    {produtoData.qualidades || "Informação não disponível"}
                  </span>
                </h5>

                {/* MAIS DETALHES */}
                <h5
                  ref={maisDetalhesRef}
                  className={`${styles.maisDetalhes} ${
                    activeDetalhe === "maisDetalhes" ? styles.active : ""
                  }`}
                  onClick={() => handleDetalheClick("maisDetalhes")}
                >
                  Dicas de uso
                  <span className={styles.tooltipText}>
                    {produtoData.mais_detalhes || "Informação não disponível"}
                  </span>
                </h5>
              </div>

              <aside className={styles.vaAoSiteContainer}>
                <button
                  className={styles.botaoAmarelo}
                  onClick={handleBotaoAmareloClick}
                  disabled={!produtoData.url_loja}
                >
                  <h3 className={styles.vaParaCompraTexto}>
                    {produtoData.url_loja ? "VÁ AO SITE" : "LINK INDISPONÍVEL"}
                  </h3>
                </button>
              </aside>
            </section>
          </article>

          <div className={styles.linha}></div>
        </main>

        <Footer />
      </div>
    </>
  );
}