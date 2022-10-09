const mongoose = require("mongoose");

const OperationsLogSchema = new mongoose.Schema({
  id_from: {
    type: mongoose.Schema.User.ObjectId,
    required: true,
  },
  id_to: {
    type: mongoose.Schema.User.ObjectId,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('OperationsLog', OperationsLogSchema);
