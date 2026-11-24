let express = require("express")
const authController = require("../../controllers/admin/authController")
authRoutes = express.Router()


authRoutes.post("/login", authController.login)

module.exports = authRoutes