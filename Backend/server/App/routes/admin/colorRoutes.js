let express= require("express")
const colorController = require("../../controllers/admin/colorController");
let colorRoutes= express.Router()


//http://localhost:8000/admin/color/create
colorRoutes.post("/create", colorController.create)

//http://localhost:8000/admin/color/view
colorRoutes.get("/view", colorController.view)

//http://localhost:8000/admin/color/details
colorRoutes.get("/details/:id", colorController.getDetails)

//http://localhost:8000/admin/color/delete
colorRoutes.post("/delete",colorController.delete)

//http://localhost:8000/admin/color/update
colorRoutes.put("/update/:id",colorController.update)

//http://localhost:8000/admin/color/change-status
colorRoutes.post("/change-status", colorController.changeStatus)

module.exports = colorRoutes