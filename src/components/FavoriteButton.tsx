"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/favorite-button.css';

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
    // Verifica o estado inicial do favorito
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
      console.error('Erro ao verificar status do favorito:', error);
    }
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    console.log('🔹 Clicou no favorito. artigoId:', artigoId, 'isFavorited:', isFavorited);

    setIsLoading(true);
    setIsAnimating(true);

    try {
      const endpoint = isFavorited 
        ? `/api/favoritos/artigos/${artigoId}`
        : '/api/favoritos/artigos';

      console.log('🔹 Endpoint:', endpoint);
      console.log('🔹 Method:', isFavorited ? 'DELETE' : 'POST');

      const response = await fetch(endpoint, {
        method: isFavorited ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: isFavorited ? undefined : JSON.stringify({ id_artigo: artigoId }),
      });

      console.log('🔹 Response status:', response.status);
      console.log('🔹 Response ok:', response.ok);

      if (response.status === 401) {
        // Usuário não autenticado, redireciona para login
        console.log('⚠️ Não autenticado, redirecionando para /login');
        router.push('/login');
        return;
      }

      if (response.ok) {
        console.log('✅ Sucesso! Alternando estado...');
        setIsFavorited(!isFavorited);
        setTimeout(() => setIsAnimating(false), 300);
      } else {
        // Tenta ler o erro como JSON, senão usa texto
        let errorMessage = 'Erro ao processar favorito';
        let errorDetails = {};
        try {
          const errorData = await response.json();
          console.log('❌ Erro JSON:', errorData);
          errorMessage = errorData.error || errorData.message || errorMessage;
          errorDetails = errorData;
        } catch {
          const errorText = await response.text();
          console.log('❌ Erro Text:', errorText);
          errorMessage = errorText || errorMessage;
        }
        console.error('❌ Erro ao favoritar:', errorMessage);
        console.error('❌ Detalhes completos:', errorDetails);
        alert(`Erro: ${errorMessage}\n\nVeja o console para mais detalhes.`);
        setIsAnimating(false);
      }
    } catch (error) {
      console.error('❌ Erro ao processar favorito:', error);
      alert('Erro de conexão. Tente novamente.\n\nVeja o console para mais detalhes.');
      setIsAnimating(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`favorite-button favorite-button--${size} ${isAnimating ? 'favorite-button--animating' : ''}`}
      aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <svg
        className={`favorite-icon ${isFavorited ? 'favorite-icon--filled' : ''}`}
        viewBox="0 0 24 24"
        fill={isFavorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {showLabel && (
        <span className="favorite-label">
          {isFavorited ? 'Favoritado' : 'Favoritar'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;