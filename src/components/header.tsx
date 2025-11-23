"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/header.module.css';


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
      <nav className={`${styles.mobile_menu} ${isMobileMenuOpen ? styles.open : ''}`}>
        {/* NOVO: Botão 'X' para fechar o menu */}
        <button className={styles.close_menu_btn} onClick={() => setMobileMenuOpen(false)} aria-label="Fechar menu">
          &times;
        </button>
        <Link href="/cortes-geral" onClick={handleLinkClick}>Cortes</Link>
        <Link href="/artigo" onClick={handleLinkClick}>Artigos</Link>
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

      <header style={headerStyle} className={`${styles.header} ${theme === 'dark' ? styles.dark : ''} ${className || ''}`}>
        <section className={styles.em_ciminha}>
          {/* NOVO: Wrapper para agrupar menu e logo */}
          <div className={styles.header_left}>
            <div className={styles.hamburger_menu} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
            </div>
            
            <Link href="/">
              <div className={styles.imagi} aria-label="Página inicial"></div>
            </Link>
          </div>

          <div className={styles.emoticus}>
            <Link href="/guia">
              <div className={styles.algo} aria-label="Buscar"></div>
            </Link>
            <Link href="/favoritos">
              <div className={styles.coracao} aria-label="Favoritos"></div>
            </Link>
            
            <div className={styles.user_menu_container}>
              {isLoading ? (
                <div className={styles.user_placeholder}></div>
              ) : user ? (
                <>
                  <div className={styles.user} aria-label="Perfil" onClick={() => setPopupVisible(!isPopupVisible)}></div>
                  {isPopupVisible && (
                    <div className={styles.user_popup}>
                      <p>Olá, {user.nome}!</p>
                      <Link href="/perfil" onClick={() => setPopupVisible(false)}>Editar Perfil</Link>
                      <Link href="/gerenciamento" onClick={() => setPopupVisible(false)}>Gerenciamento de Conta</Link>
                      <button onClick={handleLogout}>Sair</button>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/login">
                  <div className={styles.user} aria-label="Login"></div>
                </Link>
              )}
            </div>
          </div>
        </section>
        <section className={styles.em_baixinho}>
          <div className={styles.coisas}>
            <Link href="/corte" className={styles.redirecionavel}>Cortes</Link>
            <Link href="/artigo" className={styles.redirecionavel}>Artigos</Link>
            <Link href="/tinturas" className={styles.redirecionavel}>Tinturas</Link>
            <Link href="/skincare" className={styles.redirecionavel}>Skincare</Link>
            <Link href="/cronograma-capilar" className={styles.redirecionavel2}>Cronograma Capilar</Link>
            <Link href="/infantil" className={styles.redirecionavel}>Infantil</Link>
          </div>
        </section>
      </header>
    </>
  );
}