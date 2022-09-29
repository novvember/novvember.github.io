import Card from '../Card/Card';
import './Timeline.css';

function Timeline() {
  return (
    <main className="timeline">
      <div className="timeline__filter">filter</div>
      <ul className="timeline__cards">
        <Card
          title="Приложение Mesto"
          text="Приложение, отдаленно напоминающее Инстаграм: пользователи добавлят
            фотографии, ставят лайки. Это основной учебный проект в Практикуме:
            от начала изучения JavaScript и до сервера на Node.js. Есть
            репозитории с несколькими версиями: обычная (БЭМ + JS), React,
            сервер на Node.js."
          image="https://novvember.github.io/img/card__mesto.png"
          time="февраль&nbsp;&mdash; август 2022"
        />
        <Card
          title="Приложение Movies Explorer"
          text="Приложение, отдаленно напоминающее Инстаграм: пользователи добавлят
            фотографии, ставят лайки. Это основной учебный проект в Практикуме:
            от начала изучения JavaScript и до сервера на Node.js. Есть
            репозитории с несколькими версиями: обычная (БЭМ + JS), React,
            сервер на Node.js."
          image="https://novvember.github.io/img/card__movies.png"
          time="февраль&nbsp;&mdash; август 2022"
        />
        <Card
          title="Приложение Movies Explorer"
          text="Приложение, отдаленно напоминающее Инстаграм: пользователи добавлят
            фотографии, ставят лайки. Это основной учебный проект в Практикуме:
            от начала изучения JavaScript и до сервера на Node.js. Есть
            репозитории с несколькими версиями: обычная (БЭМ + JS), React,
            сервер на Node.js."
          image="https://novvember.github.io/img/card__movies.png"
          time="февраль&nbsp;&mdash; август 2022"
        />
      </ul>
    </main>
  );
}

export default Timeline;
