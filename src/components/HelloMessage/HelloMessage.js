import './HelloMessage.css';

function HelloMessage() {
  return (
    <section className="hello-message">
      <div className="section">
        <h1 className="hello-message__title">@novvember</h1>
        <p>
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
