import styles from "../styles/Home.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <a href="https://ada-school.org" target="_blank" rel="noopener noreferrer">
      Powered by{" "}
      <img src="/ada-rostro.jpg" alt="Ada Logo" className={styles.logo} />
    </a>
  </footer>
);

export default Footer;
