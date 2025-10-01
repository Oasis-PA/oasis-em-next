"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/styles/header.module.css';

interface UserData {
  nome: string;
}

export default function Header() {  
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null); // Ref para detectar cliques fora do menu

  // Efeito para verificar a autenticação inicial
  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const res = await fetch('/api/usuarios/perfil');
        if (res.ok) {
          const userData: UserData = await res.json();
          setUsuarioLogado(true);
          setNomeUsuario(userData.nome);
        } else {
          setUsuarioLogado(false);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setUsuarioLogado(false);
      } finally {
        setLoading(false);
      }
    };
    verificarAutenticacao();
  }, []);

  // Efeito para fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/usuarios/logout', { method: 'POST' });
    setUsuarioLogado(false);
    setNomeUsuario('');
    setIsMenuOpen(false);
    router.push('/'); // Redireciona para a home após o logout
    router.refresh(); // Força a atualização dos componentes de servidor
  };

  return (
    <header className={styles.header}>
      <div className={styles.tudinho}>
        <section className={styles.emCiminha}>
          <div>
            <Link href="/">
              <Image 
                className={styles.logo} 
                src="/images/logo.png" 
                alt="Logo Oasis" 
                width={400} 
                height={400} 
                priority // Otimiza o carregamento da logo
              />
            </Link>
          </div>

          <div className={styles.interagivel}>
            <Link href="/pesquisa">
              <Image src="/images/lupa.png" alt="Buscar" width={50} height={50} />
            </Link>
            <Link href="/favoritos">
              <Image src="/images/salvo.png" alt="Salvos" width={50} height={50} />
            </Link>

            {/* Lógica condicional: Menu do Usuário ou Botão de Login */}
            {loading ? (
              <div style={{width: '50px', height: '50px'}}></div> // Placeholder
            ) : usuarioLogado ? (
              <div className={styles.userMenuContainer} ref={menuRef}>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={styles.profileButton}
                >
                  <Image src="/images/perfil.png" alt="Meu Perfil" width={50} height={50} />
                   <span className={styles.onlineIndicator} />
                </button>
                {isMenuOpen && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownHeader}>
                      Olá, {nomeUsuario}!
                    </div>
                    <Link href="/perfil" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>
                      Configurações do Perfil
                    </Link>
                     <Link href="/favoritos" className={styles.dropdownItem} onClick={() => setIsMenuOpen(false)}>
                      Meus Favoritos
                    </Link>
                    <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutButton}`}>
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={styles.profileButton}>
                <Image src="/images/perfil.png" alt="Fazer Login" width={50} height={50} />
              </Link>
            )}
          </div>
        </section>

        <section className={styles.emBaixinho}>
          {/* Navegação Secundária */}
        </section>
      </div>
    </header>
  );
}