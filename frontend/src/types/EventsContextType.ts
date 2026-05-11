import type { EventType, FormData } from './EventType';

export type EventsContextType = {
    events: EventType[]
    loading: Boolean,
    error: string | null,
    refetch: () => Promise<void>,
    updateEvent: (id: number, formData: FormData) => Promise<void>
}