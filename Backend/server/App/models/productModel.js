let mongoose = require("mongoose");
let product = mongoose.Schema({
  name: {
    type: String,
    required: [true, "product Name is required"],
    minLength: [2, "product Name Must Be Atleast 2 Charactor"],
    maxLength: [100, "product Name Must Be Atmost 100 Charactor"],
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
  },
  subSubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subSubCategory",
  },
  material: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "material",
  }],
  color: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "color",
  }],
  productType: {
    type: String,
    enum: ["Featured", "New Arrivals", "Onsale"],
  },
  bestSelling: {
    type: Boolean,
    enum: [true, false],
  },
  topRate: {
    type: Boolean,
    enum: [true, false],
  },
  upsell: {
    type: Boolean,
    enum: [true, false],
  },
  actualPrice: {
    type: Number,
  },
  shellPrice: {
    type: Number,
  },

  stock: {
    type: Number,
  },

  productImage: String, //Image Name
  backImage: String,
  galleryImage: Array,
  description: String,

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

let productModel = mongoose.model("product", product);
module.exports = productModel;
