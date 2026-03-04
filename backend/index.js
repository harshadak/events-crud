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
    console.log('Fetching all events'); // Log a message to indicate that the route is being accessed
    try {
        const events = await Event.findAll(); // Fetch all events from the database
        res.status(200).json(events); // Send the events as a JSON response
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'An error occurred while fetching events.' });
    }
});

// Get a single event by ID
app.get('/events/:id', async (req, res) => {
    const { id } = req.params; // Extract the event ID from the request parameters
    console.log('Fetching event with ID:', id); // Log the ID for debugging purposes
    try {
        const event = await Event.findByPk(id); // Fetch all events from the database
        res.status(200).json(event); // Send the events as a JSON response
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'An error occurred while fetching events.' });
    }
});

// Delete an event by ID
app.delete('/events/:id', async (req, res) => {
    const { id } = req.params; // Extract the event ID from the request parameters
    console.log('Fetching event with ID:', id); // Log the ID for debugging purposes
    try {
        const event = await Event.findByPk(id); // Fetch all events from the database
        // delete the event if it exists
        await event.destroy();
        res.status(200).json({ message: 'Event deleted successfully' }); // Send a success message
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'An error occurred while fetching events.' });
    }
});

// Post a new event
app.post("/events", async (req, res) => {
    const newEvent = req.body;
    console.log(newEvent);
    try {
        const createdEvent = await Event.create(newEvent);
        res.status(201).json({ message: `New event created! ${createdEvent.title}` })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "bad request" })
    }
});

// Patch - update an event by ID
app.patch("/events/:id", async (req, res) => {
    const updates = req.body // This will contain the fields we want to update, e.g. { title: "New Title" }
    const { id } = req.params;
    
    try {
        const foundEvent = await Event.findByPk(id);
        await foundEvent.update(updates);
        await foundEvent.save();
        res.status(200).json({ message: `Event ${foundEvent.title} has been updated` })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "bad request" })
    }
})

// Put - update an event by ID
app.put("/events/:id", async (req, res) => {
    const { id } = req.params;
    const updatedEvent = req.body;

    try {
        const foundEvent = await Event.findByPk(id);
        await foundEvent.update(updatedEvent);
        await foundEvent.save();
        res.status(200).json({ message: `Event with ID ${id} updated successfully!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "bad request" });
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
