"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserData {
  id_usuario: number;
  nome: string;
  email: string;
  sobrenome?: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  const carregarDadosUsuario = async () => {
    try {
      const res = await fetch("/api/usuarios/perfil", {
        credentials: 'include'
      });

      if (!res.ok) {
        router.push("/login");
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);

    try {
      const res = await fetch("/api/usuarios/logout", {
        method: "POST",
        credentials: 'include'
      });

      if (res.ok) {
        // Limpa qualquer dado do sessionStorage
        sessionStorage.clear();
        
        // Redireciona para home
        router.push("/");
        router.refresh();
      } else {
        alert("Erro ao fazer logout");
        setLogoutLoading(false);
      }
    } catch (error) {
      console.error("Erro no logout:", error);
      alert("Erro ao fazer logout");
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ 
        borderBottom: '2px solid #e5e7eb', 
        paddingBottom: '1rem',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Olá, {user?.nome}! 👋
          </h1>
          <p style={{ color: '#6b7280' }}>{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: logoutLoading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            opacity: logoutLoading ? 0.5 : 1
          }}
        >
          {logoutLoading ? 'Saindo...' : 'Sair'}
        </button>
      </header>

      <main>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <Link href="/perfil" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                👤 Meu Perfil
              </h3>
              <p style={{ color: '#6b7280' }}>
                Edite suas informações pessoais
              </p>
            </div>
          </Link>

          <Link href="/gerenciamento-conta" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                ⚙️ Configurações
              </h3>
              <p style={{ color: '#6b7280' }}>
                Gerencie sua conta
              </p>
            </div>
          </Link>

          <Link href="/meuperfil-before" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                🎨 Meu Avatar
              </h3>
              <p style={{ color: '#6b7280' }}>
                Crie seu perfil único
              </p>
            </div>
          </Link>

          <Link href="/favoritos" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' }}>
                ❤️ Favoritos
              </h3>
              <p style={{ color: '#6b7280' }}>
                Veja seus itens salvos
              </p>
            </div>
          </Link>
        </div>

        <div style={{ 
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#fef3c7',
          borderRadius: '0.5rem',
          border: '2px solid #fbbf24'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            🎯 Complete seu perfil
          </h3>
          <p style={{ color: '#92400e', marginBottom: '1rem' }}>
            Personalize sua experiência respondendo ao questionário!
          </p>
          <Link href="/no-seu-perfil">
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#fbbf24',
              color: '#78350f',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Começar agora
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}