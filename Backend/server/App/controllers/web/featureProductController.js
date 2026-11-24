// const featureProductModel = require("../../models/FreatureProductModel");

// let featureProductController = {
//   // 1. Product Create (Admin ke liye - Postman se data save karne ke liye)
//   create: async (req, res) => {
//     try {
//       let insertObj = { ...req.body };

//       // Agar image upload ki gayi hai toh path set karein
//       if (req.files && req.files.productImage) {
//         insertObj["productImage"] =
//           `uploads/product/${req.files.productImage[0].filename}`;
//       }

//       // Check karein ki product pehle se exist toh nahi karta
//       let checkProduct = await featureProductModel.findOne({
//         name: insertObj.name,
//       });
//       if (checkProduct) {
//         return res.json({
//           status: false,
//           message: "Feature Product Name Already Exists..",
//         });
//       }

//       // Database mein save karein
//       let newProduct = new featureProductModel(insertObj);
//       let savedProduct = await newProduct.save();

//       res.json({
//         status: true,
//         message: " Feature Product Added Successfully",
//         product: savedProduct,
//       });
//     } catch (error) {
//       res.status(500).json({
//         status: false,
//         message: error.message,
//       });
//     }
//   },

//   // 2. Get Products By Type (Frontend ke liye - Featured, New Arrivals, Onsale fetch karne ke liye)
//   getByType: async (req, res) => {
//     try {
//       let { type } = req.params; // e.g., "Featured", "New Arrivals", "Onsale"
//       let products = await featureProductModel.find({ productType: type });

//       res.json({
//         success: true,
//         products,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   },
// };

// module.exports = featureProductController;

const FeatureProductModel = require("../../models/FreatureProductModel");

let featureProductController = {
  // 1. CREATE: Product save karne aur image upload karne ke liye (POST)
  create: async (req, res) => {
    try {
      let insertObj = { ...req.body };

      // Agar image upload ki gayi hai, toh uska sahi folder path set karein
      if (req.files && req.files.productImage) {
        insertObj["productImage"] =
          `uploads/featureProduct/${req.files.productImage[0].filename}`;
      }

      // Check karein ki is naam ka product pehle se exist toh nahi karta
      let checkProduct = await FeatureProductModel.findOne({
        name: insertObj.name,
      });
      if (checkProduct) {
        return res.json({
          status: false,
          message: "Product Name Already Exists..",
        });
      }

      // Database mein naya product save karein
      let product = new FeatureProductModel(insertObj);
      let saveRes = await product.save();

      res.json({
        status: true,
        message: "Product Added Successfully",
        insertRes: saveRes,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  // 2. VIEW ALL: Saare products ek sath fetch karne ke liye (GET)
  view: async (req, res) => {
    try {
      let products = await FeatureProductModel.find();
      res.json({
        success: true,
        status: true,
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // 3. GET BY TYPE: Tabs ke mutabiq products fetch karne ke liye (Featured, New Arrivals, Onsale) (GET)
  getByType: async (req, res) => {
    try {
      let { type } = req.params; // URL se type milega (jaise Featured)
      let products = await FeatureProductModel.find({ productType: type });

      res.json({
        success: true,
        status: true,
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = featureProductController;
