import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Events from './Events';
import EventCard from './EventCard';
import EventForm from './EventForm';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventCard />} />
        <Route path='/events/edit-form/:id' element={<EventForm />} />
      </Routes>
    </>
  );
}

export default App;
