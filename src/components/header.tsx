// Em: src/components/Header.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/styles/componentes.css';

interface User {
  nome: string;
}

// 👇 Nova interface para as props do Header
interface HeaderProps {
  backgroundImage?: string; // URL da imagem de fundo (opcional)
  backgroundColor?: string; // Cor de fundo alternativa (opcional)
}

// 👇 Adicionar props ao componente
export default function Header({ backgroundImage, backgroundColor = 'white' }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch('/api/usuarios/perfil');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Falha ao buscar perfil do usuário:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/usuarios/logout', { method: 'POST' });
    setUser(null);
    setPopupVisible(false);
    window.location.href = '/login';
  };

  // 👇 Estilo dinâmico para o header
  const headerStyle: React.CSSProperties = {
    ...(backgroundImage && {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }),
    ...(!backgroundImage && { backgroundColor }),
  };

  return (
    <header style={headerStyle}>
      <section className="em_ciminha">
        <Link href="/">
          <div id="imagi" aria-label="Página inicial"></div>
        </Link>
        <div className="emoticus">
          <Link href="/guia">
            <div id="algo" aria-label="Buscar"></div>
          </Link>
          <Link href="/favoritos">
            <div id="coracao" aria-label="Favoritos"></div>
          </Link>
          
          <div className="user-menu-container">
            {isLoading ? (
              <div id="user-placeholder"></div>
            ) : user ? (
              <>
                <div id="user" aria-label="Perfil" onClick={() => setPopupVisible(!isPopupVisible)}></div>
                {isPopupVisible && (
                  <div className="user-popup">
                    <p>Olá, {user.nome}!</p>
                    <Link href="/perfil" onClick={() => setPopupVisible(false)}>Meu Perfil</Link>
                    <button onClick={handleLogout}>Sair</button>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login">
                <div id="user" aria-label="Login"></div>
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className="em_baixinho">
        <div className="coisas">
          <Link href="/cortes-geral" id="redirecionavel">Cortes</Link>
          <Link href="/haircare" id="redirecionavel">Hair Care</Link>
          <Link href="/tinturas" id="redirecionavel">Tinturas</Link>
          <Link href="/skincare" id="redirecionavel">Skincare</Link>
          <Link href="/cronograma-capilar" id="redirecionavel2">Cronograma Capilar</Link>
          <Link href="/infantil" id="redirecionavel">Infantil</Link>
        </div>
      </section>
    </header>
  );
}