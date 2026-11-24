let mongoose = require("mongoose");
let subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Sub Category Name is required"],
    minLength: [2, "Sub Category Name Must Be Atleast 2 Charactor"],
    maxLength: [100, "Sub Category Name Must Be Atmost 100 Charactor"],
  },
  parent : {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'category', // Must match the exact model name of the target
    required: true
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

let subCategoryModel = mongoose.model("subCategory", subCategorySchema);
module.exports = subCategoryModel;
