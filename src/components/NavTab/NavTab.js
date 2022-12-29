import Link from '../Link/Link';
import './NavTab.css';

function NavTab({ doneCards, workCards,  studyCards, todoCards }) {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__list-item">
          <Link href="#done" getInfo={() => doneCards.length} isLocal>
            Сделал
          </Link>
        </li>
        <li className="navtab__list-item">
          <Link href="#work" getInfo={() => workCards.length} isLocal>
            Работаю
          </Link>
        </li>
        <li className="navtab__list-item">
          <Link href="#study" getInfo={() => studyCards.length} isLocal>
            Учусь
          </Link>
        </li>
        <li className="navtab__list-item">
          <Link href="#todo" getInfo={() => todoCards.length} isLocal>
            Хочу сделать
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
