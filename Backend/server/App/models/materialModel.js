let mongoose = require("mongoose")
let materialSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"material Name is required"],
            minLength:[2,"material Name Must Be Atleast 2 Charactor"],
            maxLength:[100, "material Name Must Be Atmost 100 Charactor"]
        },
        order: {
            type: Number,
            required:[2,"Order  is required"],
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
let materialModel = mongoose.model("material", materialSchema)
module.exports= materialModel