const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "employee"
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("User", userSchema);