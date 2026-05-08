import { useContext } from "react";
import { EventsContext } from "../contexts/EventsContext";
import type { EventType, FormData } from "../types/EventType";

export function useEventsContext() {
    const context = useContext(EventsContext);

    if (!context) throw new Error("EventForm must be used within an EventsProvider");
    return context;
}

export function findSingleEvent(id: string | number) {
    const { events } = useEventsContext();

    const foundEvent: EventType | undefined = events.find(event =>
        Number(event.id) === Number(id)
    );

    console.log('foundEvent from hooks = ', foundEvent);

    return foundEvent;
}

export async function updateEvent(id: number, formData: FormData) {
    try {
        const response = await fetch(`http://localhost:3000/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error occurred while updating event: ${error}`);
    }
}