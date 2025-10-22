"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface ArtigoCardProps {
  artigo: {
    id: number;
    titulo: string;
    slug: string;
    preview: string;
    dataFormatada: string;
  };
  isFavoritoInicial: boolean;
}

export default function ArtigoCard({ artigo, isFavoritoInicial }: ArtigoCardProps) {
  const { data: session, status } = useSession();
  const [isFavorito, setIsFavorito] = useState(isFavoritoInicial);
  const [loading, setLoading] = useState(false);

  const toggleFavorito = async (e: React.MouseEvent) => {
    e.preventDefault(); // Evita navegar para o artigo
    e.stopPropagation();

    if (status !== "authenticated") {
      if (confirm("Você precisa estar logado para favoritar. Ir para login?")) {
        window.location.href = "/login";
      }
      return;
    }

    setLoading(true);

    try {
      if (isFavorito) {
        // Remove dos favoritos
        const response = await fetch(
          `/api/favoritos/artigos?id_artigo=${artigo.id}`,
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
        const response = await fetch("/api/favoritos/artigos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_artigo: artigo.id }),
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

  return (
    <Link href={`/artigo/${artigo.slug}`} className="artigo-card">
      <div className="artigo-card-content">
        <div className="artigo-card-header">
          <span className="artigo-data">{artigo.dataFormatada}</span>
          <button
            onClick={toggleFavorito}
            disabled={loading}
            className={`btn-favoritar-card ${isFavorito ? 'favoritado' : ''}`}
            aria-label={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            {loading ? (
              <svg className="spinner-icon" width="20" height="20" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3"/>
                <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            ) : isFavorito ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            )}
          </button>
        </div>
        <h2 className="artigo-card-titulo">{artigo.titulo}</h2>
        <p className="artigo-preview">{artigo.preview}</p>
        <span className="artigo-ler-mais">Ler artigo completo →</span>
      </div>
    </Link>
  );
}