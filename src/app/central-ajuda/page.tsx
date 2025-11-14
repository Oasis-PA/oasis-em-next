"use client";

import {Header, Footer} from "@/components";

import Image from "next/image";
import Link from "next/link";

import "@/styles/central-de-ajuda.css";

export default function CentralDeAjuda() {
  return (
    <div className="page-ajuda-wrapper">

    <Header backgroundImage="/images/central-ajuda/central-ajuda-banner.png" theme="dark" className="header-ajuda"/>
    <section id="s1"> 
      <p id="p1">Aqui você encontra todas as informações necessárias para utilizar nosso site da 
        melhor forma possível. Se precisar de suporte, navegue pelos tópicos abaixo ou entre em 
        contato conosco.</p>
    </section>

    <section id="s2">
      <div id="d1">
        <p>SOBRE O SITE</p>
      </div>

      <div id="d2">
        <p>Nosso site foi desenvolvido para auxiliar pessoas de todas as idades e de todos os 
          gêneros a valorizarem sua beleza, principalmente os afro-brasileiros. Oferecemos 
          notícias para auxiliar a criação de uma rotina de pele sustentável, para cuidar 
          adequadamente do seu cabelo e muito mais! Recomendamos também produtos para fazer com 
          que você chegue em sua melhor versão, garantindo uma experiência completa e satisfatória 
          para todos os usuários.</p>
      </div>

      <div id="d3">
        <h3>TERMOS DE USO</h3>
        <p className="p2">• É importante que você conheça nossas regras e condições. Acesse a página 
          <Link href='artigo/termos-de-uso'> "Termos de Uso"</Link> para entender suas responsabilidades e direitos ao utilizar nossa plataforma.</p>
      </div>

      <div id="d4">
        <h3>POLÍTICA DE PRIVACIDADE</h3>
        <p className="p2">• A segurança dos seus dados é nossa prioridade. Em nossa <Link href='artigo/politica-de-privacidade'>"Política de Privacidade" </Link>, 
        explicamos como suas informações são coletadas, armazenadas e protegidas.</p>
      </div>
    </section>

    <section id="s3">
        <div className="d5">
          <p>PERGUNTAS FREQUENTES</p>
        </div>
        <div id="d6">
          <h3>COMO CRIAR UMA CONTA?</h3>
          <p className="p2">• Para se cadastrar, clique no botão no topo de página, preencha os campos
            obrigatórios e confirme seu e-mail. Em poucos passos, sua conta estará pronta para uso!</p>
        </div>

        <section id="fundo-marrom"></section>

        <div id="d7">
          <h3>PROBLEMAS COM LOGIN?</h3>
          <p className="p2">• Caso não consiga acessar sua conta, verifique se o e-mail e a senha
            estão corretos. Se necessário, utilize a opção "Esqueci minha senha" para redefini-la
            rapidamente.</p>
        </div>
        <div className="d5">
          <p>FALE CONOSCO</p>
        </div>
        <div id="d8">
          <h3>CONTATO</h3>
          <p className="p2">• Se precisar de ajuda adicional, envie uma mensagem através de nossa
            página de contato ou pelo e-mail "projetctoasis@gmail.com”. Nossa equipe
            responderá o mais breve possível!</p>
        </div>
        <div id="d9">
          <h3>DEIXE SEU FEEDBACK</h3>
          <p className="p2">• Sua opinião é essencial para melhorarmos nossos serviços. Compartilhe
            sugestões, elogios ou críticas conosco. Agradecemos sua participação!</p>
        </div>
      </section> 
      <Footer/>    </div>
  );

}

