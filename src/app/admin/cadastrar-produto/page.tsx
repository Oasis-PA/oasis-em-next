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
    composicao: '',
    qualidades: '',
    mais_detalhes: '',
    marca: '',
    preco: '',
    id_categoria: '',
    url_imagem: '',
    url_loja: '',
    id_tipo_cabelo: '',
    id_tipo_pele: '',
  });
  
  // ✅ NOVO: Estado para múltiplas tags
  const [tagsSelecionadas, setTagsSelecionadas] = useState<number[]>([]);
  
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTags, setLoadingTags] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch('/api/tags');
        if (res.ok) {
          const data = await res.json();
          setTags(data);
        }
      } catch (err) {
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

  // ✅ NOVO: Função para adicionar/remover tags
  const handleTagToggle = (tagId: number) => {
    setTagsSelecionadas(prev => {
      if (prev.includes(tagId)) {
        // Remove se já estiver selecionada
        return prev.filter(id => id !== tagId);
      } else {
        // Adiciona se não estiver
        return [...prev, tagId];
      }
    });
  };

  // ✅ NOVO: Marcar tag como principal
  const handleSetPrincipal = (tagId: number) => {
    // Move a tag para o início do array (primeira = principal)
    setTagsSelecionadas(prev => {
      const filtered = prev.filter(id => id !== tagId);
      return [tagId, ...filtered];
    });
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

    // ✅ NOVO: Validar se pelo menos uma tag foi selecionada
    if (tagsSelecionadas.length === 0) {
      setErro('Selecione pelo menos uma tag para o produto.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/produtos/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags_ids: tagsSelecionadas // ✅ NOVO: Envia array de IDs
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.message || 'Erro ao cadastrar produto.');
      } else {
        setMensagem('Produto cadastrado com sucesso!');
        setFormData({
          nome: '',
          composicao: '',
          qualidades: '',
          mais_detalhes: '',
          marca: '',
          preco: '',
          id_categoria: '',
          url_imagem: '',
          url_loja: '',
          id_tipo_cabelo: '',
          id_tipo_pele: '',
        });
        setTagsSelecionadas([]); // ✅ Limpa tags selecionadas
      }
    } catch (err) {
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
            <label htmlFor="composicao">Composição:</label>
            <textarea 
              id="composicao" 
              name="composicao" 
              value={formData.composicao} 
              onChange={handleChange}
              rows={4}
              placeholder="Ingredientes e componentes do produto"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="qualidades">Qualidades:</label>
            <textarea 
              id="qualidades" 
              name="qualidades" 
              value={formData.qualidades} 
              onChange={handleChange}
              rows={4}
              placeholder="Principais benefícios e qualidades do produto"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="mais_detalhes">Mais Detalhes:</label>
            <textarea 
              id="mais_detalhes" 
              name="mais_detalhes" 
              value={formData.mais_detalhes} 
              onChange={handleChange}
              rows={4}
              placeholder="Informações adicionais sobre o produto"
            ></textarea>
          </div>

          {/* ✅ NOVO: Seleção de múltiplas tags */}
          <div className="form-group">
            <label>Tags do Produto:</label>
            {loadingTags ? (
              <small>Carregando tags...</small>
            ) : (
              <>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {tags.map((tag, index) => {
                    const isSelected = tagsSelecionadas.includes(tag.id_tag);
                    const isPrincipal = tagsSelecionadas[0] === tag.id_tag;
                    
                    return (
                      <div 
                        key={tag.id_tag}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '6px 10px',
                          background: isSelected ? (isPrincipal ? '#FFD700' : '#e3f2fd') : '#f5f5f5',
                          border: isSelected ? '2px solid #2196F3' : '1px solid #ddd',
                          borderRadius: '16px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: isPrincipal ? 'bold' : 'normal'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleTagToggle(tag.id_tag)}
                          style={{ cursor: 'pointer' }}
                        />
                        <span onClick={() => handleTagToggle(tag.id_tag)}>
                          {tag.nome}
                        </span>
                        {isSelected && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetPrincipal(tag.id_tag);
                            }}
                            style={{
                              
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '10px',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              background: isPrincipal ? '#333' : '#fff',
                              color: isPrincipal ? '#fff' : '#333'
                            }}
                            title="Marcar como principal"
                          >
                            {isPrincipal ? '★ Principal' : '☆'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <small style={{ display: 'block', marginTop: '8px', color: '#666' }}>
                  ✓ Selecione múltiplas tags | ★ Clique na estrela para marcar como principal
                </small>
                {tagsSelecionadas.length > 0 && (
                  <div style={{ marginTop: '10px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
                    <strong>Selecionadas ({tagsSelecionadas.length}):</strong>
                    <div style={{ marginTop: '5px' }}>
                      {tagsSelecionadas.map((id, idx) => {
                        const tag = tags.find(t => t.id_tag === id);
                        return (
                          <span
                            key={id}
                            style={{
                              display: 'inline-block',
                              margin: '2px',
                              padding: '4px 8px',
                              background: idx === 0 ? '#FFD700' : '#fff',
                              border: '1px solid #ddd',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}
                          >
                            {idx === 0 && '★ '}
                            {tag?.nome}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="id_tipo_cabelo">ID Tipo de Cabelo:</label>
            <input 
              type="number" 
              id="id_tipo_cabelo" 
              name="id_tipo_cabelo" 
              value={formData.id_tipo_cabelo} 
              onChange={handleChange}
              placeholder="Deixe em branco se não aplicável"
            />
          </div>

          <div className="form-group">
            <label htmlFor="id_tipo_pele">ID Tipo de Pele:</label>
            <input 
              type="number" 
              id="id_tipo_pele" 
              name="id_tipo_pele" 
              value={formData.id_tipo_pele} 
              onChange={handleChange}
              placeholder="Deixe em branco se não aplicável"
            />
          </div>

          <div className="form-group">
            <label htmlFor="preco">Preço:</label>
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