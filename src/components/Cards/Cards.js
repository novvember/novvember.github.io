import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Cards.css';

function Cards({
  title,
  cards,
  onlyImportant = false,
  onlyActive = false,
  type,
  id,
}) {
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    setFilteredCards(
      cards
        .filter((card) => {
          if (onlyImportant) return card.isImportant;
          return card;
        })
        .filter((card) => {
          if (onlyActive) return card.isInProgress;
          return card;
        }),
    );
  }, [cards, onlyActive, onlyImportant]);

  return (
    <section className="cards" id={id}>
      <h2 className="cards__title">{title}</h2>

      {filteredCards.length ? (
        <ul className="cards__cards">
          {filteredCards.map((card, pos) => {
            return (
              <Card
                key={pos}
                title={card.title}
                text={card.text}
                image1x={card.image1x}
                image2x={card.image2x}
                link={card.link}
                time={card.date}
                isActive={card.isInProgress}
                isImportant={card.isImportant}
                type={type}
              />
            );
          })}
        </ul>
      ) : (
        <p className="cards__error">
          Не нашлось ничего подходящего под условия ¯\_(ツ)_/¯
        </p>
      )}
    </section>
  );
}

export default Cards;
