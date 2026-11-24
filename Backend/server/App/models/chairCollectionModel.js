const mongoose = require("mongoose");

const chairCollectionSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
});

const chairCollectionModel = mongoose.model("chairCollection", chairCollectionSchema);
module.exports = chairCollectionModel;
