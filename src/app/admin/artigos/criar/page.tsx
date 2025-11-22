// src/app/admin/artigos/novo/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import '@/styles/admin-artigos.css';
import styles from "@/styles/artigo.module.css";

interface CategoriaArtigo {
  id_categoria: number;
  nome: string;
  slug: string;
}

export default function NovoArtigoPage() {
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
    id_categoria: '',
    themeDark: false
  });
  const [categorias, setCategorias] = useState<CategoriaArtigo[]>([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [criandoCategoria, setCriandoCategoria] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('/api/admin/categorias-artigos');
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleCriarCategoria = async () => {
    if (!novaCategoria.trim()) {
      alert('Digite o nome da categoria');
      return;
    }

    setCriandoCategoria(true);
    try {
      const response = await fetch('/api/admin/categorias-artigos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novaCategoria.trim() })
      });

      if (response.ok) {
        const data = await response.json();
        setCategorias(prev => [...prev, data.categoria]);
        setFormData(prev => ({ ...prev, id_categoria: String(data.categoria.id_categoria) }));
        setNovaCategoria('');
        alert('Categoria criada com sucesso!');
      } else {
        const error = await response.json();
        alert(error.error || 'Erro ao criar categoria');
      }
    } catch (error) {
      alert('Erro ao criar categoria');
    } finally {
      setCriandoCategoria(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

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

    const slug = formData.slug?.trim() || "";
    if (!slug) {
      setUploadingImage(false);
      alert("Você deve definir o slug antes de enviar a imagem do header.");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("tipo", tipo);
    fd.append("slug", slug);

    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) {
      const body = await res.text();
      alert("Falha no upload: " + body);
      setUploadingImage(false);
      return;
    }
    const data = await res.json();

    try {
      if (tipo === 'header') {
        setFormData(prev => ({ ...prev, imagemHeader: data.url }));
        alert('Imagem do header enviada!');
      } else {
        const markdownImg = `\n\n![Descrição da imagem](${data.url})\n\n`;
        setFormData(prev => ({
          ...prev,
          conteudo: prev.conteudo + markdownImg
        }));
        alert('Imagem adicionada ao conteúdo!');
      }
    } catch (error) {
      alert('Erro ao processar a imagem');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let dataPublicacaoCompleta = null;
      if (formData.status === 'agendado' && formData.dataPublicacao) {
        const hora = formData.horaPublicacao || '12:00';
        dataPublicacaoCompleta = `${formData.dataPublicacao}T${hora}:00`;
      }

      // Verificar se a categoria existe antes de enviar
      if (formData.id_categoria) {
        const categoriaExiste = categorias.some(
          cat => cat.id_categoria === parseInt(formData.id_categoria)
        );
        if (!categoriaExiste) {
          alert('Categoria selecionada não existe. Por favor, selecione uma categoria válida.');
          setIsLoading(false);
          return;
        }
      }

      const dataToSend = {
        titulo: formData.titulo,
        slug: formData.slug,
        conteudo: formData.conteudo,
        resumo: formData.resumo || null,
        imagemHeader: formData.imagemHeader || null,
        status: formData.status,
        dataPublicacao: dataPublicacaoCompleta,
        id_categoria: formData.id_categoria ? parseInt(formData.id_categoria) : null,
        themeDark: formData.themeDark
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

        <div className="form-group">
          <label htmlFor="id_categoria">Categoria</label>
          <div className="categoria-selector">
            <select
              id="id_categoria"
              name="id_categoria"
              value={formData.id_categoria}
              onChange={handleChange}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nome}
                </option>
              ))}
            </select>
            <div className="criar-categoria">
              <input
                type="text"
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
                placeholder="Nova categoria..."
                maxLength={50}
              />
              <button
                type="button"
                onClick={handleCriarCategoria}
                disabled={criandoCategoria || !novaCategoria.trim()}
                className="btn-small"
              >
                {criandoCategoria ? '...' : '+ Criar'}
              </button>
            </div>
          </div>
          <small>Selecione uma categoria existente ou crie uma nova</small>
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="themeDark"
              checked={formData.themeDark}
              onChange={(e) => setFormData(prev => ({ ...prev, themeDark: e.target.checked }))}
              style={{ width: 'auto', cursor: 'pointer' }}
            />
            <span>Ativar tema escuro no header?</span>
          </label>
          <small>Se ativado, o header terá o tema dark</small>
        </div>

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
              {uploadingImage ? '⏳ Enviando...' : '📷 Escolher Imagem'}
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
          <small>Recomendado: 1920x400px | Max: 5MB | JPG, PNG, WEBP, GIF</small>
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
                  placeholder="# Título Principal&#10;&#10;Escreva seu artigo aqui...&#10;&#10;## Subtítulo&#10;&#10;**Negrito** e *itálico*&#10;&#10;Use o botão 'Adicionar Imagem' acima para inserir imagens"
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