const db = require("mongoose");

const OrderSchema = {
    cus_name: { type:String, required:true},
    MenuList : [{
        MenuName : {type:String,required:true},
        Price  : {type:Number,required:true},
        qty : {type:Number,required:true},
        total : {type:Number,default:0}
    }],
    Total :{type:Number,required:true,default:0},
    Confirmed : {type:Boolean,default:false},
    Location : {type:String,required:true},
}

const orders = db.model("orders",OrderSchema)

module.exports = orders;