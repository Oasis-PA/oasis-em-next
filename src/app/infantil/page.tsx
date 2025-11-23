"use client";

import { Header, Footer } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/styles/infantil.module.css";

interface ProdutoData {
  id_produto: number;
  nome: string;
  marca: string;
  tag_principal: string;
  url_imagem: string | null;
  url_loja: string | null;
  preco?: number;
  descricao?: string;
}

// Componente do Card refatorado para utilizar styles
const ProdutoCardInfantil: React.FC<{ produto: ProdutoData }> = ({ produto }) => {
  const imageSrc = produto.url_imagem || '/images/infantil/produto.png';
  
  return (
    <div className={styles.produtoCard}>
      <div className={styles.imgContainer}>
        <Image 
          src={imageSrc} 
          width={300} 
          height={300} 
          alt={produto.nome}
          unoptimized={true}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      
      <div className={styles.infoProduto}>
        <h5>{produto.tag_principal || "CUIDADOS"}</h5>
        <h4>{produto.nome.toUpperCase()}</h4>
      </div>

      <Link href={`/produtos/${produto.id_produto}`} className={styles.btnLink}>
        <button className={styles.btnVejaMais}>VEJA MAIS</button>
      </Link>
    </div>
  );
};

export default function Infantil() {
  const [produtos, setProdutos] = useState<ProdutoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutosInfantis = async () => {
      try {
        setLoading(true);
        setErro(null);
        
        const params = new URLSearchParams();
        params.append('marca', 'Infantil');
        params.append('limit', '20'); 
        params.append('page', '1');
        
        const res = await fetch(`/api/produtos?${params.toString()}`);
        
        if (!res.ok) {
          throw new Error('Falha ao carregar produtos infantis');
        }
        
        const data = await res.json();
        const produtosArray = data.produtos || [];
        setProdutos(produtosArray);
      } catch (e) {
        setErro('Não foi possível carregar os produtos infantis');
      } finally {
        setLoading(false);
      }
    };

    fetchProdutosInfantis();
  }, []);

  // FILTRAGEM PERSONALIZADA POR NOME
  const primeiraLinha = produtos.filter(produto => 
    produto.nome === "Shampoo Kids Cabelo Cacheado 240ml" ||
    produto.nome === "Shampoo #todecachinho Baby 300ml"||
    produto.nome === "Shampoo Juntinhos Cachos Encantados Moana 300ml" 
  ).slice(0, 3);

  const segundaLinha = produtos.filter(produto => 
    produto.nome === "Loção Hidratante Baby 100ml" ||
    produto.nome === "Loção Hidratante Bebê Vida Leite de Arroz 200ml"||
    produto.nome === "Creme para Pentear Cachos dos Sonhos 200ml" 
  ).slice(0, 3);

  const terceiraLinha = produtos.filter(produto => 
    produto.nome === "Sabonete Líquido Bebê Camomila Refil 250ml" ||
    produto.nome === "Creme de Tratamento Divino Potinho Kids 1kg"||
    produto.nome === "Creme para Pentear Juntinhos Moana 300ml"
  ).slice(0, 3);

  // Renderiza placeholders se não houver produtos suficientes
  const renderPlaceholders = (linha: ProdutoData[]) => {
    if (linha.length >= 3) return null;
    return [...Array(3 - linha.length)].map((_, i) => (
      <div key={`placeholder-${i}`} className={styles.produtoCard} style={{ opacity: 0.5 }}>
        <div className={styles.imgContainer}>
           <img src="/images/infantil/produto.png" alt="placeholder" style={{width:'100%', objectFit:'contain'}}/>
        </div>
        <div className={styles.infoProduto}>
           <h5>Em breve</h5>
           <h4>Produto em breve</h4>
        </div>
        <button className={styles.btnVejaMais} disabled style={{cursor: 'not-allowed', background: '#ccc'}}>Em breve</button>
      </div>
    ));
  };

  return (
    <>
    <Header />
    <div className={styles.pageWrapper}>
      <main>
        <div className={styles.bannerPrincipal}>
          <h1>Cuidados <span className={styles.spanVerde}>infantis</span> com <span className={styles.spanRosa}>carinho</span> e <span className={styles.spanAmarelo}>identidade!</span></h1>
          <p>Dicas, produtos e rotinas pensadas para a pele e o cabelo das suas crianças, com segurança, leveza e muito amor.</p>
        </div>
      </main>

      <section className={styles.sectionArtigos}>
        <h1>Artigos fundamentais</h1>
        <p>Dicas, guias e truques essenciais para a rotina de cuidados dos pequenos.</p>

        <div className={styles.artigosContainer}>
          {/* Linha 1 de Artigos */}
          <div className={styles.artigosRow}>
            <Link href='artigo/como-desembaracar-sem-dor' className={`${styles.cardArtigo} ${styles.artigo1}`}>
              <div>
                <h4 className={styles.titleBlack}>Como desembaraçar sem dor?</h4>
                <p className={styles.textBlack}>Desembarace os cabelos infantis sem dor e sem choro. Com as técnicas
                e produtos certos, a tarefa vira um momento de carinho, deixando os fios macios e felizes.</p>
              </div>
            </Link>

            <Link href='artigo/hidratacao-para-cabelos-infantis' className={`${styles.cardArtigo} ${styles.artigo2}`}>
              <div>
                <h4 className={styles.titleBlack}>Hidratação natural para cabelos infantis</h4>
                <p className={styles.textBlack}>Cuide dos fios delicados do seu pequeno com hidratação natural e suave. 
                Ingredientes seguros transformam cabelos ressecados em fios macios, saudáveis e cheios de vida.</p>
              </div>
            </Link>
          </div>

          {/* Linha 2 de Artigos */}
          <div className={styles.artigosRow}>
            <Link href='artigo/cuidados-com-a-pele-das-criancas' className={`${styles.cardArtigo} ${styles.artigo3}`}>
              <div>
                <h4 className={styles.titleWhite}>Cuidados com a pele sensível das crianças</h4>
                <p className={styles.textWhite}>Proteja a pele delicada do seu filho com cuidados especiais e produtos suaves. 
                  Previna irritações e mantenha a pele macia, saudável e protegida todos os dias.</p>
              </div>
            </Link>
            
            <Link href='artigo/cuidados-com-a-pele-das-criancas' className={`${styles.cardArtigo} ${styles.artigo4}`}>
              <div>
                <h4 className={styles.titleBlack}>Rotina de skincare: protegendo a pele diariamente</h4>
                <p className={styles.textBlack}>Crie uma rotina de cuidados simples e gostosa para proteger a pele do seu pequeno. Com 
                  produtos certos e gestos carinhosos, a pele fica saudável.</p>
              </div>
            </Link>   
          </div>

          {/* Linha 3 de Artigos */}
          <div className={styles.artigosRow}>
            <Link href='artigo/como-identificar-alergias' className={`${styles.cardArtigo} ${styles.artigo5}`}>
              <div>
                <h4 className={styles.titleWhite}>Como identificar alergias e irritações na pele</h4>
                <p className={styles.textWhite}>Aprenda a reconhecer os sinais de alergias e irritações na pele delicada das crianças. Com 
                atenção e cuidado, você protege seu pequeno.</p>
              </div>
            </Link>

            <Link href='artigo/dicas-para-hora-do-banho' className={`${styles.cardArtigo} ${styles.artigo6}`}>
              <div>
                <h4 className={styles.titleWhite}>Dicas para hora do banho sem lágrimas</h4>
                <p className={styles.textWhite}>Transforme o banho em um momento especial e divertido, sem choro e sem estresse. Com as técnicas 
                certas e produtos suaves, seu pequeno vai amar esse momento.</p>
              </div>
            </Link> 
          </div>
        </div>
      </section>
      
      <section className={styles.sectionProdutos}>
        <div className={styles.headerLineWrapper}>
          <h1>Produtos recomendados</h1>
          <div className={styles.dividingLine}></div>
        </div>

        {loading ? (
          <div className={styles.loadingState}>Carregando produtos infantis...</div>
        ) : erro ? (
          <div className={styles.errorState}>{erro}</div>
        ) : produtos.length === 0 ? (
          <div className={styles.noProductsState}>Nenhum produto infantil encontrado no momento.</div>
        ) : (
          <>
            {/* LINHA 1: 3 Produtos + Banner Leão */}
            <div className={styles.produtosGrid}>
              {primeiraLinha.map((produto) => (
                <ProdutoCardInfantil key={produto.id_produto} produto={produto} />
              ))}
              {renderPlaceholders(primeiraLinha)}
              
              <div className={`${styles.bannerGrid} ${styles.bannerLeao}`}>
                <h1>shampoos<br/>sem sulfato</h1>
              </div>
            </div>

            {/* LINHA 2: Banner Girafa + 3 Produtos */}
            <div className={styles.produtosGrid}>
              <div className={`${styles.bannerGrid} ${styles.bannerGirafa}`}>
                <h1>cremes<br/>suaves</h1>
              </div>
              
              {segundaLinha.map((produto) => (
                <ProdutoCardInfantil key={produto.id_produto} produto={produto} />
              ))}
              {renderPlaceholders(segundaLinha)}
            </div>

            {/* LINHA 3: 3 Produtos + Banner Zebra */}
            <div className={styles.produtosGrid}>
              {terceiraLinha.map((produto) => (
                <ProdutoCardInfantil key={produto.id_produto} produto={produto} />
              ))}
              {renderPlaceholders(terceiraLinha)}
              
              <div className={`${styles.bannerGrid} ${styles.bannerZebra}`}>
                <h1>natural/<br />vegano</h1>
              </div>
            </div>
          </>
        )}
      </section>

      <section className={styles.sectionDicas}>
        <div className={styles.headerLineWrapper}>
          <div className={styles.dividingLine}></div>
          <h1>Dicas rápidas para você</h1>
        </div>

        {/* GRID DE DICAS */}
        <div className={styles.dicasGrid}>
          
          <div className={`${styles.dicaCard} ${styles.dica1}`}>
            <h2>Evite produtos com fragrâncias fortes</h2>
            <p>Produtos com cheiro muito intenso podem irritar a pele delicada da criança. 
            Prefira opções suaves e específicas para o público infantil.</p>
          </div>

          <div className={`${styles.dicaCard} ${styles.dica2}`}>
            <h2>Use pentes largos para reduzir a quebra</h2>
            <p>Ao desembaraçar, escolha pentes de dentes largos ou dedos. Isso ajuda a 
            proteger os fios frágeis e evita dor.</p>
          </div>

          <div className={`${styles.dicaCard} ${styles.dica3}`}>
            <h2>Sempre aplique protetor solar nas crianças</h2>
            <p>Mesmo em dias nublados, a pele precisa de proteção. Escolha fórmulas
            infantis suaves e reaplique conforme necessário.</p>
          </div>

          <div className={`${styles.dicaCard} ${styles.dica4}`}>
            <h2>Hidrate a pele após o banho</h2>
            <p>Logo após o banho, aplique hidratante infantil para manter a pele macia,
            protegida e saudável.</p>
          </div>
        </div>
      </section>
      
      
    </div>
  <Footer />
    </>
  );
}