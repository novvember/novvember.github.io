import './Timeline.css';
import { doneCards, studyCards } from '../../utils/cardsData';
import { useState } from 'react';
import Cards from '../Cards/Cards';

function Timeline() {
  const [onlyImportant, setOnlyImportant] = useState(false);

  function handleInputChange(event) {
    setOnlyImportant((state) => !state);
  }

  return (
    <main className="timeline">
      <div className="timeline__filter">
        <input
          type="checkbox"
          checked={onlyImportant}
          onChange={handleInputChange}
        />
      </div>
      <Cards title="Сделал" cards={doneCards} onlyImportant={onlyImportant} />
      <Cards
        title="Учусь"
        cards={studyCards}
        onlyImportant={onlyImportant}
        isBaseType
      />
    </main>
  );
}

export default Timeline;
