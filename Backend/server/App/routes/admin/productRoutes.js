let express = require("express");
const multer = require("multer");
const {
  productController,
} = require("../../controllers/admin/productController");
const colorController = require("../../controllers/admin/colorController");

let productRoutes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/product");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
let uploads = multer({ storage: storage });

productRoutes.post(
  "/create",
  uploads.fields([
    {
      name: "productImage",
      maxCount: 1,
    },
    {
      name: "backImage",
      maxCount: 1,
    },
    {
      name: "galleryImage",
      maxCount: 20,
    },
  ]),
  productController.create,
);

//http://localhost:8000/admin/product/view
productRoutes.get("/view", productController.view );

//http://localhost:8000/admin/products/details
productRoutes.get("/details/:id", productController.details );

//http://localhost:8000/admin/product/update
// productRoutes.put("/update/:id",productController.update)

//http://localhost:8000/admin/product/parent
productRoutes.get("/parent", productController.parent);

//http://localhost:8000/admin/product/sub-category
productRoutes.get("/sub-category/:parentId", productController.subCategory);

//http://localhost:8000/admin/product/sub-sub-category
productRoutes.get(
  "/sub-sub-category/:subCategoryId",
  productController.subSubCategory,
);

//http://localhost:8000/admin/product/material
productRoutes.get("/material", productController.material);

//http://localhost:8000/admin/product/color
productRoutes.get("/color", productController.color);

// //http://localhost:8000/admin/product/delete
productRoutes.post("/delete", productController.delete);

module.exports = productRoutes;
