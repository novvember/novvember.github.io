import LinkWithIcon from '../LinkWithIcon/LinkWithIcon';
import './Contacts.css';
import {
  getCodewarsInfo,
  getGithubInfo,
  getStackoverflowInfo,
} from '../../utils/getExtraInfo';

function Contacts() {
  return (
    <header className="contacts">
      <div className="section">
        <ul className="contacts__list">
          <li className="contacts__item">
            <LinkWithIcon href="mailto:n.demitsuri@gmail.com">
              n.demitsuri@gmail.com
            </LinkWithIcon>
          </li>
          <li className="contacts__item">
            <LinkWithIcon href="https://t.me/n_d_d">Telegram</LinkWithIcon>
          </li>
          <li className="contacts__item">
            <LinkWithIcon
              href="https://github.com/novvember"
              getInfo={getGithubInfo}
            >
              Github
            </LinkWithIcon>
          </li>
          <li className="contacts__item">
            <LinkWithIcon
              href="https://ru.stackoverflow.com/users/352251"
              getInfo={getStackoverflowInfo}
            >
              Stack Overflow
            </LinkWithIcon>
          </li>
          <li className="contacts__item">
            <LinkWithIcon
              href="https://www.codewars.com/users/novvember"
              getInfo={getCodewarsInfo}
            >
              Codewars
            </LinkWithIcon>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Contacts;
