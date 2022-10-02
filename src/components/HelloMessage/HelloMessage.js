import './HelloMessage.css';
import avatar from '../../images/avatar.png';
import Stack from '../Stack/Stack';

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

        <Stack />

        <p className="hello-message__cv">
          Ищу работу, в Москве или удаленно! Мое резюме: тут (+pdf), на
          Хэдхантере, на Хабр.Карьере.
          <p>
            Закончил Яндекс.Практикум (веб-разработчик) + самостоятельное
            обучение.
          </p>
        </p>
        <p className="hello-message__nav">Сделал, учусь, хочу сделать</p>
      </div>
    </section>
  );
}

export default HelloMessage;
