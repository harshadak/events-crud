import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Event } from './EventType';

function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [filteredLocation, setFilteredLocation] = useState<string>("");

    useEffect(() => {
        const fetchEvents = async () => {
            const locationQuery = filteredLocation ? `?location=${encodeURIComponent(filteredLocation)}` : '';
            try {
                const response = await fetch(`http://localhost:3000/events${locationQuery}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
                const uniqueLocations = findLocations(data);
                console.log('uniqueLocations:', uniqueLocations);
                setLocations(uniqueLocations);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
        fetchEvents();
    }, [filteredLocation]);

    const findLocations = (events: Event[]) => {
        const seen = new Set();
        events.map(event => {
            if (!seen.has(event.location)) {
                seen.add(event.location);
                return event.location;
            }
        });

        return [...seen] as string[];
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setFilteredLocation(e.target.value);
    }

    return (
        <>
            {/* Filter by location: */}
            <label htmlFor="location-filter" style={{ marginRight: 10 }}>Filter by location:</label>
            <select name="" id="" onChange={(e) => handleChange(e)} value={filteredLocation}>
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