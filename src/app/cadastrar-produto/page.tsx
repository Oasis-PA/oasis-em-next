"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/cadastrar-produto.css';

interface Tag {
  id_tag: number;
  nome: string;
}

export default function CadastrarProdutoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    marca: '',
    preco: '',
    id_categoria: '',
    url_imagem: '',
    url_loja: '',
    id_tag: '', // Agora é ID ao invés de texto
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTags, setLoadingTags] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  // Busca as tags disponíveis ao carregar o componente
  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch('/api/tags');
        if (res.ok) {
          const data = await res.json();
          setTags(data);
        }
      } catch (err) {
        console.error('Erro ao carregar tags:', err);
      } finally {
        setLoadingTags(false);
      }
    }
    fetchTags();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');
    setErro('');

    if (!formData.nome || !formData.marca || !formData.preco || !formData.id_categoria || !formData.url_imagem || !formData.url_loja) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/produtos/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.message || 'Erro ao cadastrar produto.');
      } else {
        setMensagem('Produto cadastrado com sucesso!');
        setFormData({
          nome: '',
          descricao: '',
          marca: '',
          preco: '',
          id_categoria: '',
          url_imagem: '',
          url_loja: '',
          id_tag: '',
        });
      }
    } catch (err) {
      console.error(err);
      setErro('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1>Cadastrar Novo Produto</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="marca">Marca:</label>
            <input 
              type="text" 
              id="marca" 
              name="marca" 
              value={formData.marca} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="id_tag">Tag Principal:</label>
            <select 
              id="id_tag" 
              name="id_tag" 
              value={formData.id_tag} 
              onChange={handleChange}
              disabled={loadingTags}
            >
              <option value="">Selecione uma tag (opcional)</option>
              {tags.map(tag => (
                <option key={tag.id_tag} value={tag.id_tag}>
                  {tag.nome}
                </option>
              ))}
            </select>
            {loadingTags && <small>Carregando tags...</small>}
          </div>

          <div className="form-group">
            <label htmlFor="preco">Preço:</label>
            <input 
              type="number" 
              id="preco" 
              name="preco" 
              value={formData.preco} 
              onChange={handleChange} 
              step="0.01"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="id_categoria">ID da Categoria:</label>
            <input 
              type="number" 
              id="id_categoria" 
              name="id_categoria" 
              value={formData.id_categoria} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="url_imagem">URL da Imagem:</label>
            <input 
              type="url" 
              id="url_imagem" 
              name="url_imagem" 
              value={formData.url_imagem} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="url_loja">URL da Loja:</label>
            <input 
              type="url" 
              id="url_loja" 
              name="url_loja" 
              value={formData.url_loja} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="descricao">Descrição (opcional):</label>
            <textarea 
              id="descricao" 
              name="descricao" 
              value={formData.descricao} 
              onChange={handleChange}
              rows={4}
            ></textarea>
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
          </button>
        </form>
        {mensagem && <p className="success-message">{mensagem}</p>}
        {erro && <p className="error-message">{erro}</p>}
      </div>
    </div>
  );
}