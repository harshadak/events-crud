import { useState, useEffect, type ReactNode } from 'react';
import { EventsContext } from '../contexts/EventsContext';
import type { EventType, FormData } from '../types/EventType';
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

    const updateEvent = async (id: number, formData: FormData) => {
        try {
            const response = await fetch(`http://localhost:3000/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            // return data;
        } catch (error) {
            console.error(`Error occurred while updating event: ${error}`);
        }
    };

    const value: EventsContextType = {
        events,
        loading,
        error,
        refetch: fetchEvents,
        updateEvent
    };

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    )
}