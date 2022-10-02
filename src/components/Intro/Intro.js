import './Intro.css';
import avatar from '../../images/avatar.png';
import Stack from '../Stack/Stack';
import Resume from '../Resume/Resume';
import NavTab from '../NavTab/NavTab';

function Intro() {
  return (
    <section className="intro">
      <div className="section">
        <div className="intro__title">
          <img
            src={avatar}
            alt="Юзерпик пользователя novvember"
            className="intro__avatar"
            height="100"
            width="100"
          />
          <h1 className="intro__name">@novvember</h1>
        </div>
        <p className="intro__subtitle">
          Привет! Я — Дмитрий. Фронтенд-разработчик (сейчас) и инженер-технолог
          (раньше).
        </p>

        <div className="intro__blocks">
          <Stack />
          <Resume />
        </div>

        <NavTab />
      </div>
    </section>
  );
}

export default Intro;
