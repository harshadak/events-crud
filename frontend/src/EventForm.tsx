import { useEffect, useState } from "react";
import { useEventsContext } from "./hooks/EventHooks";
import { useParams, useNavigate } from 'react-router-dom';
import type { EventType, FormData } from "./types/EventType";

function EventForm() {
    const { events, updateEvent } = useEventsContext();
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        type: '',
        location: ''
    });

    const navigate = useNavigate();

    const { id } = useParams();
    const isEditing = Boolean(id);

    const foundEvent = id ? events.find(event => event.id === parseInt(id)) : undefined;

    // Load event data when editing
    useEffect(() => {
        
        if (foundEvent && isEditing) {
            
            setFormData({
                title: foundEvent.title || '',
                description: foundEvent.description || '',
                type: foundEvent.type || '',
                location: foundEvent.location || ''
            });
        }
    }, [foundEvent, isEditing]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEditing && id) {
            // Update existing event
            updateEvent(parseInt(id), formData);
            navigate(`/events/${id}`);
        } else {
            // Create new event
            const newEvent: EventType = {
                id: Date.now(),
                ...formData,
                date: new Date()
            };
            // addEvent(newEvent);
            navigate('/events');
        }
    };

    const handleChange = (value: Record<string, string>) => {
        setFormData(prev => ({ ...prev, ...value }));
        // setFormData({ ...formData, ...value });
    };

    // Handle cancel button
    const handleCancel = () => {
        navigate('/events');
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="event-form">
                <div style={{ display: 'grid'}}>
                    <label htmlFor="title">Title *</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange({ title: e.target.value })}
                        required
                        placeholder="Enter event title"
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleChange({ description: e.target.value })}
                        rows={4}
                        placeholder="Describe your event..."
                    />

                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        id="type"
                        value={formData.type}
                        onChange={(e) => handleChange({ type: e.target.value })}
                        placeholder="e.g., Conference, Workshop, Meetup"
                    />

                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleChange({ location: e.target.value })}
                        placeholder="Venue name or online link"
                    />
                </div>

                <div>
                    <button type="submit" className="btn-submit">
                        {isEditing ? 'Update Event' : 'Create Event'}
                    </button>
                    <button type="button" className="btn-cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
}

export default EventForm;