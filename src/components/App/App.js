import Contacts from '../Contacts/Contacts';
import Footer from '../Footer/Footer';
import HelloMessage from '../HelloMessage/HelloMessage';
import Timeline from '../Timeline/Timeline';
import './App.css';

function App() {
  return (
    <div className="content">
      <Contacts />
      <HelloMessage />
      <Timeline />
      <Footer />
    </div>
  );
}

export default App;
