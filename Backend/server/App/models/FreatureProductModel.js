// const mongoose = require("mongoose");

// const featureProductSchema = new mongoose.Schema({
//   // 1. Product Name (jaise: Caroline Study Tables)
//   name: {
//     type: String,
//     required: [true, "Feature Product name is required"],
//   },

//   // 2. Category Name / Subtitle (jaise: Nest Of Tables)
//   categoryTitle: {
//     type: String,
//   },

//   // 3. Product Image (jo card par show hogi)
//   productImage: {
//     type: String,
//     required: true,
//   },

//   // 4. Current Selling Price (jaise: 2,500)
//   price: {
//     type: Number,
//     required: true,
//   },

//   // 5. Old Price / MRP (jaise: Rs. 3,000 jo cut hua dikh raha hai)
//   oldPrice: {
//     type: Number,
//   },

//   // 6. Product Type (Featured, New Arrivals, Onsale tabs ke liye)
//   productType: {
//     type: String,
//     enum: ["Featured", "New Arrivals", "Onsale"],
//     required: true,
//   },

//   // 7. Order / Indexing (sorting ke liye)
//   order: {
//     type: Number,
//     required: true,
//   },

//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const featureProductModel = mongoose.model("Feature Product",featureProductSchema);
// module.exports = featureProductModel;

const mongoose = require("mongoose");

const featureProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is required"],
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
  },
  productType: {
    type: String,
    enum: ["Featured", "New Arrivals", "Onsale"],
    required: true,
  },
  order: {
    type: Number,
    required: [true, "Order is required"],
  },
  productImage: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const FeatureProductModel = mongoose.model(
  "FeatureProduct",
  featureProductSchema,
);
module.exports = FeatureProductModel;
