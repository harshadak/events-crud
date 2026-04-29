import type { EventType } from './EventType';

export type EventsContextType = {
    events: EventType[]
    loading: Boolean,
    error: string | null,
    refetch: () => Promise<void>
}