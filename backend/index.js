// Create an entry point - server

const express = require('express');
const cors = require('cors'); // Import CORS middleware to handle cross-origin requests
const sequelize = require('./db'); // Import the configured Sequelize instance
const Event = require('./Event'); // Import the Event model to interact with the events table

const PORT = 3000;
const app = express();

// CORS
app.use(cors());
app.use(express.json()); // json -> JS object

// Routes
// Get all events
app.get('/events', async (req, res) => {
    const { location, keyword } = req.query; // Extract the location query parameter from the request
    console.log("LOCATION? ", location, "keyword", keyword);

    try {
        let events = await Event.findAll();

        if (location) {
            events = events.filter((event) => event.location === location);
        }
        if (keyword) {
            events = events.filter((event) => event.title.toLowerCase().includes(keyword.toLowerCase()));
        }

        res.status(200).json(events);
    } catch (error) {
        console.error('GET /events error:', error);
        res.status(500).json({ error: 'An error occurred while fetching events.' });
    }
});

// Get a single event by ID
app.get('/events/:id', async (req, res) => {
    const { id } = req.params; // Extract the event ID from the request parameters

    try {
        const event = await Event.findByPk(id); // Fetch the event with the specified ID from the database

        if (!event) {
            return res.status(404).json({ error: 'Event not found.' }); // If no event is found, send a 404 response
        }

        res.status(200).json(event); // Send the event as a JSON response
    } catch (error) {
        console.error(`GET /events/${id} error:`, error);
        res.status(500).json({ error: 'An error occurred while fetching events.' });
    }
});

// Delete an event by ID
app.delete('/events/:id', async (req, res) => {
    const { id } = req.params; // Extract the event ID from the request parameters

    try {
        const event = await Event.findByPk(id); // Fetch the event with the specified ID from the database

        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        // delete the event if it exists
        await event.destroy();
        res.status(200).json({ message: 'Event deleted successfully.', id: Number(id) }); // Send a success message
    } catch (error) {
        console.error(`DELETE /events/${id} error:`, error);
        res.status(500).json({ error: 'An error occurred while deleting the event.' });
    }
});

// Create a new event
app.post("/events", async (req, res) => {
    const newEvent = req.body;

    try {
        if (!newEvent.title || newEvent.title.trim() === '') {
            return res.status(400).json({ error: 'Title is required' });
        }

        const createdEvent = await Event.create(newEvent);
        res.status(201).json({ message: `New event created. ${createdEvent.title}`, event: createdEvent });
    } catch (error) {
        console.error(`POST /events error:`, error);
        res.status(400).json({ error: "Invalid event data" });
    }
});

// Patch - update an event by ID
app.patch("/events/:id", async (req, res) => {
    const updates = req.body // This will contain the fields we want to update, e.g. { title: "New Title" }
    const { id } = req.params;

    try {
        const foundEvent = await Event.findByPk(id); // Find the event by its primary key (ID)

        if (!foundEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        const updated = await foundEvent.update(updates);
        res.status(200).json({ message: `Event ${updated.title} has been updated.`, event: updated })
        // await foundEvent.save();
    } catch (error) {
        console.error(`PATCH /events/${id} error:`, error);
        res.status(400).json({ error: "Invalid update payload" });
    }
})

// Put - update an event by ID
app.put("/events/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const foundEvent = await Event.findByPk(id);

        if (!foundEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        const updated = await foundEvent.update(updates);
        // await foundEvent.save();
        res.status(200).json({ message: `Event with ID ${id} updated successfully.`, event: updated });
    } catch (error) {
        console.error(`PUT /events/${id} error:`, error);
        res.status(400).json({ error: "Invalid update payload" });
    }
});

// start of DB
const start = async () => {
    try {
        await sequelize.authenticate(); // Test the database connection
        await sequelize.sync(); // Tables exist? If not, create them

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

start(); // Start the database connection and sync
