import { useState, useEffect, type ReactNode } from 'react';
import { EventsContext } from '../contexts/EventsContext';
import type { EventType } from '../types/EventType';
import type { EventsContextType } from '../types/EventsContextType'

export default function EventsProvider({ children }: { children: ReactNode }) {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const fetchEvents = async () => {

        try {
            const response = await fetch(`http://localhost:3000/events`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            setError('Failed to load Events!');
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const value: EventsContextType = {
        events,
        loading,
        error,
        refetch: fetchEvents
    };

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    )
}