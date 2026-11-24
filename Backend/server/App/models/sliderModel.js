const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
});

module.exports = mongoose.model("Slider", sliderSchema);
