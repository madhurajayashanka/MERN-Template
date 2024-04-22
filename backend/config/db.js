require('dotenv').config();

const mongoose = require('mongoose');
MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
