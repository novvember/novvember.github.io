import './Timeline.css';
import { doneCards, studyCards, todoCards } from '../../utils/cardsData';
import { useState } from 'react';
import Cards from '../Cards/Cards';
import Filter from '../Filter/Filter';

function Timeline() {
  const [filterValues, setFilterValues] = useState({ onlyImportant: false });

  function handleFilterChange(event) {
    const input = event.target;
    const name = input.name;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    setFilterValues((state) => ({ ...state, [name]: value }));
  }

  return (
    <main className="timeline">
      <Filter values={filterValues} onChange={handleFilterChange} />
      <Cards
        title="Сделал"
        cards={doneCards}
        onlyImportant={filterValues.onlyImportant}
      />
      <Cards
        title="Учусь"
        cards={studyCards}
        onlyImportant={filterValues.onlyImportant}
        type="base"
      />
      <Cards
        title="Хочу сделать"
        cards={todoCards}
        // onlyImportant={filterValues.onlyImportant}
        type="no-image"
      />
    </main>
  );
}

export default Timeline;
