let mongoose = require("mongoose")
let colorSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Color Name is required"],
            minLength:[2,"Color Name Must Be Atleast 2 Charactor"],
            maxLength:[100, "Color Name Must Be Atmost 100 Charactor"]
        },
        code: {
            type: String,
            required:[2,"Code  is required"],
            minLenght:[2,"Code Must Be Atleast 2 Charactor"],
            maxLength:[100, "Code Must Be Atmost 100 Charactor"]
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

let colorModel = mongoose.model("color", colorSchema)
module.exports= colorModel