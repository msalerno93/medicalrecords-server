const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  npiNumber: {
    type: Number,
    required: true
  },
  taxIdNumber: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model("Provider", providerSchema);