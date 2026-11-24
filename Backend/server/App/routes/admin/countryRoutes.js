let express= require("express")
const countryController = require("../../controllers/admin/countryController")

let countryRoutes= express.Router()


//http://localhost:8000/admin/country/create
countryRoutes.post("/create",  countryController.create)

//http://localhost:8000/admin/country/view
countryRoutes.get("/view",  countryController.view)

//http://localhost:8000/admin/country/delete
countryRoutes.post("/delete",  countryController.delete)

//http://localhost:8000/admin/country/update
countryRoutes.put("/update/:id",  countryController.update)

//http://localhost:8000/admin/country/change-status
countryRoutes.post("/change-status",  countryController.changeStatus)

module.exports = countryRoutes