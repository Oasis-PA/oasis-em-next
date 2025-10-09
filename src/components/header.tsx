// Em: src/components/Header.tsx
"use client"; // 👈 1. Transformado em Componente de Cliente

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/styles/componentes.css';

// Interface para definir a estrutura dos dados do utilizador
interface User {
  nome: string;
}

export default function Header() {
  // 2. Estados para gerir os dados do utilizador e a visibilidade do popup
  const [user, setUser] = useState<User | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  // 3. Efeito para ir buscar os dados do utilizador no lado do cliente
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        // A API /api/usuarios/perfil irá ler o cookie no backend e retornar os dados
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
        setIsLoading(false); // Termina o carregamento
      }
    }

    fetchUserProfile();
  }, []);

  // 4. Função para fazer logout
  const handleLogout = async () => {
    await fetch('/api/usuarios/logout', { method: 'POST' });
    setUser(null);
    setPopupVisible(false);
    window.location.href = '/login'; // Redireciona para o login após sair
  };

  return (
    <header>
      <section className="em_ciminha">
        <Link href="/">
          <div id="imagi" aria-label="Página inicial"></div>
        </Link>
        <div className="emoticus">
          <Link href="/">
            <div id="algo" aria-label="Buscar"></div>
          </Link>
          <Link href="/favoritos">
            <div id="coracao" aria-label="Favoritos"></div>
          </Link>
          
          <div className="user-menu-container"> {/* Container para posicionar o popup */}
            {isLoading ? (
              // Opcional: mostrar um placeholder enquanto carrega
              <div id="user-placeholder"></div>
            ) : user ? (
              // 5. Utilizador LOGADO: mostra ícone que abre o popup
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
              // 6. Utilizador DESLOGADO: link direto para o login
              <Link href="/login">
                <div id="user" aria-label="Login"></div>
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className="em_baixinho">
        {/* ... links de navegação ... */}
        <div className="coisas">
          <Link href="/corteS" id="redirecionavel">Cortes</Link>
          <Link href="/" id="redirecionavel">Hair Care</Link>
          <Link href="/tinturas" id="redirecionavel">Tinturas</Link>
          <Link href="/skincare" id="redirecionavel">Skincare</Link>
          <Link href="/cronograma-capilar" id="redirecionavel2">Cronograma Capilar</Link>
          <Link href="/infantil" id="redirecionavel">Infantil</Link>
        </div>
      </section>
    </header>
  );
}
