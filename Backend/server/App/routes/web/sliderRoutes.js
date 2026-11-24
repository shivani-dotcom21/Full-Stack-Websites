const express = require("express");
const router = express.Router();
const { view, create } = require("../../controllers/web/sliderController");

const multer = require("multer");
const path = require("path");

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/slider");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });


// Routes
router.get("/sliders", view);
router.post("/slider/add", upload.single("imageUrl"), create);

module.exports = router;
