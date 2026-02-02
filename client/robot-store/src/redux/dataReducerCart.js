import { createSlice } from "@reduxjs/toolkit";
const initialState={
    arr_cart:[],
    total_amount:0
}
const dataReducerCart=createSlice({
    name:"addToCart",
    initialState,
    reducers:{
        add:(state,action)=>{
            state.total_amount += action.payload.price;
            //בודקת האם המוצר קיים במערך
            const i=state.arr_cart.findIndex(i=>i._id==action.payload._id)
            
            if(i==-1)
            {
                //אם לא מצא נוסיף אותו עם כמות 1
               state.arr_cart.push({...action.payload,count:1})
              
            }
          
            //אם מצא נעלה לו את הכמות ב1
            else
                state.arr_cart[i].count++;
           
        },

        less:(state,action)=>{
            
             state.total_amount -= action.payload.price;
            //בודקת האם המוצר קיים רק פעם אחת במערך
            const j=state.arr_cart.findIndex(j=>j._id==action.payload._id)
            //יחיד במערך
            if(state.arr_cart[j].count==1)
            {
             state.arr_cart.splice(j, 1);

            }
            else
            //נוריד בכמות
                state.arr_cart[j].count--;


        }
    }
})
export default dataReducerCart.reducer
export const {add}=dataReducerCart.actions
export const {less}=dataReducerCart.actions
