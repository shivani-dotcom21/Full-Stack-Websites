let mongoose = require("mongoose")

let countrySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"country Name is required"],
            minLength:[2,"country Name Must Be Atleast 2 Charactor"],
            maxLength:[100, "country Name Must Be Atmost 100 Charactor"]
        },
        order: {
            type: Number,
            required:[2,"Country is required"],
        },
        status: {
            type: Boolean,
            default: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)
let countryModel = mongoose.model("country", countrySchema)
module.exports= countryModel