import Contacts from '../Contacts/Contacts';
import Footer from '../Footer/Footer';
import Intro from '../Intro/Intro';
import Timeline from '../Timeline/Timeline';
import NavTab from '../NavTab/NavTab';
import './App.css';
import { doneCards, studyCards, todoCards, workCards } from '../../utils/cardsData';

function App() {
  return (
    <>
      <Contacts />
      <Intro>
        <NavTab
          doneCards={doneCards}
          workCards={workCards}
          studyCards={studyCards}
          todoCards={todoCards}
        />
      </Intro>
      <Timeline
        doneCards={doneCards}
        workCards={workCards}
        studyCards={studyCards}
        todoCards={todoCards}
      />
      <Footer />
    </>
  );
}

export default App;
