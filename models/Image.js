const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId:String,
  filename: String,
  caption: String,
  link: String,
  likes: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Image", imageSchema);
