import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Event } from './EventType';

function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [filteredLocation, setFilteredLocation] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

    useEffect(() => {
        const fetchEvents = async () => {
            const locationQuery = filteredLocation ? `?location=${encodeURIComponent(filteredLocation)}` : '';
            const keywordQuery = debouncedKeyword ? `${locationQuery ? "&" : "?"}keyword=${encodeURIComponent(debouncedKeyword)}` : '';

            try {
                const response = await fetch(`http://localhost:3000/events${locationQuery}${keywordQuery}`);
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
        findLocations();
    }, [filteredLocation, debouncedKeyword]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(keyword);
        }, 500);

        return () => clearTimeout(timer);
    }, [keyword]);

    const findLocations = async () => {

        try {
            const response = await fetch(`http://localhost:3000/events`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const seen = new Set();
            data.map((event: Event) => {
                if (!seen.has(event.location)) {
                    seen.add(event.location);
                    return event.location;
                }
            });
            setLocations([...seen] as string[]);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setFilteredLocation(e.target.value);
    }

    // console.log('keyword = ', keyword);
    // console.log('debouncedKeyword = ', debouncedKeyword);

    return (
        <>
            {/* Text based search */}
            <input type='text' value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='Search by keyword' />
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

            {events.length === 0 && <div style={{ marginTop: 24}}>No events matching the filters! Please try again.</div>}
        </>
    );
}

export default Events;