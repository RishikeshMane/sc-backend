const mongoose = require("mongoose");
const alienSchema = new mongoose.Schema({
  name: {
    type: String
  },
  mobileno: {
    type: String
  },
  email: {
    type: String,
    required: true,
  },
  pincode: {
    type: String
  },
  department: {
    type: String
  },
  locality: {
    type: String
  },
  siteaddress: {
    type: String
  },
  complaintaddress: {
    type: String
  },
  reasontocontribute: {
    type: String
  },
  images: []
});

module.exports = mongoose.model("publicgri", alienSchema);
