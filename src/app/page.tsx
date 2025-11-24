// ✅ MUDANÇAS MÍNIMAS - Apenas no s4 e nos states relacionados

"use client";
import { Header, Footer } from "@/components";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/page.module.css';
import FavoriteButton from "@/components/FavoriteButton"; // Importação adicionada

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

// ✅ ATUALIZADO: Interface com campos adicionais
interface Produto {
  id_produto: number;
  nome: string;
  url_loja: string | null;
  url_imagem: string | null;
  tag_principal: string;
  id_tag: number | null;
  motivos?: string[];  // ✅ NOVO
  score?: number;      // ✅ NOVO
}

export default function OasisHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<'feminino' | 'masculino' | 'mais50'>('feminino');
  
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userId, setUserId] = useState<number | null>(null); // ✅ NOVO

  // ✅ NOVO: Detectar usuário logado
  useEffect(() => {
    // Tente pegar o ID do usuário do localStorage/cookie/sessão
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  // ✅ ATUALIZADO: Buscar recomendações inteligentes
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        let response;
        
        // Se usuário estiver logado, use recomendações inteligentes
        if (userId) {
          response = await fetch(`/api/recomendacoes-inteligentes?id_usuario=${userId}&limit=12`);
        } else {
          // Senão, use produtos aleatórios
          response = await fetch('/api/produtos?limit=30');
        }
        
        const data = await response.json();
        
        // ✅ ADAPTADO: Aceita ambos os formatos de resposta
        if (data.recomendacoes) {
          // Formato de recomendações inteligentes
          setProdutos(data.recomendacoes);
        } else if (data.produtos) {
          // Formato normal de produtos
          const produtosAleatorios = [...data.produtos].sort(() => Math.random() - 0.5);
          setProdutos(produtosAleatorios);
        } else {
          setProdutos([]);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setProdutos([]);
      } finally {
        setLoadingProdutos(false);
      }
    };

    fetchProdutos();
  }, [userId]); // ✅ Recarrega quando userId mudar

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

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(produtos.length - 4, prev + 1));
  };

  const produtosVisiveis = produtos.slice(currentIndex, currentIndex + 4);

  return (
    <>
    <Header/>
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
          <Link href="artigo/acidificacao-no-cabelo">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-1.jpg" alt="acidificacao-no-cabelo" />
              <p>Como fazer acidificação no cabelo? Confira dicas</p>
            </div>
          </Link>

          <Link href="artigo/serum-facial">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-2.png" alt="serum-facial" />
              <p>Sérum Facial: o que é, como usar e para que serve</p>
            </div>
          </Link>

          <Link href="artigo/acido-hialuronico">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-3.jpg" alt="acido-hialuronico" />
              <p>Ácido hialurônico nos cabelos? Entenda os benefícios.</p>
            </div>
          </Link>

          <Link href="artigo/erros-cronograma-capilar">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-4.jpg" alt="erros-cronograma-capilar" />
              <p>Seu cronograma capilar não dá certo? Evite estes erros.</p>
            </div>
          </Link>

          <Link href="artigo/oleos-essenciais-para-cabelo">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-5.jpg" alt="oleos-essenciais-para-cabelo" />
              <p>Quais óleos essenciais usar no cabelo? Veja 7 opções.</p>
            </div>
          </Link>

          <Link href="artigo/5-receitas-naturais">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-6.jpg" alt="5-receitas-naturais" />
              <p>Quer ter fios mais fortes? Confira 5 receitas caseiras.</p>
            </div>
          </Link>

          <Link href="artigo/tons-de-cabelo-verao">
            <div className={styles.card}>
              <img src="/images/tela-principal/artigo-hot-7.jpg" alt="tons-de-cabelo-verao" />
              <p>Quer renovar o visual no verão? Inspire-se com os tons.</p>
            </div>
          </Link>
        </div>
      </section>

      <section className={styles.s2}>
        <Link href='/parcerias-empresas'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-haircare.png" alt=""/>
            <h1>PARCERIAS</h1>
          </div>
        </Link>

        <Link href='/tendencias'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-tendencias.png" alt=""/>
            <h1>TENDÊNCIAS</h1>
          </div>
        </Link>

        <Link href='/skincare'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-skincare.png" alt=""/>
            <h1>SKINCARE</h1>
          </div>
        </Link>

        <Link href='/produtos'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-produtos.png" alt=""/>
            <h1>PRODUTOS</h1>
          </div>
        </Link>

        <Link href='/alimentacao'>
          <div className={styles.s2links}>
            <img src="/images/tela-principal/img-alimentacao.png" alt=""/>
            <h1>ALIMENTAÇÃO</h1>
          </div>
        </Link>

        <Link href='/infantil'>
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

      {/* ✅ SEÇÃO S4 ATUALIZADA */}
      <section className={styles.s4}>
        <h1>Baseados no seu Perfil</h1>
        <p>
          {userId 
            ? 'Uma lista de recomendações personalizadas baseadas no seu perfil. Veja produtos que foram feitos especialmente para você!'
            : 'Produtos selecionados especialmente para você. Faça login para recomendações personalizadas!'}
        </p>
        
        {loadingProdutos ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Carregando produtos...</p>
          </div>
        ) : produtos.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Nenhum produto encontrado.</p>
            {userId && (
              <p style={{ marginTop: '1rem' }}>
                <Link href="/cronograma-capilar" style={{ color: '#FFD700', textDecoration: 'underline' }}>
                  Complete seu questionário
                </Link> para receber recomendações personalizadas!
              </p>
            )}
          </div>
        ) : (
          <>
            <div className={styles.cardsperfil}>
              {produtosVisiveis.map((produto) => (
                <div 
                  className={styles.cardperfil} 
                  key={produto.id_produto}
                  style={{ position: 'relative' }} // Necessário para posicionar o botão de favorito
                >
                  {/* BOTÃO DE FAVORITO INSERIDO AQUI */}
                  <div style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 10 }}>
                    <FavoriteButton 
                      produtoId={produto.id_produto}
                      size="small"
                    />
                  </div>
                  
                  <img 
                    src={produto.url_imagem || "/images/favoritos/imagem-produto.png"} 
                    alt={produto.nome} 
                  />
                  <h1>{produto.nome}</h1>
                  
                  {/* ✅ ATUALIZADO: Mostra motivo da recomendação se existir */}
                  <h2>
                    {produto.motivos && produto.motivos.length > 0 
                      ? produto.motivos[0]
                      : (produto.tag_principal || 'Produto de qualidade para cuidados especiais.')}
                  </h2>

                  {/* ✅ NOVO: Badge de compatibilidade (opcional) */}
                  {produto.score && produto.score > 50 && (
                    <div style={{
                      background: '#FFD700',
                      color: '#000',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      marginTop: '8px',
                      display: 'inline-block'
                    }}>
                      Compatibilidade: {Math.round((produto.score / 100) * 100)}%
                    </div>
                  )}

                  <button className={styles.buttonPerfil}>
                    <Link href={`/produtos/${produto.id_produto}`}>
                      IR PARA COMPRA
                    </Link>
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.arrow}>
              <button 
                onClick={handlePrevious} 
                disabled={currentIndex === 0}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex === 0 ? 0.3 : 1
                }}
              >
                <img src="/images/favoritos/seta-esquerda.svg" alt="seta esquerda" width="16px" height="30px" />
              </button>
              <button 
                onClick={handleNext} 
                disabled={currentIndex >= produtos.length - 4}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: currentIndex >= produtos.length - 4 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex >= produtos.length - 4 ? 0.3 : 1
                }}
              >
                <img src="/images/favoritos/seta-direita.svg" alt="seta direita" width="16px" height="30px" />
              </button>
            </div>
          </>
        )}
      </section>

      <section className={styles.s5}>
        <div className={styles.artigos}>
            <img className={styles.artigo1} src="images/skincare/artigo1.png" alt="" />
            <div className={styles.contartigo}>
              <h1>Aposte em Maquiagens ousadas!</h1>
              <p>Está cansada das mesmas makes monótonas e sem
              brilho em toda festa? Veja agora mesmo 10 maquiagens 
              para inovar e arrasar no visual! Aposte também em 
              produtos que não danifiquem sua pele e preservem sua
              beleza natural.</p>
              <button><Link href='/artigo/maquiagens'>CONHEÇA</Link></button>
            </div>
        </div>

        <div className={styles.artigo2}>
            <div className={styles.contartigo}>
              <h1>Vai se casar? esteja incrível para seu amor!</h1>
              <p>Está de casamento marcado mas ainda não tem certeza sobre
              como deve se arrumar? Invista em você! Clique abaixo e 
              descubra o kit de casamento perfeito, com looks, maquiagens
              e penteados usados por famosos e feitos para você!
              </p>
              <button><Link href='artigo/vai-se-casar'>CONHEÇA</Link></button>
            </div>
            <img src="images/skincare/artigo2.png" alt="" />
        </div>

        <div className={styles.artigos}>
            <img src="images/skincare/artigo3.png" alt="" />
            <div className={styles.contartigo}>
              <h1>autocuidado masculino</h1>
              <p>Se importar com a própria beleza e querer se cuidar não
                é mais algo irreal. Para quem dá aquele toque a mais na
                aparência, recebe autoestima e felicidade renovadas! Leia 
                agora por onde começar a ter uma rotina capilar e de 
                skincare e dê uma repaginada total no visual!</p>
              <button><Link href='artigo/autocuidado-masculino'>CONHEÇA</Link></button>
            </div>
        </div>
      </section>

      <section className={styles.s6}>
        <div className={styles.h1novidades}>NOVIDADES</div>
          <div className={styles.cardsnovidades}>
            <Link href='/produtos/1632'>
              <div className={styles.cardnovidade1}>
                <h1>Umidificador para cachos - Vizeme</h1>
              </div>
            </Link>

            <Link href='/produtos/1633'>
              <div className={styles.cardnovidade2}>
                <h1>Esfoliante Nutritivo Tododia Jambo Rosa e Flor de Caju</h1>
              </div>
            </Link>

            <Link href='/produtos/1634'>
              <div className={styles.cardnovidade3}>
                <h1>Sérum Hidratante Principia 2% Ácidos Hialuronicos + B5</h1>
              </div>
            </Link>

            <Link href='/produtos/1635'>
              <div className={styles.cardnovidade4}>
                <h1>Hidratante Corporal Pele Negra Vegano Raavi</h1>
              </div>
            </Link>
          </div>
      </section>

      <section className={styles.s7}>
        <div className={styles.s7div}>
          <Link href='artigo/diferenca-de-geracoes'>
            <div className={styles.artigo1footer}>
              <h1>diferença de gerações</h1>
              <p>Os 10 tratamentos de pele mais comuns em 1950 e 2024</p>
              <img src="images/tela-principal/seta-branca.svg" alt="" />
            </div>
          </Link>

          <Link href='/infantil'>
            <div className={styles.artigo2footer}>
              <h1>Cremes Infantis</h1>
              <p>Veja os melhores produtos para suas crianças!</p>
              <img src="images/tela-principal/seta-branca.svg" alt="" />
            </div>
          </Link>

          <Link href='/tendencias'>
            <div className={styles.artigo3}>
              <h1>tÊndencias</h1>
              <p>5 novos lançamentos que prometem abalar o mercado</p>
              <img src="images/tela-principal/seta-branca.svg" alt="" />
            </div>
          </Link>

        </div>
      </section>
      <Footer/>
    </>
  );
}