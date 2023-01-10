import Link from '../Link/Link';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer section">
      <p className="footer__text">
        Этот сайт тоже сделал я.{' '}
        <a href="https://github.com/novvember/novvember.github.io">
          Его репозиторий
        </a>
        .
      </p>
      <p className="footer__text">
        <Link href="#contacts" isLocal>Контакты наверху ↑</Link>
      </p>
      <p className="footer__text">© 2019–2023</p>
    </footer>
  );
}

export default Footer;
