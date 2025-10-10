'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import '@/styles/parcerias-usuarios.css';
import '@/styles/globals.css';

// Interface para estruturar os dados da API
interface Localidade {
  id: number;
  sigla: string;
  nome: string;
}

const ParceriasUsuariosPage: React.FC = () => {
  // 1. Estados para os dados da aplicação
  const [estados, setEstados] = useState<Localidade[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidades, setCidades] = useState<Localidade[]>([]);
  const [isLoadingCidades, setIsLoadingCidades] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [perfilPrincipal, setPerfilPrincipal] = useState('');
  const [numeroSeguidores, setNumeroSeguidores] = useState('');
  const [proposta, setProposta] = useState('');


  // 2. useEffect para carregar a lista de todos os estados do Brasil ao montar o componente
  useEffect(() => {
    // Endpoint da API do IBGE para todos os estados (ordenados por nome)
    const URL_ESTADOS = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

    fetch(URL_ESTADOS)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar estados.');
        }
        return response.json();
      })
      .then((data: Localidade[]) => {
        setEstados(data);
      })
      .catch(err => {
        console.error("Erro na busca de estados:", err);
        setError("Não foi possível carregar a lista de estados.");
      });
  }, []); // Array de dependência vazio: executa apenas uma vez

  // 3. Função para carregar as cidades quando o estado for alterado
  const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const siglaEstado = event.target.value;
    setEstadoSelecionado(siglaEstado);
    setCidades([]); // Limpa as cidades antigas
    setError(null); // Limpa erros anteriores

    if (siglaEstado) {
      setIsLoadingCidades(true);
      // Endpoint da API do IBGE para municípios com base na sigla do estado
      const URL_CIDADES = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios?orderBy=nome`;

      fetch(URL_CIDADES)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao carregar cidades.');
          }
          return response.json();
        })
        .then((data: Localidade[]) => {
          setCidades(data);
          setIsLoadingCidades(false);
        })
        .catch(err => {
          console.error("Erro na busca de cidades:", err);
          setError("Não foi possível carregar as cidades deste estado.");
          setIsLoadingCidades(false);
        });
    }
  };

  return (
    <>
      <main>
        <div id="container">
          <form action="" method="get">
            <h1 className="titulo">PARCERIA COM INFLUENCIADORES</h1>
            <p className="subtitulo">Preencha os campos para que nossa equipe de marketing possa avaliar a proposta.</p>

            <div id="caixas-texto">
              {/* Nome e Contato */}
              <input
                type="text"
                name="nome-contato"
                id="nome"
                placeholder="Nome Completo / Contato Principal..."
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Profissional ou de Assessoria..."
              />

              {/* Telefone */}
              <div id="telefone">
                <p>BR</p>
                <img src="/images/atendimento-usuario/brasil.png" alt="Brasil" />
                <p>+55</p>
                <input
                  type="tel"
                  name="telefone"
                  id="telefone-input"
                  placeholder="00 00000-0000"
                />
              </div>

              {/* CAMPO DE ESTADO (SELECT DINÂMICO) */}
              <select
                name="estado"
                id="estado"
                value={estadoSelecionado}
                onChange={handleEstadoChange}
                style={{ appearance: 'none' }} // Para ajudar na estilização CSS
              >
                <option value="">Selecione o Estado...</option>
                {estados.map((estado) => (
                  <option key={estado.id} value={estado.sigla}>
                    {estado.nome} ({estado.sigla})
                  </option>
                ))}
              </select>

              {/* CAMPO DE CIDADE (SELECT DINÂMICO) */}
              <select
                name="cidade"
                id="cidade"
                disabled={!estadoSelecionado || isLoadingCidades}
                style={{ appearance: 'none' }}
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

              {/* Perfil Principal e Nicho */}
              <input
                type="text"
                name="perfil-principal"
                id="perfil-principal"
                placeholder="@usuário_principal (Ex: Instagram/TikTok)"
              />
              <input
                type="text"
                name="numero-seguidores"
                id="numero-seguidores"
                placeholder="Total de Seguidores/Inscritos (Ex: 500k, 2M)"
              />
              
            </div>

            {/* Exibe erro, se houver */}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            {/* Campo de Mensagem/Proposta */}
            <label htmlFor="motivo">
              <p className="contato">Detalhes da Proposta de Parceria</p>
            </label>
            <textarea
              name="proposta"
              id="motivo"
              placeholder=" Nos conte um pouco sobre o formato da parceria, o que você espera e qual o seu público."
            ></textarea>

            {/* Links de navegação */}
            <div className="eu">
              <Link className="eusou" href="/atendimento-usuario">
                <img src="/images/atendimento-usuario/usuario.png" alt="Ícone de usuário" />
                <p className="eusoua">Eu sou um usuário</p>
                <p className="eusoub">Dúvidas sobre o funcionamento do site, requisição de dados gerais, reportação de erros.</p>
              </Link>
              <Link className="eusou2" href="/parcerias-empresas">
                <img src="/images/atendimento-usuario/empresa.png" alt="Ícone de empresa" />
                <p className="eusoua">Eu sou uma empresa</p>
                <p className="eusoub">Contato para parcerias, dúvidas sobre regulamentos, reportação de queixas.</p>
              </Link>
            </div>

            <button type="submit" id="conheça">ENVIAR PROPOSTA</button>
          </form>
        </div>

        {/* Bloco Aside (mantido) */}
        <aside>
          <figure>
          </figure>
        </aside>
      </main>

      <Script src="/parcerias.js" strategy="afterInteractive" />
    </>
  );
};

export default ParceriasUsuariosPage;