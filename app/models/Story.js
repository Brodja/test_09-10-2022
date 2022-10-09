const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  id_from: {
    type: Number,
    required: false,
    default: 0
  },
  id_to: {
    type: Number, 
    required: false,
    default: 0
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

module.exports = mongoose.model('Story', StorySchema);
