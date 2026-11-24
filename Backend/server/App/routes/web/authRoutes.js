let express = require("express");
const authController = require("../../controllers/web/authController");
const multer = require("multer");
let authRoutes = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
let uploads = multer({ storage: storage });

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/forgot-password", authController.forgotPassword);
authRoutes.post("/reset-password/:id", authController.resetPassword);
authRoutes.post("/change-password", authController.changePassword);
authRoutes.post("/update-profile", uploads.single('image'), authController.updateProfile);

module.exports = authRoutes;
