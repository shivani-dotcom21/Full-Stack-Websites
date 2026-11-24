let mongoose = require("mongoose");
let categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category Name is required"],
    minLength: [2, "Category Name Must Be Atleast 2 Charactor"],
    maxLength: [100, "Category Name Must Be Atmost 100 Charactor"],
  },

  image: String, //Image Name
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

let categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
