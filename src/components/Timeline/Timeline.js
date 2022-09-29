import Card from '../Card/Card';
import './Timeline.css';
import { doneCards } from '../../utils/cardsData';

function Timeline() {
  return (
    <main className="timeline">
      <div className="timeline__filter">filter</div>
      <ul className="timeline__cards">
        {doneCards.map((card, pos) => {
          return (
            <Card
              key={pos}
              title={card.title}
              text={card.text}
              image={card.image}
              time={card.date}
              isActive={card.isInProgress}
              isImportant={card.isImportant}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Timeline;
