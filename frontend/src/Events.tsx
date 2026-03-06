import { useState, useEffect } from 'react';

type Event = {
  id: number;
  title: string;
  description?: string;
  type?: string
  location?: string;
  date: Date;
};

function Events() {
    const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <>
      {events.map(event => (
        <div key={event.id} className='event-card'>
          <h3>{event.title}</h3>
          {/* <p>{event.description}</p>
          <p>{event.type}</p>
          <p>{event.location}</p>
          <p>{new Date(event.date).toLocaleDateString()}</p> */}
        </div>
      ))}
    </>
  );
}

export default Events;