"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/favorite-button.module.css';

interface FavoriteButtonProps {
  artigoId?: number;    // Agora opcional
  produtoId?: number;   // Novo: ID do produto
  initialIsFavorited?: boolean;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  artigoId, 
  produtoId,
  initialIsFavorited = false,
  size = 'medium',
  showLabel = false
}) => {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  // Determina se é produto ou artigo baseado na prop recebida
  const isProduto = !!produtoId;
  const currentId = isProduto ? produtoId : artigoId;

  useEffect(() => {
    if (currentId) {
      checkFavoriteStatus();
    }
  }, [currentId]);

  const checkFavoriteStatus = async () => {
    if (!currentId) return;

    try {
      // Muda a URL dependendo se é produto ou artigo
      const endpoint = isProduto 
        ? `/api/favoritos/produtos/check/${currentId}`
        : `/api/favoritos/artigos/check/${currentId}`;

      const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.isFavorited);
      }
    } catch (error) {
      // Silencioso
    }
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading || !currentId) return;

    setIsLoading(true);
    setIsAnimating(true);

    try {
      // Lógica de URL para Produto vs Artigo
      let endpoint: string;
      let body: any;

      if (isProduto) {
        // --- LÓGICA DE PRODUTO ---
        endpoint = isFavorited 
          ? `/api/favoritos/produtos/${currentId}` // DELETE
          : '/api/favoritos/produtos';             // POST
        body = isFavorited ? undefined : JSON.stringify({ id_produto: currentId });
      } else {
        // --- LÓGICA DE ARTIGO (Mantida igual) ---
        endpoint = isFavorited 
          ? `/api/favoritos/artigos/${currentId}`
          : '/api/favoritos/artigos';
        body = isFavorited ? undefined : JSON.stringify({ id_artigo: currentId });
      }

      const response = await fetch(endpoint, {
        method: isFavorited ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: body,
      });

      if (response.status === 401) {
        router.push('/login');
        return;
      }

      if (response.ok) {
        setIsFavorited(!isFavorited);
        setTimeout(() => setIsAnimating(false), 400);
      } else {
        let errorMessage = 'Erro ao processar favorito';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch { /* erro silencioso */ }
        alert(`Erro: ${errorMessage}`);
        setIsAnimating(false);
      }
    } catch (error) {
      alert('Erro de conexão.');
      setIsAnimating(false);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonClasses = [
    styles.favoriteButton,
    styles[size],
    isFavorited ? styles.favorited : '',
    isAnimating ? styles.animating : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={buttonClasses}
      aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      style={{ zIndex: 20 }} // Garante que fique acima da imagem
    >
      <svg
        className={styles.favoriteIcon}
        viewBox="0 0 24 24"
        fill={isFavorited ? "currentColor" : "none"} // Preenche o coração se favoritado
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      
      {showLabel && (
        <span className={styles.favoriteLabel}>
          {isFavorited ? 'Favoritado' : 'Favoritar'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;