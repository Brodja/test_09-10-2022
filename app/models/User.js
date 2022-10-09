const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  my_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("user", UserSchema);
