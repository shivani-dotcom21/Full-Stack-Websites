let express = require("express");
const multer = require("multer");
const featureProductController = require("../../controllers/web/featureProductController");

let featureProductRoutes = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/featureProduct");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
let uploads = multer({ storage: storage });

// 1. POST Route (Data Create karne ke liye) -> URL: http://localhost:8000/web/create
featureProductRoutes.post(
  "/create",
  uploads.fields([{ name: "productImage", maxCount: 1 }]),
  featureProductController.create,
);

// 2. GET Route (Saare products view karne ke liye) -> URL: http://localhost:8000/web/view
featureProductRoutes.get("/view", featureProductController.view);

// 3. GET Route (Type ke hisaab se view karne ke liye) -> URL: http://localhost:8000/web/type/Featured
featureProductRoutes.get("/type/:type", featureProductController.getByType);

module.exports = featureProductRoutes;
