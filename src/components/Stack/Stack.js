import './Stack.css';

function Stack() {
  return (
    <div className="stack">
      <h2 className="stack__title">
        Стек: <span>HTML5</span> <span>CSS3</span> <span>БЭМ</span>{' '}
        <span>JavaScript</span> <span>React.js</span>
      </h2>

      <p className="stack__text">Есть практика работы:</p>
      <ul>
        <li>
          JavaScript: <span>ES6</span> <span>ООП</span> <span>async/await</span>{' '}
          <span>Swiper.js</span>
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
          общие инструменты: <span>Git</span> <span>npm</span> <span>bash</span>{' '}
          <span>Webpack</span> <span>Figma</span> <span>VS Code</span>{' '}
          <span>Postman</span> <span>ESLint</span>
        </li>
      </ul>
      <p className="stack__text">
        Хочу дополнительно изучить: <span>TypeScript</span>{' '}
        <span>LESS/SASS</span> <span>Redux</span>{' '}
        <span>React.js (углубленно)</span>
      </p>
    </div>
  );
}

export default Stack;