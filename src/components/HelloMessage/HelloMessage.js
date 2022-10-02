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

        <div className="hello-message__stack">
          <h2 className="hello-message__stack-title">Стек</h2>
          <ul>
            <li>
              Основной стек: <span>HTML5</span> <span>CSS3</span>{' '}
              <span>БЭМ</span> <span>JavaScript</span> <span>React.js</span>
            </li>

            <li>
              Есть практика работы:
              <ul>
                <li>
                  JavaScript: <span>ES6</span> <span>ООП</span>{' '}
                  <span>async/await</span> <span>Swiper.js</span>
                </li>
                <li>
                  React: <span>Create React App</span> <span>React Router</span>{' '}
                  <span>React Context</span> <span>Ant Design</span>
                </li>
                <li>
                  бэкенд: <span>Node.js</span> <span>Express.js</span>{' '}
                  <span>Nginx</span> <span>Celebrate + Joi</span>{' '}
                  <span>MongoDB + Mongoose</span>
                </li>
                <li>
                  юнит-тестирование: <span>Jest</span> <span>supertest</span>
                </li>
                <li>
                  общие инструменты: <span>Git</span> <span>npm</span>{' '}
                  <span>bash</span> <span>Webpack</span> <span>Figma</span>{' '}
                  <span>VS Code</span> <span>Postman</span> <span>ESLint</span>
                </li>
              </ul>
            </li>

            <li>
              Хочу дополнительно изучить: <span>TypeScript</span>{' '}
              <span>LESS/SASS</span> <span>Redux</span>{' '}
              <span>React (углубленно)</span>
            </li>
          </ul>
        </div>
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
