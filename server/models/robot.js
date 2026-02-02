import { Schema,model } from "mongoose";
const robotSchema=new Schema({
    robotName:String,
    categoryCode:Number,
    price:Number,
    img:String,
    amountInStock:Number,
    desc:String

})
//שומרת את הטבלה במונגו
export default model("Robot",robotSchema)