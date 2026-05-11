import { useContext } from "react";
import { EventsContext } from "../contexts/EventsContext";

export function useEventsContext() {
    const context = useContext(EventsContext);

    if (!context) throw new Error("EventForm must be used within an EventsProvider");
    return context;
}

// export function findSingleEvent(id: string | number) {
//     const { events } = useEventsContext();

//     const foundEvent: EventType | undefined = events.find(event =>
//         Number(event.id) === Number(id)
//     );

//     return foundEvent;
// }