import { configureStore } from "@reduxjs/toolkit";
import dataReducerRobot from "./dataReducerRobot"
import userReducer from './userReducer';
import categoryReducer from "./categoryReducer"
import dataReducerCart from "./dataReducerCart"
export const store = configureStore({
    reducer: {
        category: categoryReducer,
        user: userReducer, 
        robot: dataReducerRobot,
        cart: dataReducerCart
    }
})

