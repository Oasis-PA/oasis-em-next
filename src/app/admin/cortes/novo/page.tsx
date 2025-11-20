"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/admin-artigos.css';

export default function NovoCortePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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

    // Gerar slug temporário do nome para o upload
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
      alert('Imagem enviada com sucesso!');
    } catch (error) {
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/cortes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Corte criado com sucesso!');
        router.push('/admin/cortes');
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao criar corte');
      }
    } catch (error) {
      alert('Erro ao criar corte');
    } finally {
      setIsLoading(false);
    }
  };

  const salvarRascunho = () => {
    setFormData(prev => ({ ...prev, status: 'rascunho' }));
    setTimeout(() => {
      document.querySelector('form')?.requestSubmit();
    }, 100);
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>✂️ Novo Corte</h1>
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
            <option value="publicado">✓ Publicar Agora</option>
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
              {uploadingImage ? '⏳ Enviando...' : '📷 Escolher Imagem'}
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
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={salvarRascunho}
            className="btn-draft"
            disabled={isLoading}
          >
            💾 Salvar Rascunho
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 
             formData.status === 'publicado' ? '✓ Publicar' : '💾 Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}