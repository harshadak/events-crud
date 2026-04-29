import { useEventsContext } from "./hooks/EventHooks";

function EventForm () {
    const { events } = useEventsContext();

    console.log('Events from context = ', events);

    return (
        <>
        </>
    );
}

export default EventForm;