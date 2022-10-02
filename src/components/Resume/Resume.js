import './Resume.css';

function Resume() {
  return (
    <div className="resume">
      <h2 className="resume__title">
        <span>Ищу работу, в Москве или удаленно!</span>
      </h2>
      <p className="resume__text">
        Закончил Яндекс.Практикум (веб-разработчик) + самостоятельное обучение.
      </p>
      <p className="resume__text">
        {' '}
        Мое резюме:{' '}
        <a href="https://mint-pruner-f37.notion.site/e5fac8d6382d49ba8190cbf3069e318f">
          тут
        </a>{' '}
        (+pdf),{' '}
        <a href="https://hh.ru/resume/6bff14ecff09a9e2550039ed1f6f6649326c78">
          на Хэдхантере
        </a>
        , <a href="https://career.habr.com/novvember">на Хабр.Карьере</a>.
      </p>
      <p className="resume__text">Мои работы ниже.</p>
    </div>
  );
}

export default Resume;
