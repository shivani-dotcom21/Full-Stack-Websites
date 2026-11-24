let express = require("express")
const faqController = require("../../controllers/admin/faqController")

let faqRoutes = express.Router()

// http://localhost:8000/admin/faq/create
faqRoutes.post("/create", faqController.create)

// http://localhost:8000/admin/faq/view
faqRoutes.get("/view", faqController.view)

// http://localhost:8000/admin/faq/delete
faqRoutes.post("/delete", faqController.delete)

// http://localhost:8000/admin/faq/update
faqRoutes.put("/update/:id", faqController.update)

// http://localhost:8000/admin/faq/change-status
faqRoutes.post("/change-status", faqController.changeStatus)

module.exports = faqRoutes