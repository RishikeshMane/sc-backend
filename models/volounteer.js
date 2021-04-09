const { text } = require("express");
const mongoose = require("mongoose");

const voluSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number1: {
    type: String,
  },
  number2: {
    type: String,
  },
  email: {
    type: String,
    
  },
  address: {
    type: String,
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipcode: {
    type: String,
  },
  qualification: {
    type: String,
  },
  profession: {
    type: String,
  },
  facebooklink: {
    type: String
  },
  twitterlink: {
    type: String
  },
  instagramlink: {
    type: String
  },
  reasontocontribute: {
    type: String
  },
  hours: {
    type: String
  },
  days: {
    type: String
  },
  image: {
    type: String,
  }
});

module.exports = mongoose.model("volounteer", voluSchema);
