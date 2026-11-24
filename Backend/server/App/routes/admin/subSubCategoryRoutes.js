let express = require("express");
const multer = require("multer");
const {
  subCategoryController,
} = require("../../controllers/admin/subCategoryController");
const { subSubCategoryController } = require("../../controllers/admin/subSubCategoryController");
let subSubCategoryRoutes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/subsubcategory");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
let uploads = multer({ storage: storage });

//http://localhost:8000/admin/sub-sub-category/create
subSubCategoryRoutes.post(
  "/create",uploads.single("image"), 
  subSubCategoryController.create
);

//http://localhost:8000/admin/sub-sub-category/view
subSubCategoryRoutes.get("/view", subSubCategoryController.view);

//http://localhost:8000/admin/sub-sub-category/parent
subSubCategoryRoutes.get("/parent", subSubCategoryController.parent);

//http://localhost:8000/admin/sub-sub-category/sub-category
subSubCategoryRoutes.get("/sub-category/:parentId", subSubCategoryController.subCategory);

// //http://localhost:8000/admin/sub-sub-category/delete
subSubCategoryRoutes.post("/delete",subSubCategoryController.delete);

module.exports = subSubCategoryRoutes;
