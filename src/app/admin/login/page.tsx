"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/login-admin.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Credenciais inválidas');
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-box" style={{ maxWidth: '600px' }}>
          <div className="login-header">
            <h1>✅ Login realizado com sucesso!</h1>
            <p>Escolha para onde deseja ir</p>
          </div>

          <div className="admin-navigation">
            <button
              onClick={() => handleNavigate('/admin/artigos')}
              className="nav-card"
            >
              <div className="nav-icon">📝</div>
              <h3>Artigos</h3>
              <p>Gerenciar posts e artigos gerais</p>
            </button>

            <button
              onClick={() => handleNavigate('/admin/cortes')}
              className="nav-card"
            >
              <div className="nav-icon">✂️</div>
              <h3>Cortes de Cabelo</h3>
              <p>Gerenciar catálogo de cortes</p>
            </button>

          
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🔐 Admin</h1>
          <p>Painel de Administração</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              placeholder="Digite seu usuário"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}