import React from "react";
import Head from "next/head";
import "@/styles/gerenciamento-conta.css";
import "@/fontes/fontes.css";

const GerenciamentoConta: React.FC = () => {
  return (
    <>
      <Head>
        <title>Oasis - Gerenciamento de Conta</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="config-body">
        <aside>
          <a className="barra-lateral" href="/editar-perfil">Editar Perfil</a>
          <a className="barra-lateral active" href="#">Gerenciamento de Conta</a>
                                        
        </aside>

        <main>
          <section>
            <form>
              <h1>GERENCIE SUA CONTA</h1>
              <p id="faca-alteracoes">
                Faça alterações nas suas informações pessoais ou no tipo de conta.
              </p>

              <h2 className="section-title">Sua Conta</h2>

              <div className="form-group">
                <label htmlFor="E-mail-privado">Email - Privado</label>
                <input
                  type="email"
                  name="E-mail-privado"
                  id="E-mail-privado"
                  placeholder="ferreira.so97@gmail.com"
                />
              </div>

              <div className="form-group password-group">
                <label htmlFor="senha">Senha</label>
                <div className="password-container">
                  <input
                    type="password"
                    name="senha"
                    id="senha"
                    placeholder="******************"
                  />
                  <a href="#" className="alterar-link">
                    Alterar
                  </a>
                </div>
              </div>

              <h2 className="section-title" id="info-pessoais">
                Informações Pessoais
              </h2>

              <div className="form-group">
                <label htmlFor="data-nascimento">Data de nascimento</label>
                <input
                  type="date"
                  name="data-nascimento"
                  id="data-nascimento"
                  defaultValue="1997-01-09"
                />
              </div>

              <div className="form-group">
                <label htmlFor="genero">Gênero</label>
                <div id="gen3" className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      value="masculino"
                      id="masculino"
                      name="genero"
                      className="gen2"
                    />
                    <label htmlFor="masculino">Masculino</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      value="feminino"
                      id="feminino"
                      name="genero"
                      className="gen2"
                      defaultChecked
                    />
                    <label htmlFor="feminino">Feminino</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pais">País/Região</label>
                <div className="select-wrapper">
                  <select name="pais" id="pais" defaultValue="Brasil">
                    <option value="Brasil">Brasil</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Angola">Angola</option>
                    <option value="Moçambique">Moçambique</option>
                    <option value="Espanha">Espanha</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="idioma">Idioma</label>
                <div className="select-wrapper">
                  <select name="idioma" id="idioma" defaultValue="Português(Brasil)">
                    <option value="Português(Brasil)">Português (Brasil)</option>
                    <option value="Português(Portugal)">Português (Portugal)</option>
                    <option value="Inglês">Inglês</option>
                    <option value="Espanhol">Espanhol</option>
                  </select>
                </div>
              </div>

              <h2 className="section-title" id="exclusao">
                Exclusão
              </h2>
              <div id="exclua">
                <p>Exclua permanentemente seus dados e tudo que estiver associado à sua conta</p>
                <a href="#" className="excluir-link">
                  Excluir sua conta
                </a>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-salvar">
                  Salvar
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default GerenciamentoConta;
