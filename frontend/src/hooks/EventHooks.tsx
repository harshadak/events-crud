import { useContext } from "react";
import { EventsContext } from "../contexts/EventsContext";

export function useEventsContext() {
    const context = useContext(EventsContext);

    if (!context) throw new Error("EventForm must be used within an EventsProvider");
    return context;
}