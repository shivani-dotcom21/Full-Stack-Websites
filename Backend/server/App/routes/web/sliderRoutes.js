const express = require("express");
const router = express.Router();
const multer = require("multer");
const { view, create } = require("../../controllers/web/sliderController");

// Vercel serverless ke liye memoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get("/sliders", view);
router.post("/slider/add", upload.single("imageUrl"), create);

module.exports = router;