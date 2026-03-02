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
app.get('/events', async (req, res) => {
    try {
        const events = await Event.findAll(); // Fetch all events from the database
        res.json(events); // Send the events as a JSON response
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'An error occurred while fetching events.' });
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
