const mongoose = require('mongoose');
require('dotenv').config();

const ConnectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
};

module.exports = ConnectToDatabase 
