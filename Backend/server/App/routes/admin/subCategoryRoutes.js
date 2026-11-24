let express = require("express");
const multer = require("multer");
const {
  subCategoryController,
} = require("../../controllers/admin/subCategoryController");
let subCategoryRoutes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/subcategory");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
let uploads = multer({ storage: storage });

//http://localhost:8000/admin/subcategory/create
subCategoryRoutes.post("/create", uploads.single("image"), subCategoryController.create);

//http://localhost:8000/admin/subcategory/view
subCategoryRoutes.get("/view", subCategoryController.view);

subCategoryRoutes.get("/parent", subCategoryController.parent);

// http://localhost:8000/admin/subcategory/details
// categoryRoutes.get("/details/:id", subCategoryController.getDetails);

// //http://localhost:8000/admin/subcategory/delete
subCategoryRoutes.post("/delete", subCategoryController.delete);

// //http://localhost:8000/admin/subcategory/update
// categoryRoutes.put("/update/:id", subCategoryController.update);

// //http://localhost:8000/admin/subcategory/change-status
// categoryRoutes.post("/change-status",subCategoryController.changeStatus);

module.exports = subCategoryRoutes;
