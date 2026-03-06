import './App.css';
import { Routes, Route } from "react-router-dom";
import Home  from './Home';
import Events from './Events';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" />
      </Routes>
    </>
  );
}

export default App;
