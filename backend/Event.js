// Model - Define the structure of the Event data and interact with the database

const { DataTypes } = require('sequelize'); // Import DataTypes from Sequelize to define the model attributes
const sequelize = require('./db'); // Import the configured Sequelize instance

const Event = sequelize.define('Event', {
    title: {
        type: DataTypes.STRING,
        allowNull: false, // Title is required
    },
    description: {
        type: DataTypes.TEXT
    },
    type: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    }
});

module.exports = Event; // Export the Event model to be used in other parts of the application