"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import '@/styles/admin-artigos.css';

export default function EditarCortePage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    historia: '',
    comoFazer: '',
    rostoCompativel: '',
    comoArrumar: '',
    imagemPrincipal: '',
    status: 'rascunho',
  });

  useEffect(() => {
    if (!params?.id) {
      router.push('/admin/cortes');
      return;
    }
    fetchCorte();
  }, [params?.id]);

  const fetchCorte = async () => {
    try {
      const response = await fetch(`/api/admin/cortes/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          nome: data.nome,
          descricao: data.descricao,
          historia: data.historia || '',
          comoFazer: data.comoFazer || '',
          rostoCompativel: data.rostoCompativel || '',
          comoArrumar: data.comoArrumar || '',
          imagemPrincipal: data.imagemPrincipal || '',
          status: data.status,
        });
      } else {
        alert('Corte não encontrado');
        router.push('/admin/cortes');
      }
    } catch (error) {
      alert('Erro ao carregar corte');
      router.push('/admin/cortes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Imagem muito grande! Máximo 5MB');
      return;
    }

    setUploadingImage(true);

    const slug = formData.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'corte-temp';

    const fd = new FormData();
    fd.append('file', file);
    fd.append('tipo', 'corte');
    fd.append('slug', slug);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      
      if (!res.ok) {
        const body = await res.text();
        alert('Falha no upload: ' + body);
        return;
      }
      
      const data = await res.json();
      setFormData(prev => ({ ...prev, imagemPrincipal: data.url }));
      alert('Imagem atualizada com sucesso!');
    } catch (error) {
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/cortes/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Corte atualizado com sucesso!');
        router.push('/admin/cortes');
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao atualizar corte');
      }
    } catch (error) {
      alert('Erro ao atualizar corte');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="loading">Carregando corte...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>✂️ Editar Corte</h1>
        <button onClick={() => router.back()} className="btn-secondary">
          ← Voltar
        </button>
      </header>

      <form onSubmit={handleSubmit} className="artigo-form">
        <div className="form-group">
          <label htmlFor="nome">Nome do Corte *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: Pixie Cut"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="rascunho">📝 Rascunho</option>
            <option value="publicado">✓ Publicado</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição *</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva o corte de forma geral..."
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="historia">Quando surgiu?</label>
          <textarea
            id="historia"
            name="historia"
            value={formData.historia}
            onChange={handleChange}
            placeholder="Conte a história do corte..."
            rows={5}
          />
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="comoFazer">Como fazer</label>
            <textarea
              id="comoFazer"
              name="comoFazer"
              value={formData.comoFazer}
              onChange={handleChange}
              placeholder="Explique como fazer o corte..."
              rows={6}
            />
          </div>

          <div className="form-group flex-1">
            <label htmlFor="rostoCompativel">Com qual rosto combina?</label>
            <textarea
              id="rostoCompativel"
              name="rostoCompativel"
              value={formData.rostoCompativel}
              onChange={handleChange}
              placeholder="Descreva os tipos de rosto compatíveis..."
              rows={6}
            />
          </div>

          <div className="form-group flex-1">
            <label htmlFor="comoArrumar">Como arrumar</label>
            <textarea
              id="comoArrumar"
              name="comoArrumar"
              value={formData.comoArrumar}
              onChange={handleChange}
              placeholder="Dicas de como arrumar o corte..."
              rows={6}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Imagem Principal</label>
          <div className="upload-zone">
            <input
              type="file"
              id="uploadImagem"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              disabled={uploadingImage}
            />
            <label htmlFor="uploadImagem" className="upload-btn">
              {uploadingImage ? '⏳ Enviando...' : formData.imagemPrincipal ? '🔄 Trocar Imagem' : '📷 Escolher Imagem'}
            </label>
            {formData.imagemPrincipal && (
              <div className="image-preview">
                <img src={formData.imagemPrincipal} alt="Preview" />
                <button
                  type="button"
                  className="remove-img"
                  onClick={() => setFormData(prev => ({ ...prev, imagemPrincipal: '' }))}
                >
                  ✕ Remover
                </button>
              </div>
            )}
          </div>
          <small>Recomendado: 800x600px | Max: 5MB</small>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSaving}
          >
            {isSaving ? 'Salvando...' : '✓ Atualizar'}
          </button>
        </div>
      </form>
    </div>
  );
}