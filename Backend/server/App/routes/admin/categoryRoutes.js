let express = require("express");
const multer = require("multer");
const categoryController = require("../../controllers/admin/categoryController");
let categoryRoutes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/category");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
let uploads = multer({ storage: storage });

// let  uploads = multer({ dest: "uploads/category" });
//File Uploads => File Object Return Controller => file name, size, type
// Upload => Single
// Upload => Multiple
// Upload => Group

//http://localhost:8000/admin/category/create
categoryRoutes.post(
  "/create",
  uploads.single("image"),
  categoryController.create,
);

//http://localhost:8000/admin/category/view
categoryRoutes.get("/view", categoryController.view);

//http://localhost:8000/admin/category/details
categoryRoutes.get("/details/:id", categoryController.getDetails);

//http://localhost:8000/admin/category/delete
categoryRoutes.post("/delete", categoryController.delete);

//http://localhost:8000/admin/category/update
categoryRoutes.put("/update/:id", categoryController.update);

//http://localhost:8000/admin/category/change-status
categoryRoutes.post("/change-status", categoryController.changeStatus);

module.exports = categoryRoutes;
