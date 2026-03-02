// Configure the database connection

const { Sequelize } = require('sequelize');

// Create a wrapper for the Sequelize constructor, so we can call it with the `new` keyword
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Path to the SQLite database file
    logging: false, // Disable logging for cleaner output
});

// Export the sequelize instance to be used in other parts of the application
module.exports = sequelize;