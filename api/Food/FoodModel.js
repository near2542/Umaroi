const db = require("mongoose");

const foodSchema = {
    name: {type:String,required:true},
    price : {type:Number,required:true},
    img : {type:String,required:true},
    description : String
}

const Food = db.model("foods",foodSchema)

module.exports = Food;