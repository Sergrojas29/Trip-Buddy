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
    address: {
      road: String,
      house: String,
      state: String,
      suburb: String,
      country: String,
      postcode: String,
      country_code: String,
      house_number: String,
      state_district: String,
    }
    required: true,
  },
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  
});

module.exports = placeSchema;
