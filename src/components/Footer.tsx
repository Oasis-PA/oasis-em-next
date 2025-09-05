import React from 'react';
import Link from 'next/link';
import styles from '@/styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Coluna: Logo + Redes */}
        <div className={styles.brandCol}>
          <Link href="/">
            <img
              className={styles.logoFooter}
              src="/images/rodape/logo-footer.png"
              alt="Logo da marca"
            />
          </Link>

          <div className={styles.apps}>
            <img className={styles.appIcon} src="/images/rodape/insta.png" alt="Instagram" />
            <img className={styles.appIcon} src="/images/rodape/x.png" alt="X" />
            <img className={styles.appIcon} src="/images/rodape/facebook-icone.png" alt="Facebook" />
            <img className={styles.appIcon} src="/images/rodape/pinterest-icone.png" alt="Pinterest" />
          </div>
        </div>

        {/* Espaçador para layout desktop */}
        <div className={styles.spacer} />

        {/* Grupo 1 */}
        <div className={styles.group}>
          <h2 className={styles.groupTitle}>Mapa do Site</h2>
          <p className={styles.item}>Quem somos?</p>
          <p className={styles.item}>Parcerias</p>
          <p className={styles.item}>Contato</p>
          <p className={styles.item}>Segurança</p>
        </div>

        {/* Grupo 2 */}
        <div className={styles.group}>
          <h2 className={styles.groupTitle}>Usuário</h2>
          <p className={styles.item}>Painel</p>
          <p className={styles.item}>Minha conta</p>
          <p className={styles.item}>Meu avatar</p>
          <p className={styles.item}>Meus favoritos</p>
          <p className={styles.item}>Minhas avaliações sobre</p>
          <p className={styles.item}>Produtos</p>
          <p className={styles.item}>Cadastre-se</p>
        </div>

        {/* Grupo 3 */}
        <div className={styles.group}>
          <h2 className={styles.groupTitle}>Precisa de Suporte?</h2>
          <p className={styles.item}>Central de Ajuda</p>
          <p className={styles.item}>Política de Privacidade</p>
          <p className={styles.item}>Termos de Uso</p>
          <p className={styles.item}>Modo Escuro</p>
          <p className={styles.item}>Segurança</p>
        </div>

        {/* Grupo 4 (CTA) */}
        <div className={styles.group}>
          <h1 className={styles.ctaTitle}>Interação com o cliente</h1>
          <p className={styles.ctaText}>Para maiores dúvidas ou esclarecimentos, entre em contato.</p>
          <p className={styles.ctaSub}>
            Estamos disponíveis de segunda à sexta, das 9h às 17h, exceto feriados.
          </p>
          <button className={styles.ctaBtn}>
            <b>ATENDIMENTO</b>
          </button>
        </div>

        {/* Logo secundário */}
        <div className={styles.logo2Wrap}>
          <img className={styles.logo2} src="/images/rodape/logo2.png" alt="Logo secundário" />
        </div>
      </div>
    </footer>
  );
}
