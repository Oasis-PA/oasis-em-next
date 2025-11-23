"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Importação do CSS Module
import styles from '@/styles/favorite-button.module.css';

interface FavoriteButtonProps {
  artigoId: number;
  initialIsFavorited?: boolean;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  artigoId, 
  initialIsFavorited = false,
  size = 'medium',
  showLabel = false
}) => {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkFavoriteStatus();
  }, [artigoId]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(`/api/favoritos/artigos/check/${artigoId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.isFavorited);
      }
    } catch (error) {
      // Tratamento silencioso ou log de erro
    }
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    setIsAnimating(true);

    try {
      const endpoint = isFavorited 
        ? `/api/favoritos/artigos/${artigoId}`
        : '/api/favoritos/artigos';

      const response = await fetch(endpoint, {
        method: isFavorited ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: isFavorited ? undefined : JSON.stringify({ id_artigo: artigoId }),
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
        } catch {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        alert(`Erro: ${errorMessage}\n\nVeja o console para mais detalhes.`);
        setIsAnimating(false);
      }
    } catch (error) {
      alert('Erro de conexão. Tente novamente.\n\nVeja o console para mais detalhes.');
      setIsAnimating(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Construção dinâmica das classes
  const buttonClasses = [
    styles.favoriteButton,
    styles[size], // Acessa dinamicamente .small, .medium ou .large
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
    >
      <svg
        className={styles.favoriteIcon}
        viewBox="0 0 24 24"
        fill="none"
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