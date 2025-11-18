"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/styles/componentes.css';

interface User {
  nome: string;
}

interface HeaderProps {
  backgroundImage?: string;
  backgroundColor?: string;
  className?: string; 
  theme?: 'light' | 'dark';
}

export default function Header({ backgroundImage, backgroundColor = 'white', className, theme = 'light' }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

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
    <>
      <nav className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* NOVO: Botão 'X' para fechar o menu */}
        <button className="close-menu-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Fechar menu">
          &times;
        </button>
        <Link href="/cortes-geral" onClick={handleLinkClick}>Cortes</Link>
        <Link href="/haircare" onClick={handleLinkClick}>Hair Care</Link>
        <Link href="/tinturas" onClick={handleLinkClick}>Tinturas</Link>
        <Link href="/skincare" onClick={handleLinkClick}>Skincare</Link>
        <Link href="/cronograma-capilar" onClick={handleLinkClick}>Cronograma Capilar</Link>
        <Link href="/infantil" onClick={handleLinkClick}>Infantil</Link>

        {/* Divisor */}
        <hr style={{ margin: '15px 0', borderColor: 'rgba(0,0,0,0.1)' }} />

        {/* Links de usuário */}
        {user && (
          <>
            <Link href="/perfil" onClick={handleLinkClick}>Editar Perfil</Link>
            <Link href="/gerenciamento" onClick={handleLinkClick}>Gerenciamento de Conta</Link>
            <Link href="/favoritos" onClick={handleLinkClick}>Favoritos</Link>
          </>
        )}
      </nav>

      <header style={headerStyle} className={`${theme} ${className || ''}`}>
        <section className="em_ciminha">
          {/* NOVO: Wrapper para agrupar menu e logo */}
          <div className="header-left">
            <div className="hamburger-menu" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            
            <Link href="/">
              <div id="imagi" aria-label="Página inicial"></div>
            </Link>
          </div>

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
                      <Link href="/perfil" onClick={() => setPopupVisible(false)}>Editar Perfil</Link>
                      <Link href="/gerenciamento" onClick={() => setPopupVisible(false)}>Gerenciamento de Conta</Link>
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
    </>
  );
}