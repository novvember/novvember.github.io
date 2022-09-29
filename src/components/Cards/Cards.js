import Card from '../Card/Card';
import './Cards.css';

function Cards({ title, cards, onlyImportant = false, isBaseType = false }) {
  return (
    <section className="cards">
      <h2 className="cards__title">{title}</h2>
      <ul className="cards__cards">
        {cards
          .filter((card) => {
            if (onlyImportant) return card.isImportant;
            return card;
          })
          .map((card, pos) => {
            return (
              <Card
                key={pos}
                title={card.title}
                text={card.text}
                image={card.image}
                link={card.link}
                time={card.date}
                isActive={card.isInProgress}
                isImportant={card.isImportant}
                isBaseType={isBaseType}
              />
            );
          })}
      </ul>
    </section>
  );
}

export default Cards;
