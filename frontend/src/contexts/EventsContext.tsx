import { createContext } from 'react';
import type { EventsContextType } from '../types/EventsContextType';

export const EventsContext = createContext<EventsContextType | null>(null);