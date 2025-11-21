"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Verificar se o usuário é admin verificando o token ou sessionStorage
    const usuario = sessionStorage.getItem('usuario');

    if (!usuario) {
      router.push('/admin/login');
      return;
    }

    try {
      const usuarioData = JSON.parse(usuario);
      if (!usuarioData.is_admin) {
        router.push('/');
        return;
      }
    } catch (error) {
      router.push('/admin/login');
      return;
    }

    setIsVerifying(false);
  }, [router]);

  if (isVerifying) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Verificando acesso...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Painel de Administrador</h1>
      <p>Bem-vindo ao portal administrativo da Oasis!</p>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        <Link href="/admin/artigos" style={{
          padding: '1.5rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
        >
          <h2>Artigos</h2>
          <p>Gerenciar artigos do site</p>
        </Link>

        <Link href="/admin/cortes" style={{
          padding: '1.5rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          textDecoration: 'none',
          color: 'inherit',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
        >
          <h2>Cortes</h2>
          <p>Gerenciar cortes de cabelo</p>
        </Link>
      </div>
    </div>
  );
}
