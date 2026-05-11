import { useState, useEffect } from 'react';
import { useEventsContext } from './hooks/EventHooks';
import { Link } from 'react-router-dom';
import type { EventType } from './types/EventType';

function Events() {
    const { events, refetch } = useEventsContext();
    const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [filteredLocation, setFilteredLocation] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         const locationQuery = filteredLocation ? `?location=${encodeURIComponent(filteredLocation)}` : '';
    //         const keywordQuery = debouncedKeyword ? `${locationQuery ? "&" : "?"}keyword=${encodeURIComponent(debouncedKeyword)}` : '';

    //         try {
    //             const response = await fetch(`http://localhost:3000/events${locationQuery}${keywordQuery}`);
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             const data = await response.json();
    //             setEvents(data);
    //         } catch (error) {
    //             console.error('Error fetching events:', error);
    //         }
    //     }
    //     fetchEvents();
    //     findLocations();
    // }, [filteredLocation, debouncedKeyword]);

    useEffect(() => {
        findLocations();
    }, [debouncedKeyword]);

    useEffect(() => {
        refetch();
        setFilteredEvents([...events]);
        findLocations();
    }, [events]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(keyword);
        }, 500);

        return () => clearTimeout(timer);
    }, [keyword]);

    const findLocations = async () => {

        try {
            // const response = await fetch(`http://localhost:3000/events`);
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            // const data = await response.json();
            const seen = new Set();
            filteredEvents.map((event: EventType) => {
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

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setKeyword(e.target.value);
        filteredResults(e.target.value, filteredLocation);
    }

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilteredLocation(e.target.value);
        filteredResults(debouncedKeyword, e.target.value);
    }

    const filteredResults = (keyword: string, location: string) => {
        const filteredEvents = events.filter(event => {
            const matchesLocation = !location || event.location === location;
            const matchesKeyword = !keyword || event.title.toLowerCase().includes(keyword.toLowerCase());

            return matchesLocation && matchesKeyword;
        });

        setFilteredEvents(filteredEvents);
    }

    return (
        <>
            {/* Text based search */}
            <input type='text' value={keyword} onChange={(e) => handleKeywordChange(e)} placeholder='Search by keyword' />
            {/* Filter by location: */}
            <label htmlFor="location-filter" style={{ marginRight: 10 }}>Filter by location:</label>
            <select name="" id="" onChange={(e) => handleLocationChange(e)} value={filteredLocation}>
                <option value="">All</option>
                {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                ))}
            </select>

            {filteredEvents.map(event => (
                <div key={event.id} className='event-card'>
                    <Link to={`/events/${event.id}`}><h3>{event.title}</h3></Link>
                </div>
            ))}

            {filteredEvents.length === 0 && <div style={{ marginTop: 24 }}>No events matching the filters! Please try again.</div>}
        </>
    );
}

export default Events;