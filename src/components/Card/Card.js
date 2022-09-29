import './Card.css';

function Card({ title, text, image, time, link }) {
  return (
    <li className="card">
      <a href="555" className="card__link">
        <div className="card__image-container">
          <img
            className="card__image"
            src={image}
            width="250"
            height="100"
            alt=""
          />
        </div>
        <h2 className="card__title">
          <span>{title}</span>
        </h2>
      </a>
      <p className="card__text">{text}</p>
      <p className="card__date">{time}</p>
    </li>
  );
}

export default Card;
