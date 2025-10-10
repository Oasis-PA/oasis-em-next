// app/cadastrar-produto/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/cadastrar-produto.css';

interface Tag {
  id_tag: number;
  nome: string;
}

// -----------------------------------------------------
// Estrutura de Dados do Formulário ATUALIZADA
// -----------------------------------------------------
interface FormData {
    nome: string;
    descricao?: string;
    marca: string;
    preco: string; // Preço principal do produto
    id_categoria: string;
    id_tag: string;
    id_tipo_cabelo: string;
    id_tipo_pele: string;

    // IMAGEM ÚNICA
    url_imagem: string;
    
    // OFERTA 1
    nome_loja_1: string;
    preco_loja_1: string;
    url_loja_1: string;
    
    // OFERTA 2
    nome_loja_2: string;
    preco_loja_2: string;
    url_loja_2: string;

    // OFERTA 3
    nome_loja_3: string;
    preco_loja_3: string;
    url_loja_3: string;
}


const INITIAL_FORM_DATA: FormData = {
    nome: '',
    descricao: '',
    marca: '',
    preco: '',
    id_categoria: '',
    id_tag: '',
    id_tipo_cabelo: '',
    id_tipo_pele: '',
    url_imagem: '',
    nome_loja_1: '',
    preco_loja_1: '',
    url_loja_1: '',
    nome_loja_2: '',
    preco_loja_2: '',
    url_loja_2: '',
    nome_loja_3: '',
    preco_loja_3: '',
    url_loja_3: '',
};

export default function CadastrarProdutoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
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
        } else {
            setErro('Falha ao carregar tags. Verifique a API /api/tags/route.ts.');
        }
      } catch (err) {
        console.error('Erro ao carregar tags:', err);
        setErro('Erro de conexão ao buscar tags.');
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

    // Validação Mínima
    if (!formData.nome || !formData.marca || !formData.preco || !formData.id_categoria || !formData.url_imagem) {
      setErro('Os campos Nome, Marca, Preço, Categoria e URL da Imagem são obrigatórios.');
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
        setMensagem('Produto e ofertas cadastrados com sucesso!');
        setFormData(INITIAL_FORM_DATA); // Resetar formulário
      }
    } catch (err) {
      console.error(err);
      setErro('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const renderLojaFields = (index: number) => (
      <div key={`loja-${index}`} className="loja-group" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          <h4>Oferta de Loja {index}</h4>
          <div className="form-group">
              <label htmlFor={`nome_loja_${index}`}>Nome da Loja:</label>
              <input 
                  type="text" 
                  id={`nome_loja_${index}`} 
                  name={`nome_loja_${index}`} 
                  value={formData[`nome_loja_${index}` as keyof FormData]} 
                  onChange={handleChange} 
              />
          </div>
          <div className="form-group">
              <label htmlFor={`preco_loja_${index}`}>Preço na Loja {index}:</label>
              <div className="input-with-currency">
                  <span className="currency-symbol">R$</span>
                  <input 
                      type="number" 
                      id={`preco_loja_${index}`} 
                      name={`preco_loja_${index}`} 
                      value={formData[`preco_loja_${index}` as keyof FormData]} 
                      onChange={handleChange} 
                      step="0.01"
                  />
              </div>
          </div>
          <div className="form-group">
              <label htmlFor={`url_loja_${index}`}>URL de Compra na Loja {index}:</label>
              <input 
                  type="url" 
                  id={`url_loja_${index}`} 
                  name={`url_loja_${index}`} 
                  value={formData[`url_loja_${index}` as keyof FormData]} 
                  onChange={handleChange} 
              />
          </div>
      </div>
  );

  return (
    <div className="container">
      <div className="form-card">
        <h1>Cadastrar Novo Produto</h1>
        <form onSubmit={handleSubmit}>
          
          {/* DADOS PRINCIPAIS DO PRODUTO */}
          <div className="form-section-header">
              <h2>Dados Básicos</h2>
          </div>

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
              <label htmlFor="preco">Preço Principal (Sugestão/Menor Valor):</label>
              <div className="input-with-currency">
                <span className="currency-symbol">R$</span>
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
            <label htmlFor="descricao">Descrição (opcional):</label>
            <textarea 
              id="descricao" 
              name="descricao" 
              value={formData.descricao} 
              onChange={handleChange}
              rows={4}
            ></textarea>
          </div>
          
          {/* RELAÇÕES */}
          <div className="form-section-header">
              <h2>Relações</h2>
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
              <option value="">Selecione uma tag</option>
              {tags.map(tag => (
                <option key={tag.id_tag} value={tag.id_tag}>
                  {tag.nome}
                </option>
              ))}
            </select>
            {loadingTags && <small>Carregando tags...</small>}
          </div>
          
          <div className="form-group">
            <label htmlFor="id_tipo_cabelo">ID Tipo de Cabelo (opcional):</label>
            <input 
              type="number" 
              id="id_tipo_cabelo" 
              name="id_tipo_cabelo" 
              value={formData.id_tipo_cabelo} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="id_tipo_pele">ID Tipo de Pele (opcional):</label>
            <input 
              type="number" 
              id="id_tipo_pele" 
              name="id_tipo_pele" 
              value={formData.id_tipo_pele} 
              onChange={handleChange} 
            />
          </div>

          {/* MÚLTIPLAS OFERTAS DE LOJA */}
          <div className="form-section-header">
              <h2>Ofertas de Lojas (Máx. 3)</h2>
              <p className="small-text">Cadastre as ofertas em diferentes lojas. O backend criará a Loja se ela não existir.</p>
          </div>
          {[1, 2, 3].map(renderLojaFields)}

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