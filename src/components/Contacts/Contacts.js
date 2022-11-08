import Link from '../Link/Link';
import './Contacts.css';
import {
  getCodepenInfo,
  getCodewarsInfo,
  getGithubInfo,
  getStackoverflowInfo,
} from '../../utils/getExtraInfo';

function Contacts() {
  return (
    <header className="contacts" id="contacts">
      <div className="section">
        <ul className="contacts__list">
          <li className="contacts__item">
            <Link href="mailto:n.demitsuri@gmail.com" withIcon>
              n.demitsuri@gmail.com
            </Link>
          </li>
          <li className="contacts__item">
            <Link href="https://t.me/n_d_d" withIcon>
              Telegram
            </Link>
          </li>
          <li className="contacts__item">
            <Link
              href="https://github.com/novvember"
              getInfo={getGithubInfo}
              withIcon
            >
              Github
            </Link>
          </li>
          <li className="contacts__item">
            <Link
              href="https://ru.stackoverflow.com/users/352251"
              getInfo={getStackoverflowInfo}
              withIcon
            >
              Stack Overflow
            </Link>
          </li>
          <li className="contacts__item">
            <Link
              href="https://www.codewars.com/users/novvember"
              getInfo={getCodewarsInfo}
              withIcon
            >
              Codewars
            </Link>
          </li>
          <li className="contacts__item">
            <Link href="https://codepen.io/novvember" withIcon>
              Codepen
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Contacts;
