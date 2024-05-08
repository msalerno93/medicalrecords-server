const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  street: String,
  city: String,
  state: String,
  zipCode: Number,
  occupation: String,
  faxNumber: String
});

module.exports = mongoose.model("Insurance", insuranceSchema);