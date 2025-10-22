"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface BotaoFavoritarProps {
  id_artigo: number;  // ✅ Mudado de artigoId: string
  isFavoritoInicial?: boolean;
}

export default function BotaoFavoritar({ 
  id_artigo,  // ✅ Mudado de artigoId
  isFavoritoInicial = false 
}: BotaoFavoritarProps) {
  const { data: session, status } = useSession();
  const [isFavorito, setIsFavorito] = useState(isFavoritoInicial);
  const [loading, setLoading] = useState(false);

  const toggleFavorito = async () => {
    if (status !== "authenticated") {
      alert("Você precisa estar logado para favoritar artigos");
      return;
    }

    setLoading(true);

    try {
      if (isFavorito) {
        // Remove dos favoritos
        const response = await fetch(
          `/api/favoritos/artigos?id_artigo=${id_artigo}`,  // ✅ Mudado
          { method: "DELETE" }
        );

        if (response.ok) {
          setIsFavorito(false);
        } else {
          const data = await response.json();
          alert(data.error || "Erro ao remover favorito");
        }
      } else {
        // Adiciona aos favoritos
        const response = await fetch("/api/favoritos/artigos", {  // ✅ Mudado
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_artigo }),  // ✅ Mudado
        });

        if (response.ok) {
          setIsFavorito(true);
        } else {
          const data = await response.json();
          alert(data.error || "Erro ao adicionar favorito");
        }
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao processar favorito");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <button className="botao-favoritar" disabled>
        Carregando...
      </button>
    );
  }

  if (status === "unauthenticated") {
    return (
      <button 
        className="botao-favoritar botao-favoritar-disabled"
        onClick={() => {
          if (confirm("Você precisa estar logado para favoritar. Ir para login?")) {
            window.location.href = "/login";
          }
        }}
      >
        🤍 Favoritar
      </button>
    );
  }

  return (
    <button
      onClick={toggleFavorito}
      disabled={loading}
      className={`botao-favoritar ${isFavorito ? 'favoritado' : ''}`}
      aria-label={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Processando...
        </>
      ) : isFavorito ? (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          Favoritado
        </>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          Favoritar
        </>
      )}
    </button>
  );
}