const express = require("express");
const chairCollectionRoutes = express.Router();
const {
  view,
  create,
} = require("../../controllers/web/chairCollectionController");

const multer = require("multer");
const path = require("path");

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/chairCollection");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Routes

chairCollectionRoutes.get("/chairCollection", view);
chairCollectionRoutes.post("/chairCollection/add", upload.single("imageUrl"), create);

module.exports = chairCollectionRoutes;
