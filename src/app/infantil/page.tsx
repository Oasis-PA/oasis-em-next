"use client";

import { Header, Footer } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "@/styles/infantil.css";

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

const ProdutoCardInfantil: React.FC<{ produto: ProdutoData }> = ({ produto }) => {
  const imageSrc = produto.url_imagem || '/images/infantil/produto.png';
  
  return (
    <div className="page-infantil-wrapper">
    <div className="prod1">
      <Image 
        src={imageSrc} 
        width={300} 
        height={300} 
        alt={produto.nome}
        unoptimized={true}
      />
      <h5>{produto.tag_principal}</h5>
      <h4>{produto.nome.toUpperCase()}</h4>
      <Link href={`/produtos/${produto.id_produto}`}>
        <button id="vejaMais">Veja mais</button>
      </Link>
    </div>    </div>
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
        params.append('marca', 'infantil');
        params.append('limit', '9'); 
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

  const primeiraLinha = produtos.slice(0, 3);
  const segundaLinha = produtos.slice(3, 6);
  const terceiraLinha = produtos.slice(6, 9);

  const renderPlaceholders = (linha: ProdutoData[], linhaNum: number) => {
    if (linha.length >= 3) return null;
    return [...Array(3 - linha.length)].map((_, i) => (
      <div key={`placeholder-${linhaNum}-${i}`} className="prod1" style={{ opacity: 0.5 }}>
        <img src="/images/infantil/produto.png" alt="placeholder" />
        <h5>Em breve</h5>
        <h4>Produto em breve</h4>
        <button disabled>Em breve</button>
      </div>
    ));
  };

  return (
    <>
      <Header />
      <main>
        <div id="d1">
          <h1>Cuidados <span id="span1">infantis</span> com <span id="span2">carinho</span> e <span id="span3">identidade!</span></h1>
          <p>Dicas, produtos e rotinas pensadas para a pele e o cabelo das suas crianças, com segurança, leveza e muito amor.</p>
        </div>
      </main>

      <section id="s1">
        <h1>Artigos fundamentais</h1>
        <p>Dicas, guias e truques essenciais para a rotina de cuidados dos pequenos.</p>

        <div id="artigos">
          <div id="d2">
            <Link href='artigo/como-desembaracar-sem-dor' id="artigo1">
              <div>
                <h4 className="hpreto">Como desembaraçar sem dor?</h4>
                <p className="ppreto">Desembarace os cabelos infantis sem dor e sem choro. Com as técnicas
                e produtos certos, a tarefa vira um momento de carinho, deixando os fios macios e felizes.</p>
              </div>
            </Link>

            <Link href='artigo/hidratacao-para-cabelos-infantis' id="artigo2">
              <div>
                <h4 className="hpreto">Hidratação natural para cabelos infantis</h4>
                <p className="ppreto">Cuide dos fios delicados do seu pequeno com hidratação natural e suave. 
                Ingredientes seguros transformam cabelos ressecados em fios macios, saudáveis e cheios de vida, 
                com todo carinho que eles merecem</p>
              </div>
            </Link>
          </div>

          <div className="d2">
            <Link href='artigo/cuidados-com-a-pele-das-criancas' id="artigo3">
              <div>
                <h4 className="hbranco">Cuidados com a pele sensível das crianças</h4>
                <p className="pbranco">Proteja a pele delicada do seu filho com cuidados especiais e produtos suaves. 
                  Previna irritações e mantenha a pele macia, saudável e protegida todos os dias, com carinho e segurança.</p>
              </div>
            </Link>
            
            <Link href='artigo/cuidados-com-a-pele-das-criancas' id="artigo4">
              <div>
                <h4 className="hpreto">Rotina de skincare: protegendo a pele diariamente</h4>
                <p className="ppreto">Crie uma rotina de cuidados simples e gostosa para proteger a pele do seu pequeno. Com 
                  produtos certos e gestos carinhosos, a pele fica saudável, protegida e feliz todos os dias.</p>
              </div>
            </Link>   
          </div>

          <div className="d2">
            <Link href='artigo/como-identificar-alergias' id="artigo5">
              <div>
                <h4 className="hbranco">Como identificar alergias e irritações na pele</h4>
                <p className="pbranco">Aprenda a reconhecer os sinais de alergias e irritações na pele delicada das crianças. Com 
                atenção e cuidado, você protege seu pequeno, evita desconfortos e garante uma pele sempre saudável.</p>
              </div>
            </Link>

            <Link href='artigo/dicas-para-hora-do-banho' id="artigo6">
              <div>
                <h4 className="hbranco">Dicas para hora do banho sem lágrimas</h4>
                <p className="pbranco">Transforme o banho em um momento especial e divertido, sem choro e sem estresse. Com as técnicas 
                certas e produtos suaves, seu pequeno vai amar esse momento de carinho, diversão e cuidado.</p>
              </div>
            </Link> 
          </div>
        </div>
      </section>
      
      <section id="s2">
        <div id="linhatexto1">
          <h1>Produtos recomendados</h1>
          <div className="linha"></div>
        </div>

        {loading ? (
          <div className="loading-state">
            Carregando produtos infantis...
          </div>
        ) : erro ? (
          <div className="error-state">
            {erro}
          </div>
        ) : produtos.length === 0 ? (
          <div className="no-products-state">
            Nenhum produto infantil encontrado no momento.
          </div>
        ) : (
          <>
            <div className="produtos">
              {primeiraLinha.map((produto) => (
                <ProdutoCardInfantil key={produto.id_produto} produto={produto} />
              ))}
              {renderPlaceholders(primeiraLinha, 1)}
              <div id="leao-bg">
                <h1>shampoos sem sulfato</h1>
              </div>
            </div>

            <div className="produtos">
              <div id="girafa-bg">
                <h1>cremes suaves</h1>
              </div>
              {segundaLinha.map((produto) => (
                <ProdutoCardInfantil key={produto.id_produto} produto={produto} />
              ))}
              {renderPlaceholders(segundaLinha, 2)}
            </div>

            <div className="produtos">
              {terceiraLinha.map((produto) => (
                <ProdutoCardInfantil key={produto.id_produto} produto={produto} />
              ))}
              {renderPlaceholders(terceiraLinha, 3)}
              <div id="zebra-bg">
                <h1>natural/<br />vegano</h1>
              </div>
            </div>
          </>
        )}

        <div id="linhatexto2">
          <div className="linha"></div>
          <h1>Dicas rápidas para você</h1>
        </div>
      </section>

      <section id="s3">
        <div className="dicas">
          <div id="dica1">
            <h2>Evite produtos com fragrâncias fortes</h2>
            <p>Produtos com cheiro muito intenso podem irritar a pele delicada da criança. 
            Prefira opções suaves e específicas para o público infantil.</p>
          </div>

          <div id="dica2">
            <h2>Use pentes largos para reduzir a quebra</h2>
            <p>Ao desembaraçar, escolha pentes de dentes largos ou dedos. Isso helps a 
            proteger os fios frágeis e evita dor.</p>
          </div>
        </div>

        <div className="dicas">
          <div id="dica3">
            <h2>Sempre aplique protetor solar nas crianças</h2>
            <p>Mesmo em dias nublados, a pele precisa de proteção. Escolha fórmulas
            infantis suaves e reaplique conforme necessário.</p>
          </div>

          <div id="dica4">
            <h2>Hidrate a pele após o banho</h2>
            <p>Logo após o banho, aplique hidratante infantil para manter a pele macia,
            protegida e saudável.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}