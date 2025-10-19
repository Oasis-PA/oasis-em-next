// src/app/admin/artigos/editar/[id]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "@/styles/artigo.module.css";
import '@/styles/admin-artigos.css';

export default function EditarArtigoPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    conteudo: '',
    resumo: '',
    imagemHeader: '',
    status: 'rascunho',
    dataPublicacao: '',
    horaPublicacao: '',
    tags: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!params?.id) {
      router.push("/admin/artigos");
      return;
    }
    fetchArtigo();
  }, [params?.id]);

  const fetchArtigo = async () => {
    try {
      const response = await fetch(`/api/admin/artigos/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        
        let dataStr = '';
        let horaStr = '';
        if (data.dataPublicacao) {
          const dt = new Date(data.dataPublicacao);
          dataStr = dt.toISOString().split('T')[0];
          horaStr = dt.toTimeString().slice(0, 5);
        }

        setFormData({
          titulo: data.titulo,
          slug: data.slug,
          conteudo: data.conteudo,
          resumo: data.resumo || '',
          imagemHeader: data.imagemHeader || '',
          status: data.status,
          dataPublicacao: dataStr,
          horaPublicacao: horaStr,
          tags: data.tags ? data.tags.join(', ') : ''
        });
      } else {
        alert('Artigo não encontrado');
        router.push('/admin/artigos');
      }
    } catch (error) {
      console.error('Erro ao carregar artigo:', error);
      alert('Erro ao carregar artigo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // auto-gerar slug a partir do título se ainda não houver slug
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, tipo: 'header' | 'conteudo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Imagem muito grande! Máximo 5MB');
      return;
    }

    setUploadingImage(true);

    // exigir slug antes do upload (segurança/nomes consistentes)
    const slug = formData.slug?.trim() || "";
    if (!slug) {
      setUploadingImage(false);
      alert("Você deve definir o slug antes de enviar a imagem do header.");
      return;
    }

    const formDataImg = new FormData();
    formDataImg.append('file', file);
    formDataImg.append('tipo', tipo);
    formDataImg.append('slug', slug);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataImg,
      });

      if (response.ok) {
        const data = await response.json();

        if (tipo === 'header') {
          setFormData(prev => ({ ...prev, imagemHeader: data.url }));
          alert('Imagem do header atualizada!');
        } else {
          const markdownImg = `\n\n![Descrição da imagem](${data.url})\n\n`;
          setFormData(prev => ({
            ...prev,
            conteudo: prev.conteudo + markdownImg
          }));
          alert('Imagem adicionada ao conteúdo!');
        }
      } else {
        // tentar ler JSON de erro, fallback para texto
        let errBody = '';
        try {
          const j = await response.json();
          errBody = j.error || JSON.stringify(j);
        } catch {
          errBody = await response.text();
        }
        alert(errBody || 'Erro ao fazer upload');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao fazer upload');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let dataPublicacaoCompleta = null;
      if (formData.status === 'agendado' && formData.dataPublicacao) {
        const hora = formData.horaPublicacao || '12:00';
        dataPublicacaoCompleta = `${formData.dataPublicacao}T${hora}:00`;
      }

      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const dataToSend = {
        titulo: formData.titulo,
        slug: formData.slug,
        conteudo: formData.conteudo,
        resumo: formData.resumo || null,
        imagemHeader: formData.imagemHeader || null,
        status: formData.status,
        dataPublicacao: dataPublicacaoCompleta,
        tags: tagsArray
      };

      const response = await fetch(`/api/admin/artigos/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Artigo atualizado com sucesso!');
        router.push('/admin/artigos');
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao atualizar artigo');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar artigo');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="loading">Carregando artigo...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Editar Artigo</h1>
        <button onClick={() => router.back()} className="btn-secondary">
          ← Voltar
        </button>
      </header>

      <form onSubmit={handleSubmit} className="artigo-form">
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
            />
            <small>URL: /artigo/{formData.slug}</small>
          </div>
        </div>

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
              <option value="publicado">✓ Publicado</option>
              <option value="agendado">🕐 Agendado</option>
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
        </div>

        <div className="form-group">
          <label htmlFor="resumo">Resumo/Descrição (SEO)</label>
          <textarea
            id="resumo"
            name="resumo"
            value={formData.resumo}
            onChange={handleChange}
            placeholder="Breve descrição do artigo"
            rows={3}
            maxLength={160}
          />
          <small className={formData.resumo.length > 160 ? 'text-danger' : ''}>
            {formData.resumo.length}/160 caracteres
          </small>
        </div>

        <div className="form-group">
          <label>Imagem do Header</label>
          <div className="upload-zone">
            <input
              type="file"
              id="uploadHeader"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'header')}
              style={{ display: 'none' }}
              disabled={uploadingImage}
            />
            <label htmlFor="uploadHeader" className="upload-btn">
              {uploadingImage ? '⏳ Enviando...' : formData.imagemHeader ? '🔄 Trocar Imagem' : '📷 Escolher Imagem'}
            </label>
            {formData.imagemHeader && (
              <div className="image-preview">
                <img src={formData.imagemHeader} alt="Preview" />
                <button
                  type="button"
                  className="remove-img"
                  onClick={() => setFormData(prev => ({ ...prev, imagemHeader: '' }))}
                >
                  ✕ Remover
                </button>
              </div>
            )}
          </div>
          <small>Recomendado: 1920x400px | Max: 5MB</small>
        </div>

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
                <div className="editor-toolbar">
                  <label htmlFor="conteudo">Conteúdo (Markdown) *</label>
                  <div className="toolbar-buttons">
                    <input
                      type="file"
                      id="uploadConteudo"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'conteudo')}
                      style={{ display: 'none' }}
                      disabled={uploadingImage}
                    />
                    <label htmlFor="uploadConteudo" className="toolbar-btn">
                      {uploadingImage ? '⏳' : '🖼️ Adicionar Imagem'}
                    </label>
                  </div>
                </div>
                <textarea
                  id="conteudo"
                  name="conteudo"
                  value={formData.conteudo}
                  onChange={handleChange}
                  required
                  rows={20}
                />
                <div className="markdown-hints">
                  <strong>Dicas:</strong>
                  <code># Título</code>
                  <code>## Subtítulo</code>
                  <code>**negrito**</code>
                  <code>*itálico*</code>
                </div>
              </div>
            ) : (
              <div className="preview-area">
                <div className={styles.container}>
                  <article className={styles.article}>
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => <h1 className={styles.titulo}>{children}</h1>,
                        h2: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
                        h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
                        p: ({ children, node }) => {
                          const hasOnlyImage = node?.children?.length === 1 &&
                                              node.children[0].type === 'element' &&
                                              node.children[0].tagName === 'img';
                          if (hasOnlyImage) return <>{children}</>;
                          return <p className={styles.paragrafo}>{children}</p>;
                        },
                        ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
                        li: ({ children }) => <li>{children}</li>,
                        img: ({ src, alt, title }) => {
                          return (
                            <figure className={styles.artigoFigura}>
                              <img src={src} alt={alt || ''} className={styles.artigoImagem} />
                              {title && <figcaption className={styles.figcaption}>{title}</figcaption>}
                            </figure>
                          );
                        },
                      }}
                    >
                      {formData.conteudo}
                    </ReactMarkdown>
                  </article>
                </div>
              </div>
            )}
          </div>
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