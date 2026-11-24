let express = require("express")
const { sliderCreate, sliderView, sliderDelete, sliderUpdate } = require("../../controllers/admin/sliderController")
sliderRoutes = express.Router()


//http://localhost:8000/admin/slider/login
sliderRoutes.post("/login", sliderCreate)

//http://localhost:8000/admin/slider/view
sliderRoutes.get("/view", sliderView)

//http://localhost:8000/admin/slider/delete
sliderRoutes.delete("/delete", sliderDelete)

//http://localhost:8000/admin/slider/update
sliderRoutes.put("/update", sliderUpdate)

module.exports = sliderRoutes