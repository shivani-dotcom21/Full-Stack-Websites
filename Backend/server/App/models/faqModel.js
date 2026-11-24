let mongoose = require("mongoose");
let faqSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, " FAQ Question is required"],
  },
  answer: {
    type: String,
    required: [2, "fAQ Answer is required"],
  },
  order: {
    type: Number,
    required: [2, "Order  is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let faqModel = mongoose.model("faq", faqSchema);
module.exports = faqModel;
