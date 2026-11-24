let mongoose = require("mongoose");
let whyChooseUsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Title Name is required"],
    minLength: [2, "Title Name Must Be Atleast 2 Charactor"],
    maxLength: [100, "Title Name Must Be Atmost 100 Charactor"],
  },
  image: String, //Image Name
  order: {
    type: Number,
    required: [2, "Order  is required"],
  },

  productImage: String, //Image Name
  description: String,

  status: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let whyChooseUsModel = mongoose.model("whyChooseUs", whyChooseUsSchema);
module.exports = whyChooseUsModel;
