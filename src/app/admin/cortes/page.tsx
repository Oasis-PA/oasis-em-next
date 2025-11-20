"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '@/styles/admin-artigos.css';

interface Corte {
  id: number;
  nome: string;
  slug: string;
  status: string;
  dataPublicacao: string | null;
  criadoEm: string;
}

export default function AdminCortesPage() {
  const router = useRouter();
  const [cortes, setCortes] = useState<Corte[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('todos');

  useEffect(() => {
    fetchCortes();
  }, [statusFilter]);

  const fetchCortes = async () => {
    setIsLoading(true);
    try {
      const params = statusFilter !== 'todos' ? `?status=${statusFilter}` : '';
      const response = await fetch(`/api/admin/cortes${params}`);
      if (response.ok) {
        const data = await response.json();
        setCortes(data);
      }
    } catch (error) {
      console.error('Erro ao buscar cortes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir "${nome}"?`)) return;

    try {
      const response = await fetch(`/api/admin/cortes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCortes(cortes.filter(c => c.id !== id));
        alert('Corte excluído com sucesso!');
      }
    } catch (error) {
      alert('Erro ao excluir corte');
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
    total: cortes.length,
    publicados: cortes.filter(c => c.status === 'publicado').length,
    rascunhos: cortes.filter(c => c.status === 'rascunho').length,
    agendados: cortes.filter(c => c.status === 'agendado').length,
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>✂️ Cortes de Cabelo</h1>
        <div className="header-actions">
          <Link href="/admin/cortes/novo" className="btn-primary">
            + Novo Corte
          </Link>
          <Link href="/admin/agendamentos" className="btn-secondary">
            📅 Agendamentos
          </Link>
          <Link href="/admin/artigos" className="btn-secondary">
            📝 Artigos
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
      ) : cortes.length === 0 ? (
        <div className="empty">
          <p>Nenhum corte encontrado</p>
          <Link href="/admin/cortes/novo" className="btn-primary">
            Criar Primeiro Corte
          </Link>
        </div>
      ) : (
        <div className="artigos-list">
          {cortes.map((corte) => (
            <div key={corte.id} className="artigo-item">
              <div className="artigo-content">
                <h3>{corte.nome}</h3>
                <p className="slug">/{corte.slug}</p>
                <div className="artigo-meta">
                  <span className={`status ${corte.status}`}>
                    {getStatusDisplay(corte.status, corte.dataPublicacao)}
                  </span>
                  <span className="date">
                    {new Date(corte.criadoEm).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
              <div className="artigo-actions">
                <Link href={`/corte/${corte.slug}`} className="btn-icon" target="_blank" title="Ver">
                  👁️
                </Link>
                <Link href={`/admin/cortes/editar/${corte.id}`} className="btn-icon" title="Editar">
                  ✏️
                </Link>
                <button onClick={() => handleDelete(corte.id, corte.nome)} className="btn-icon delete" title="Excluir">
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