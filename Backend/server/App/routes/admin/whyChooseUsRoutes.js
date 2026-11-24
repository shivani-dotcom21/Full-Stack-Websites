let express = require("express");
const multer = require("multer");
const whyChooseUsController = require("../../controllers/admin/whyChooseUsController");
let whyChooseUsRoutes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/whyChooseUs");
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
whyChooseUsRoutes.post(
  "/create",
  uploads.single("image"),
  whyChooseUsController.create,
);

//http://localhost:8000/admin/why-choose-us/view
whyChooseUsRoutes.get("/view", whyChooseUsController.view);

//http://localhost:8000/admin/why-choose-us/details
// whyChooseUsRoutes.get("/details/:id", whyChooseUsController.getDetails);

//http://localhost:8000/admin/why-choose-us/delete
whyChooseUsRoutes.post("/delete", whyChooseUsController.delete);

//http://localhost:8000/admin/why-choose-us/update
// whyChooseUsRoutes.put("/update/:id", whyChooseUsController.update);

//http://localhost:8000/admin/why-choose-us/change-status
// whyChooseUsRoutes.post("/change-status", whyChooseUsController.changeStatus);

module.exports = whyChooseUsRoutes;
