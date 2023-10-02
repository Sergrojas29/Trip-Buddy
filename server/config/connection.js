const mongoose = require('mongoose');
// import 'dotenv/config'
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/TripBuddy');

module.exports = mongoose.connection;
