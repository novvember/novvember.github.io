import './HelloMessage.css';
import avatar from '../../images/avatar.png';

function HelloMessage() {
  return (
    <section className="hello-message">
      <div className="section">
        <div className="hello-message__title">
          <img
            src={avatar}
            alt="Юзерпик пользователя novvember"
            className="hello-message__avatar"
            height="100"
            width="100"
          />
          <h1 className="hello-message__name">@novvember</h1>
        </div>
        <p className="hello-message__subtitle">
          Привет! Я — Дмитрий. Фронтенд-разработчик (сейчас) и инженер-технолог
          (раньше).
        </p>
        <p>
          Этот блок еще не доделан :( Здесь будет указан мой стек, ссылки на
          резюме, актуальная информация и небольшая навигация по трем разделам
          этой страницы.
        </p>
      </div>
    </section>
  );
}

export default HelloMessage;
