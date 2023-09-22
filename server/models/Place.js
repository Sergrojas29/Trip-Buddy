const { Schema } = require('mongoose');

const placeSchema = new Schema({

title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  
});

module.exports = placeSchema;
