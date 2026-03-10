import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Event } from './EventType';

function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [locations, setLocations] = useState<string[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3000/events');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
                const uniqueLocations = findLocations();
                setLocations(uniqueLocations);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
        fetchEvents();
    }, [events]);

    const findLocations = () => {
        const seen = new Set();

        events.map(event => {
            if (!seen.has(event.location)) {
                seen.add(event.location);
                return event.location;
            }
        });

        return [...seen] as string[];
    }

    return (
        <>
            {/* Filter by location: */}
            <label htmlFor="location-filter" style={{ marginRight: 10 }}>Filter by location:</label>
            <select name="" id="">
                <option value="">All</option>
                {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                ))}
            </select>

            {events.map(event => (
                <div key={event.id} className='event-card'>
                    <Link to={`/events/${event.id}`}><h3>{event.title}</h3></Link>
                </div>
            ))}
        </>
    );
}

export default Events;