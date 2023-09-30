const { Schema } = require('mongoose');

const placeSchema = new Schema({

  xid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  address: {
    type: Schema.Types.Mixed,
    required: true,
  },

  image: {
    type: String,
  },
  
  wikipedia_extracts: {
    type: Schema.Types.Mixed,
    required: true,
  },

  preview: {
    type: Schema.Types.Mixed,
  }

});

module.exports = placeSchema;
