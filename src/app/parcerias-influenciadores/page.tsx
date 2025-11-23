'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import '@/styles/globals.css'; 
import styles from '@/styles/parcerias-usuarios.module.css'; // Certifique-se que o caminho está correto
import { Header, Footer } from "@/components";

interface Localidade {
  id: number;
  sigla: string;
  nome: string;
}

const ParceriasUsuariosPage: React.FC = () => {
  // Estados para os dados da aplicação
  const [estados, setEstados] = useState<Localidade[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidades, setCidades] = useState<Localidade[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [isLoadingCidades, setIsLoadingCidades] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [perfilPrincipal, setPerfilPrincipal] = useState('');
  const [numeroSeguidores, setNumeroSeguidores] = useState('');
  const [proposta, setProposta] = useState('');

  // Estados de submissão
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Carregar estados
  useEffect(() => {
    const URL_ESTADOS = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

    fetch(URL_ESTADOS)
      .then(response => {
        if (!response.ok) throw new Error('Erro ao carregar estados.');
        return response.json();
      })
      .then((data: Localidade[]) => {
        setEstados(data);
      })
      .catch(err => {
        setError("Não foi possível carregar a lista de estados.");
      });
  }, []);

  // Carregar cidades quando estado mudar
  const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const siglaEstado = event.target.value;
    setEstadoSelecionado(siglaEstado);
    setCidades([]);
    setCidadeSelecionada('');
    setError(null);

    if (siglaEstado) {
      setIsLoadingCidades(true);
      const URL_CIDADES = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios?orderBy=nome`;

      fetch(URL_CIDADES)
        .then(response => {
          if (!response.ok) throw new Error('Erro ao carregar cidades.');
          return response.json();
        })
        .then((data: Localidade[]) => {
          setCidades(data);
          setIsLoadingCidades(false);
        })
        .catch(err => {
          setError("Não foi possível carregar as cidades deste estado.");
          setIsLoadingCidades(false);
        });
    }
  };

  // Formatar telefone enquanto digita
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '$1 $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '$1 $2');
      }
      setTelefone(value);
    }
  };

  // Submeter formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (!nome || !email || !telefone || !estadoSelecionado || !cidadeSelecionada || 
          !perfilPrincipal || !numeroSeguidores || !proposta) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/parcerias/influenciadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome_contato: nome,
          email: email,
          telefone: telefone,
          estado: estadoSelecionado,
          cidade: cidadeSelecionada,
          perfil_principal: perfilPrincipal,
          numero_seguidores: numeroSeguidores,
          proposta: proposta
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar proposta');
      }

      setSuccessMessage(data.message);
      setNome('');
      setEmail('');
      setTelefone('');
      setEstadoSelecionado('');
      setCidadeSelecionada('');
      setCidades([]);
      setPerfilPrincipal('');
      setNumeroSeguidores('');
      setProposta('');
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err: any) {
      setError(err.message || 'Erro ao enviar proposta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Header/>
    <div className={styles.wrapper}>
      <main className={styles.wrapperMain}>
        {/* Usamos className={styles.container} pois mudamos de ID para Class no CSS */}
        <div className={styles.container}>
          <form onSubmit={handleSubmit} method="post" className={styles.formContainer}>
            <h1 className={styles.titulo}>PARCERIA COM INFLUENCIADORES</h1>
            <p className={styles.subtitulo}>Preencha os campos para que nossa equipe de marketing possa avaliar a proposta.</p>

            {successMessage && (
              <div style={{
                backgroundColor: '#4CAF50', color: 'white', padding: '15px',
                borderRadius: '5px', marginBottom: '20px', textAlign: 'center', width: '100%'
              }}>
                {successMessage}
              </div>
            )}

            {error && (
              <div style={{
                backgroundColor: '#f44336', color: 'white', padding: '15px',
                borderRadius: '5px', marginBottom: '20px', textAlign: 'center', width: '100%'
              }}>
                {error}
              </div>
            )}

            {/* Container dos inputs agora é uma classe no CSS Module */}
            <div className={styles.caixasTexto}>
              <input
                type="text"
                name="nome-contato"
                id="nome"
                placeholder="Nome Completo / Contato Principal..."
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Profissional ou de Assessoria..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Container do telefone ajustado para classe */}
              <div className={styles.telefoneContainer}>
                <p>BR</p>
                <img src="/images/atendimento-usuario/brasil.png" alt="Brasil" />
                <p>+55</p>
                <input
                  type="tel"
                  name="telefone"
                  id="telefone-input"
                  placeholder="00 00000-0000"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  required
                />
              </div>

              <select
                name="estado"
                id="estado"
                value={estadoSelecionado}
                onChange={handleEstadoChange}
                required
              >
                <option value="">Selecione o Estado...</option>
                {estados.map((estado) => (
                  <option key={estado.id} value={estado.sigla}>
                    {estado.nome} ({estado.sigla})
                  </option>
                ))}
              </select>

              <select
                name="cidade"
                id="cidade"
                value={cidadeSelecionada}
                onChange={(e) => setCidadeSelecionada(e.target.value)}
                disabled={!estadoSelecionado || isLoadingCidades}
                required
              >
                <option value="">
                  {isLoadingCidades ? "Carregando cidades..." : cidades.length === 0 && estadoSelecionado ? "Nenhuma cidade encontrada" : "Selecione a Cidade..."}
                </option>
                {cidades.map((cidade) => (
                  <option key={cidade.id} value={cidade.nome}>
                    {cidade.nome}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="nicho"
                id="perfil-principal"
                placeholder="@usuário_principal (Ex: Instagram/TikTok)"
                value={perfilPrincipal}
                onChange={(e) => setPerfilPrincipal(e.target.value)}
                required
              />
              
              <input
                type="text"
                name="numero-seguidores"
                id="numero-seguidores"
                placeholder="Total de Seguidores/Inscritos (Ex: 500k, 2M)"
                value={numeroSeguidores}
                onChange={(e) => setNumeroSeguidores(e.target.value)}
                required
              />
            </div>

            <label htmlFor="motivo" style={{width: '100%', maxWidth: '656px'}}>
              <p className={styles.contatoLabel}>Detalhes da Proposta de Parceria</p>
            </label>
            <textarea
              name="proposta"
              id="motivo"
              className={styles.motivo}
              placeholder=" Nos conte um pouco sobre o formato da parceria, o que você espera e qual o seu público."
              value={proposta}
              onChange={(e) => setProposta(e.target.value)}
              required
            ></textarea>

            <div className={styles.euContainer}>
              <Link className={styles.euSouCard} href="/parcerias-influenciadores">
                <img src="/images/atendimento-usuario/usuario.png" alt="Ícone de usuário" />
                <p className={styles.euSouTitulo}>Eu sou um influenciador</p>
                <p className={styles.euSouDescricao}>Dúvidas sobre o funcionamento do site, requisição de dados gerais, reportação de erros.</p>
              </Link>
              <Link className={styles.euSouCard2} href="/parcerias-empresas">
                <img src="/images/atendimento-usuario/empresa.png" alt="Ícone de empresa" />
                <p className={styles.euSouTitulo}>Eu sou uma empresa</p>
                <p className={styles.euSouDescricao}>Contato para parcerias, dúvidas sobre regulamentos, reportação de queixas.</p>
              </Link>
            </div>

            <button 
              type="submit" 
              className={styles.botaoConheca}
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'ENVIANDO...' : 'ENVIAR PROPOSTA'}
            </button>
          </form>
        </div>

        <aside className={styles.sidebarWrapper}>
          <figure className={styles.sidebarImage}>
            <img 
              className={styles.favorito} 
              src="/images/favorito.png" 
              alt="Destaque" 
              onError={(e) => e.currentTarget.style.display = 'none'} 
            />
          </figure>
        </aside>
      </main>

      <Script src="/parcerias.js" strategy="afterInteractive" />
    </div>
    <Footer/>
    </>
  );
};

export default ParceriasUsuariosPage;