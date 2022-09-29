import classNames from 'classnames';
import './Card.css';

function Card({
  title,
  text,
  image,
  time,
  link,
  isImportant = false,
  isActive = false,
}) {
  return (
    <li className={classNames('card', { card_important: isImportant })}>
      <a href={link} className="card__link">
        <div className="card__image-container">
          <img
            className="card__image"
            src={image}
            width="250"
            height="100"
            alt=""
          />
        </div>
      </a>
      <div className="card__description">
        <a href={link} className="card__link">
          <h3 className="card__title">{title}</h3>
        </a>
        <p className="card__text">{text}</p>
        <p
          className={classNames('card__date', { card__date_active: isActive })}
        >
          {time}
        </p>
      </div>
    </li>
  );
}

export default Card;
