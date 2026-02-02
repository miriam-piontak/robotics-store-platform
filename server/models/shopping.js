import { Schema,model } from "mongoose";
const shoppingSchema=new Schema({
    
    customerCode:String,
    robots:Array,
    sum:Number,
})
//שומרת את הטבלה במונגו
export default model("Shopping",shoppingSchema)