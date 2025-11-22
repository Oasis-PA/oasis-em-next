"use client";

import { Header, Footer } from "@/components";
import Link from "next/link";

// Importação do CSS Module como objeto 'styles'
import styles from "@/styles/central-de-ajuda.module.css";

export default function CentralDeAjuda() {
  return (
    <>
    <Header
        backgroundImage="/images/central-ajuda/central-ajuda-banner.png"
        theme="dark"
        className={styles.headerAjuda}
      />
    <div className={styles.pageAjudaWrapper}>
      <section className={styles.s1}>
        <p className={styles.p1}>
          Aqui você encontra todas as informações necessárias para utilizar nosso
          site da melhor forma possível. Se precisar de suporte, navegue pelos
          tópicos abaixo ou entre em contato conosco.
        </p>
      </section>

      <section className={styles.s2}>
        <div className={styles.d1}>
          <p>SOBRE O SITE</p>
        </div>

        <div className={styles.d2}>
          <p>
            Nosso site foi desenvolvido para auxiliar pessoas de todas as idades e
            de todos os gêneros a valorizarem sua beleza, principalmente os
            afro-brasileiros. Oferecemos notícias para auxiliar a criação de uma
            rotina de pele sustentável, para cuidar adequamente do seu cabelo e
            muito mais! Recomendamos também produtos para fazer com que você
            chegue em sua melhor versão, garantindo uma experiência completa e
            satisfatória para todos os usuários.
          </p>
        </div>

        <div className={styles.d3}>
          <h3>TERMOS DE USO</h3>
          <p className={styles.p2}>
            • É importante que você conheça nossas regras e condições. Acesse a
            página
            <Link href="artigo/termos-de-uso"> "Termos de Uso"</Link> para
            entender suas responsabilidades e direitos ao utilizar nossa
            plataforma.
          </p>
        </div>

        <div className={styles.d4}>
          <h3>POLÍTICA DE PRIVACIDADE</h3>
          <p className={styles.p2}>
            • A segurança dos seus dados é nossa prioridade. Em nossa{" "}
            <Link href="artigo/politica-de-privacidade">
              "Política de Privacidade"{" "}
            </Link>
            , explicamos como suas informações são coletadas, armazenadas e
            protegidas.
          </p>
        </div>
      </section>

      <section className={styles.s3}>
        <div className={styles.d5}>
          <p>PERGUNTAS FREQUENTES</p>
        </div>
        <div className={styles.d6}>
          <h3>COMO CRIAR UMA CONTA?</h3>
          <p className={styles.p2}>
            • Para se cadastrar, clique no botão no topo de página, preencha os
            campos obrigatórios e confirme seu e-mail. Em poucos passos, sua conta
            estará pronta para uso!
          </p>
        </div>

        <section className={styles.fundoMarrom}></section>

        <div className={styles.d7}>
          <h3>PROBLEMAS COM LOGIN?</h3>
          <p className={styles.p2}>
            • Caso não consiga acessar sua conta, verifique se o e-mail e a senha
            estão corretos. Se necessário, utilize a opção "Esqueci minha senha"
            para redefini-la rapidamente.
          </p>
        </div>
        <div className={styles.d5}>
          <p>FALE CONOSCO</p>
        </div>
        <div className={styles.d8}>
          <h3>CONTATO</h3>
          <p className={styles.p2}>
            • Se precisar de ajuda adicional, envie uma mensagem através de nossa
            página de contato ou pelo e-mail "projetctoasis@gmail.com”. Nossa
            equipe responderá o mais breve possível!
          </p>
        </div>
        <div className={styles.d9}>
          <h3>DEIXE SEU FEEDBACK</h3>
          <p className={styles.p2}>
            • Sua opinião é essencial para melhorarmos nossos serviços. Compartilhe
            sugestões, elogios ou críticas conosco. Agradecemos sua participação!
          </p>
        </div>
      </section>
      
      
    </div>
    <Footer />
    </>
  );
}