const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
      default: "default.png",
    },
  },
  { timestamps: true },
);

let userModel = mongoose.model("user", userSchema);
module.exports = userModel;
