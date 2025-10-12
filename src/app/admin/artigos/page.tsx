// src/app/admin/artigos/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '@/styles/admin-complete.css';

interface Artigo {
  id: number;
  titulo: string;
  slug: string;
  status: string;
  dataPublicacao: string | null;
  tags: string[];
  createdAt: string;
}

export default function AdminArtigosPage() {
  const router = useRouter();
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('todos');

  useEffect(() => {
    fetchArtigos();
  }, [statusFilter]);

  const fetchArtigos = async () => {
    setIsLoading(true);
    try {
      const params = statusFilter !== 'todos' ? `?status=${statusFilter}` : '';
      const response = await fetch(`/api/admin/artigos${params}`);
      if (response.ok) {
        const data = await response.json();
        setArtigos(data);
      }
    } catch (error) {
      console.error('Erro ao carregar artigos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, titulo: string) => {
    if (!confirm(`Tem certeza que deseja excluir "${titulo}"?`)) return;

    try {
      const response = await fetch(`/api/admin/artigos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setArtigos(artigos.filter(a => a.id !== id));
        alert('Artigo excluído com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao excluir artigo:', error);
      alert('Erro ao excluir artigo');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const getStatusDisplay = (status: string, dataPublicacao: string | null) => {
    if (status === 'agendado' && dataPublicacao) {
      const data = new Date(dataPublicacao);
      return `🕐 ${data.toLocaleDateString('pt-BR')} ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    const statusMap: { [key: string]: string } = {
      publicado: '✓ Publicado',
      rascunho: '📝 Rascunho',
      agendado: '🕐 Agendado'
    };
    
    return statusMap[status] || status;
  };

  const stats = {
    total: artigos.length,
    publicados: artigos.filter(a => a.status === 'publicado').length,
    rascunhos: artigos.filter(a => a.status === 'rascunho').length,
    agendados: artigos.filter(a => a.status === 'agendado').length,
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>📝 Artigos</h1>
        <div className="header-actions">
          <Link href="/admin/artigos/novo" className="btn-primary">
            + Novo Artigo
          </Link>
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </header>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-num">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat published">
          <span className="stat-num">{stats.publicados}</span>
          <span className="stat-label">Publicados</span>
        </div>
        <div className="stat draft">
          <span className="stat-num">{stats.rascunhos}</span>
          <span className="stat-label">Rascunhos</span>
        </div>
        <div className="stat scheduled">
          <span className="stat-num">{stats.agendados}</span>
          <span className="stat-label">Agendados</span>
        </div>
      </div>

      <div className="filters">
        <button
          className={statusFilter === 'todos' ? 'active' : ''}
          onClick={() => setStatusFilter('todos')}
        >
          Todos
        </button>
        <button
          className={statusFilter === 'publicado' ? 'active' : ''}
          onClick={() => setStatusFilter('publicado')}
        >
          Publicados
        </button>
        <button
          className={statusFilter === 'rascunho' ? 'active' : ''}
          onClick={() => setStatusFilter('rascunho')}
        >
          Rascunhos
        </button>
        <button
          className={statusFilter === 'agendado' ? 'active' : ''}
          onClick={() => setStatusFilter('agendado')}
        >
          Agendados
        </button>
      </div>

      {isLoading ? (
        <div className="loading">Carregando...</div>
      ) : artigos.length === 0 ? (
        <div className="empty">
          <p>Nenhum artigo encontrado</p>
          <Link href="/admin/artigos/novo" className="btn-primary">
            Criar Primeiro Artigo
          </Link>
        </div>
      ) : (
        <div className="artigos-list">
          {artigos.map((artigo) => (
            <div key={artigo.id} className="artigo-item">
              <div className="artigo-content">
                <h3>{artigo.titulo}</h3>
                <p className="slug">/{artigo.slug}</p>
                <div className="artigo-meta">
                  <span className={`status ${artigo.status}`}>
                    {getStatusDisplay(artigo.status, artigo.dataPublicacao)}
                  </span>
                  {artigo.tags.length > 0 && (
                    <span className="tags">
                      🏷️ {artigo.tags.join(', ')}
                    </span>
                  )}
                  <span className="date">
                    {new Date(artigo.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
              <div className="artigo-actions">
                <Link href={`/artigo/${artigo.slug}`} className="btn-icon" target="_blank" title="Ver">
                  👁️
                </Link>
                <Link href={`/admin/artigos/editar/${artigo.id}`} className="btn-icon" title="Editar">
                  ✏️
                </Link>
                <button onClick={() => handleDelete(artigo.id, artigo.titulo)} className="btn-icon delete" title="Excluir">
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}