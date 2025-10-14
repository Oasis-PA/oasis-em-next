// src/app/admin/artigos/novo/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import '@/styles/admin-artigos.css';
import styles from "@/styles/artigo.module.css"; // <-- import

export default function NovoArtigoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    conteudo: '',
    resumo: '',
    status: 'rascunho',
    dataPublicacao: '',
    horaPublicacao: '',
    tags: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Gera slug automaticamente ao digitar o título
    if (name === 'titulo' && !formData.slug) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Combina data e hora se status for agendado
      let dataPublicacaoCompleta = null;
      if (formData.status === 'agendado' && formData.dataPublicacao) {
        const hora = formData.horaPublicacao || '12:00';
        dataPublicacaoCompleta = `${formData.dataPublicacao}T${hora}:00`;
      }

      // Converte tags de string para array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const dataToSend = {
        titulo: formData.titulo,
        slug: formData.slug,
        conteudo: formData.conteudo,
        resumo: formData.resumo || null,
        status: formData.status,
        dataPublicacao: dataPublicacaoCompleta,
        tags: tagsArray
      };

      const response = await fetch('/api/admin/artigos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Artigo salvo com sucesso!');
        router.push('/admin/artigos');
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao salvar artigo');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao salvar artigo');
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
        <h1>Novo Artigo</h1>
        <button onClick={() => router.back()} className="btn-secondary">
          ← Voltar
        </button>
      </header>

      <form onSubmit={handleSubmit} className="artigo-form">
        {/* Linha 1: Título e Slug */}
        <div className="form-row">
          <div className="form-group flex-2">
            <label htmlFor="titulo">Título *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Ex: 5 Dicas de Skincare para o Verão"
            />
          </div>

          <div className="form-group flex-1">
            <label htmlFor="slug">Slug (URL) *</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="dicas-skincare-verao"
            />
            <small>URL: /artigo/{formData.slug || 'seu-slug'}</small>
          </div>
        </div>

        {/* Linha 2: Status e Agendamento */}
        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="rascunho">📝 Rascunho</option>
              <option value="publicado">✓ Publicar Agora</option>
              <option value="agendado">🕐 Agendar Publicação</option>
            </select>
          </div>

          {formData.status === 'agendado' && (
            <>
              <div className="form-group flex-1">
                <label htmlFor="dataPublicacao">Data *</label>
                <input
                  type="date"
                  id="dataPublicacao"
                  name="dataPublicacao"
                  value={formData.dataPublicacao}
                  onChange={handleChange}
                  required={formData.status === 'agendado'}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group flex-1">
                <label htmlFor="horaPublicacao">Hora</label>
                <input
                  type="time"
                  id="horaPublicacao"
                  name="horaPublicacao"
                  value={formData.horaPublicacao}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="form-group">
          <label htmlFor="tags">Tags (separadas por vírgula)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="skincare, beleza, tutorial"
          />
          <small>Ex: skincare, beleza, rotina</small>
        </div>

        {/* Resumo com contador */}
        <div className="form-group">
          <label htmlFor="resumo">Resumo/Descrição (SEO)</label>
          <textarea
            id="resumo"
            name="resumo"
            value={formData.resumo}
            onChange={handleChange}
            placeholder="Breve descrição do artigo (recomendado 150-160 caracteres)"
            rows={3}
            maxLength={160}
          />
          <small className={formData.resumo.length > 160 ? 'text-danger' : ''}>
            {formData.resumo.length}/160 caracteres
          </small>
        </div>

        {/* Editor com Preview */}
        <div className="editor-wrapper">
          <div className="editor-tabs">
            <button
              type="button"
              className={!showPreview ? 'tab active' : 'tab'}
              onClick={() => setShowPreview(false)}
            >
              ✏️ Editor
            </button>
            <button
              type="button"
              className={showPreview ? 'tab active' : 'tab'}
              onClick={() => setShowPreview(true)}
            >
              👁️ Preview
            </button>
          </div>

          <div className="editor-content">
            {!showPreview ? (
              <div className="editor-area">
                <label htmlFor="conteudo">Conteúdo (Markdown) *</label>
                <textarea
                  id="conteudo"
                  name="conteudo"
                  value={formData.conteudo}
                  onChange={handleChange}
                  required
                  rows={20}
                  placeholder="# Título Principal&#10;&#10;Escreva seu artigo aqui...&#10;&#10;## Subtítulo&#10;&#10;**Negrito** e *itálico*&#10;&#10;![Imagem](/images/artigos/imagem.png)"
                />
                <div className="markdown-hints">
                  <strong>Dicas:</strong>
                  <code># Título</code>
                  <code>## Subtítulo</code>
                  <code>**negrito**</code>
                  <code>*itálico*</code>
                  <code>![alt](/url)</code>
                </div>
              </div>
            ) : (
              <div className="preview-area">
                {formData.conteudo ? (
                  <div className={styles.container}>
                    <article className={styles.article}>
                      <ReactMarkdown
                        components={{
                          p: ({ children, node }) => {
                            const hasOnlyImage = node?.children?.length === 1 && 
                                                node.children[0].type === 'element' && 
                                                node.children[0].tagName === 'img';
                            if (hasOnlyImage) return <>{children}</>;
                            return <p>{children}</p>;
                          },
                          img: ({ src, alt }) => (
                            <figure className={styles.artigoFigura}>
                              <img src={src} alt={alt || ''} className={styles.artigoImagem} />
                            </figure>
                          ),
                          h1: ({ children }) => <h1 className={styles.titulo}>{children}</h1>,
                          h2: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
                          ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
                        }}
                      >
                        {formData.conteudo}
                      </ReactMarkdown>
                    </article>
                  </div>
                ) : (
                  <p className="preview-empty">Nenhum conteúdo para visualizar</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Ações */}
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
             formData.status === 'publicado' ? '✓ Publicar' :
             formData.status === 'agendado' ? '🕐 Agendar' :
             '💾 Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}