// file: components/SecaoRecomendacoes.tsx
// Componente que substitui a seção s4 do seu perfil

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/perfil.module.css'; // Use seu CSS existente

interface ProdutoRecomendado {
  id_produto: number;
  nome: string;
  marca: string;
  url_loja: string | null;
  url_imagem: string | null;
  tag_principal: string;
  tags: string[];
  score: number;
  motivos: string[];
}

interface SecaoRecomendacoesProps {
  idUsuario: number;
}

export default function SecaoRecomendacoes({ idUsuario }: SecaoRecomendacoesProps) {
  const [produtos, setProdutos] = useState<ProdutoRecomendado[]>([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [baseadoEm, setBaseadoEm] = useState<string>('');

  useEffect(() => {
    const fetchRecomendacoes = async () => {
      setLoadingProdutos(true);
      try {
        const res = await fetch(`/api/recomendacoes-inteligentes?id_usuario=${idUsuario}&limit=8`);
        
        if (!res.ok) {
          throw new Error('Erro ao buscar recomendações');
        }

        const data = await res.json();
        setProdutos(data.recomendacoes || []);
        setBaseadoEm(data.baseado_em || '');
      } catch (error) {
        console.error('Erro:', error);
        setProdutos([]);
      } finally {
        setLoadingProdutos(false);
      }
    };

    if (idUsuario) {
      fetchRecomendacoes();
    }
  }, [idUsuario]);

  const produtosVisiveis = produtos.slice(currentIndex, currentIndex + 4);

  const handleNext = () => {
    if (currentIndex < produtos.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className={styles.s4}>
      <h1>Baseados no seu Perfil</h1>
      <p>
        {baseadoEm === 'questionario' 
          ? 'Recomendações personalizadas baseadas no seu questionário'
          : 'Uma seleção especial de produtos para você'}
      </p>
      
      {loadingProdutos ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Carregando suas recomendações...</p>
        </div>
      ) : produtos.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Complete seu questionário para receber recomendações personalizadas!</p>
          <Link href="/cronograma-capilar" style={{ color: '#FFD700', textDecoration: 'underline' }}>
            Responder questionário
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.cardsperfil}>
            {produtosVisiveis.map((produto) => (
              <div className={styles.cardperfil} key={produto.id_produto}>
                <img 
                  src={produto.url_imagem || "/images/favoritos/imagem-produto.png"} 
                  alt={produto.nome} 
                />
                <h1>{produto.nome}</h1>
                
                {/* Mostrar motivo da recomendação */}
                <h2>
                  {produto.motivos[0] || produto.tag_principal}
                </h2>
                
                {/* Score de compatibilidade (opcional) */}
                {produto.score > 50 && (
                  <div style={{
                    background: '#FFD700',
                    color: '#000',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginTop: '8px'
                  }}>
                    {Math.round((produto.score / 100) * 100)}% compatível
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

          {produtos.length > 4 && (
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
          )}
        </>
      )}
    </section>
  );
}