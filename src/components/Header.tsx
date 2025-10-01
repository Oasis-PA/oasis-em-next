"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Header.module.css';

interface UserData {
  id_usuario: number;
  nome: string;
  email: string;
}

export default function Header() {  
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    verificarAutenticacao();
  }, []);

  const verificarAutenticacao = async () => {
    try {
      const res = await fetch('/api/usuarios/perfil', {
        credentials: 'include'
      });
      
      if (res.ok) {
        const userData: UserData = await res.json();
        setUsuarioLogado(true);
        setNomeUsuario(userData.nome);
      } else {
        setUsuarioLogado(false);
        setNomeUsuario('');
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setUsuarioLogado(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePerfilClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (usuarioLogado) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
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
              />
            </Link>
          </div>

          <div className={styles.interagivel}>
            <Link href="/pesquisa">
              <Image 
                src="/images/lupa.png" 
                alt="Buscar" 
                width={50} 
                height={50} 
              />
            </Link>
            <Link href="/favoritos">
              <Image 
                src="/images/salvo.png" 
                alt="Salvos" 
                width={50} 
                height={50} 
              />
            </Link>
            <button 
              onClick={handlePerfilClick}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                padding: 0,
                position: 'relative'
              }}
              title={usuarioLogado ? `Olá, ${nomeUsuario}` : 'Fazer login'}
              disabled={loading}
            >
              <Image 
                src="/images/perfil.png" 
                alt={usuarioLogado ? 'Meu Perfil' : 'Login'} 
                width={50} 
                height={50} 
              />
              {usuarioLogado && (
                <span style={{
                  position: 'absolute',
                  bottom: '-5px',
                  right: '-5px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  border: '2px solid white'
                }} />
              )}
            </button>
          </div>
        </section>

        <section className={styles.emBaixinho}>
          <p className={styles.headerTit1}>Cortes</p>
          <p className={styles.headerTit1}>Hair Care</p>
          <p className={styles.headerTit1}>Tinturas</p>
          <p className={styles.headerTit1}>Skincare</p>
          <p className={styles.headerTit2}>Cronograma Capilar</p>
          <p className={styles.headerTit1}>Infantil</p>
        </section>
      </div>
    </header>
  );
}