

"use client";

import { useState } from 'react';

import '@/styles/cadastrar-produto.css'; // Reutilizando seu CSS existente

export default function CadastrarTagPage() {
  const [nomeTag, setNomeTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeTag(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');
    setErro('');

    if (!nomeTag.trim()) {
      setErro('O nome da tag não pode ser vazio.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/tags/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Envia apenas o campo 'nome'
        body: JSON.stringify({ nome: nomeTag }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.message || 'Erro ao cadastrar tag.');
      } else {
        setMensagem(`Tag "${data.tag.nome}" cadastrada com sucesso!`);
        // Limpa o formulário
        setNomeTag('');
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
        <h1>Cadastrar Nova Tag</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nomeTag">Nome da Tag:</label>
            <input 
              type="text" 
              id="nomeTag" 
              name="nomeTag" 
              value={nomeTag} 
              onChange={handleChange} 
              required 
              placeholder="Ex: Vegano, Low Poo, Hialurônico, etc."
            />
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Cadastrando...' : 'Cadastrar Tag'}
          </button>
        </form>
        {mensagem && <p className="success-message">{mensagem}</p>}
        {erro && <p className="error-message">{erro}</p>}
      </div>
    </div>
  );
}