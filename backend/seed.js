// Dummy data to seed the database

const sequelize = require('./db'); // Bringing in our DB
const Event = require('./Event'); // Bringing in our Event model

// Array of dummy events to seed the database
const dummyEvents = [
    {
        title: "Tech Career Fair 2026",
        description: "A networking event with startups and enterprise companies.",
        type: "Networking",
        location: "New York, NY",
        date: new Date("2026-04-15T18:00:00")
    },
    {
        title: "React Beginners Workshop",
        description: "Hands-on workshop covering hooks, state, and component design.",
        type: "Workshop",
        location: "Online",
        date: new Date("2026-03-20T10:00:00")
    },
    {
        title: "Startup Pitch Night",
        description: "Early-stage founders pitch to investors and community members.",
        type: "Conference",
        location: "San Francisco, CA",
        date: new Date("2026-05-01T19:30:00")
    },
    {
        title: "Yoga in the Park",
        description: "Outdoor yoga session for all experience levels.",
        type: "Wellness",
        location: "New York, NY",
        date: new Date("2026-03-10T08:00:00")
    },
    {
        title: "AI & Education Panel",
        description: "Discussion on the future of AI in EdTech.",
        type: "Panel",
        location: "New York, NY",
        date: new Date("2026-04-05T17:00:00")
    },
    {
        title: "Music Production Meetup",
        description: "Share tracks, talk gear, and collaborate.",
        type: "Meetup",
        location: "Los Angeles, CA",
        date: new Date("2026-06-12T20:00:00")
    },
    {
        title: "Full Stack Bootcamp Demo Day",
        description: "Students present final projects to mentors and recruiters.",
        type: "Demo Day",
        location: "Chicago, IL",
        date: new Date("2026-05-22T14:00:00")
    }
];

const seedDatabase = async () => {
    try {
        // Reset the DB so no dupes are present
        await sequelize.sync({ force: true }); // This will drop and recreate the tables
        console.log("Database synced successfully!");

        // Seed the database with dummy events
        await Event.bulkCreate(dummyEvents);
        console.log("Database seeded with dummy events!");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}

seedDatabase(); // Call the function to seed the database when this file is run