import { createSlice } from "@reduxjs/toolkit";

const categoryReducer = createSlice({
    name: "category",
    initialState :{
        //בתחילה יהיה מערך ריק של קטגוריות
        categories: []
    },
    reducers: {
        //פעולה לעדכון מערך הקטגוריות
        setCategories: (state, action) => {
            state.categories = action.payload;
        }
    }
});
export const { setCategories } = categoryReducer.actions;
export default categoryReducer.reducer;