import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <h1>Welcome to the Events App</h1>
            <p>Manage your events with ease. Create, view, update, and delete events all in one place.</p>
            <Link to="/events" className="btn">View Events</Link>
        </>
    );
}

export default Home;