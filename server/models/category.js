import { Schema,model } from "mongoose";
const categorySchema=new Schema({
    categoryName:String
})
//שומרת את הטבלה במונגו
export default model("Category",categorySchema)