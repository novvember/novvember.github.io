import './Timeline.css';
import { useState } from 'react';
import Cards from '../Cards/Cards';
import Filter from '../Filter/Filter';

function Timeline({ doneCards, workCards, studyCards, todoCards }) {
  const [filterValues, setFilterValues] = useState({
    onlyImportant: true,
    onlyActive: false,
  });

  function handleFilterChange(event) {
    const input = event.target;
    const name = input.name;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    setFilterValues((state) => ({ ...state, [name]: value }));
  }

  return (
    <main className="timeline section">
      <Filter values={filterValues} onChange={handleFilterChange} />
      <Cards
        title="Сделал"
        id="done"
        cards={doneCards}
        onlyImportant={filterValues.onlyImportant}
        onlyActive={filterValues.onlyActive}
      />
      <Cards
        title="Работаю"
        id="work"
        cards={workCards}
        onlyImportant={filterValues.onlyImportant}
        onlyActive={filterValues.onlyActive}
        type="base"
      />
      <Cards
        title="Учусь"
        id="study"
        cards={studyCards}
        onlyImportant={filterValues.onlyImportant}
        type="base"
        onlyActive={filterValues.onlyActive}
      />
      <Cards title="Хочу сделать" id="todo" cards={todoCards} type="no-image" />
    </main>
  );
}

export default Timeline;
