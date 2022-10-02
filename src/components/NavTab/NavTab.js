import './NavTab.css';

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__list-item">
          <a href="#done" className="navtab__link">
            Сделал
          </a>
        </li>
        <li className="navtab__list-item">
          <a href="#study" className="navtab__link">
            Учусь
          </a>
        </li>
        <li className="navtab__list-item">
          <a href="#todo" className="navtab__link">
            Хочу сделать
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
