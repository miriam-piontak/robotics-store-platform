import { Schema,model } from "mongoose";
const customerSchema=new Schema({
    customerName:String,
    pin:String,
    creditDetails:String

})
//שומרת את הטבלה במונגו
export default model("Customer",customerSchema)
