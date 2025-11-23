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
}

export default function PaginaDeProduto() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Estados
  const [isDarkMode, setIsDarkMode] = useState(false);
  // ALTERAÇÃO AQUI: Começa com "qualidades" ativo
  const [activeDetalhe, setActiveDetalhe] = useState("qualidades"); 
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Ref para detectar clique fora
  const areaDetalhesRef = useRef<HTMLDivElement>(null);

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

  // Buscar dados
  useEffect(() => {
    if (!id) return;
    const fetchProduto = async () => {
      setLoading(true);
      setErro(null);
      try {
        const res = await fetch(`/api/produtos/${id}`);
        if (!res.ok) throw new Error("Produto não encontrado");
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

  // Tema
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (areaDetalhesRef.current && !areaDetalhesRef.current.contains(event.target as Node)) {
        setActiveDetalhe("");
      }
    };
    if (activeDetalhe) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDetalhe]);

  const handleBotaoAmareloClick = () => {
    if (produtoData.url_loja) window.open(produtoData.url_loja, "_blank");
  };

  const handleDetalheClick = (detalhe: string) => {
    if (activeDetalhe === detalhe) setActiveDetalhe("");
    else setActiveDetalhe(detalhe);
  };

  const renderTextoAtivo = () => {
    switch (activeDetalhe) {
      case "composicao": return produtoData.composicao || "Informação não disponível";
      case "qualidades": return produtoData.qualidades || "Informação não disponível";
      case "maisDetalhes": return produtoData.mais_detalhes || "Informação não disponível";
      default: return null;
    }
  };

  if (loading) return <div className={styles.loadingContainer}>Carregando...</div>;
  if (erro) return <div className={styles.erroContainer}>Erro: {erro}</div>;

  const imageSrc = produtoData.url_imagem || "/images/produtos/default-placeholder.png";

  return (
    <div className={styles.pageProdutoWrapper}>
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
            <h2 className={styles.preco}>R$ {produtoData.preco || "0,00"}</h2>

            {/* Container Principal */}
            <div className={styles.containerDetalhes} ref={areaDetalhesRef}>
              
              {/* Lista de Botões (Esquerda) */}
              <div className={styles.listaBotoes}>
                <h5
                  className={`${styles.botaoDetalhe} ${activeDetalhe === "composicao" ? styles.active : ""}`}
                  onClick={() => handleDetalheClick("composicao")}
                >
                  Composição
                </h5>
                <h5
                  className={`${styles.botaoDetalhe} ${activeDetalhe === "qualidades" ? styles.active : ""}`}
                  onClick={() => handleDetalheClick("qualidades")}
                >
                  Qualidades
                </h5>
                <h5
                  className={`${styles.botaoDetalhe} ${activeDetalhe === "maisDetalhes" ? styles.active : ""}`}
                  onClick={() => handleDetalheClick("maisDetalhes")}
                >
                  Dicas de uso
                </h5>
              </div>

              {/* Texto (Direita) */}
              <div className={`${styles.areaTexto} ${activeDetalhe ? styles.visivel : ''}`}>
                {renderTextoAtivo()}
              </div>
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
  );
}