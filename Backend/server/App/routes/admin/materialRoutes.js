let express = require("express");
const materialModel = require("../../models/materialModel");
const materialController = require("../../controllers/admin/materialController");
materialRoutes = express.Router()

//http://localhost:8000/admin/material/create
 materialRoutes.post("/create", materialController.create)

//http://localhost:8000/admin/material/view
materialRoutes.get("/view", materialController.view)

//http://localhost:8000/admin/material/details
materialRoutes.get("/details/:id", materialController.getDetails)

//http://localhost:8000/admin/material/delete
materialRoutes.post("/delete", materialController.delete)

//http://localhost:8000/admin/material/update
materialRoutes.put("/update/:id", materialController.update)

//http://localhost:8000/admin/material/change-status
materialRoutes.post("/change-status", materialController.changeStatus)

module.exports = materialRoutes;
