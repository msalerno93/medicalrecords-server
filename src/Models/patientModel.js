const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: String,
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
  policyNumber: {
    type: String,
    required: true
  },
  insuranceName: {
    type: String,
    required: true
  },
  notes: [{
    note: String,
    provider: String,
    date: String
  }]
});

module.exports = mongoose.model("Patient", patientSchema);