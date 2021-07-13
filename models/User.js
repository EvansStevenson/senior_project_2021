const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Object,
    default: {
      caesar: [false, false, false, false], 
      playfair: [false, false, false, false], 
      columnar: [false, false, false, false], 
      railfence: [false, false, false, false ], 
      vigenere: [false, false, false, false], 
      foursquare: [false, false, false, false]}
  }
});

module.exports = User = mongoose.model("users", UserSchema);
