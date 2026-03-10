import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Event } from './EventType';

const EMPTY_EVENT: Event = {
  id: 0,
  title: "",
  description: "",
  type: "",
  location: "",
  date: new Date,
}; // Check if this is necessary or if we can just use null and handle it in the component

function EventCard() {
    const [event, setEvent] = useState<Event>(EMPTY_EVENT);
    const { id } = useParams();
    console.log(useParams());

    useEffect(() => {

        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:3000/events/${id}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        }
        fetchEvent();
    }, []);

    return (
        <>
            <div className='event-card'>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>{event.type}</p>
                <p>{event.location}</p>
                <p>{event.date && new Date(event.date).toLocaleDateString()}</p>
            </div>
            <Link to="/events" className="btn">Go back to Events</Link>
        </>
    );
}

export default EventCard;