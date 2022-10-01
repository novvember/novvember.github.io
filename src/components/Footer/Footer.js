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
        <a href="#contacts">Контакты наверху</a>
      </p>
      <p className="footer__text">© 2019–2022</p>
    </footer>
  );
}

export default Footer;
