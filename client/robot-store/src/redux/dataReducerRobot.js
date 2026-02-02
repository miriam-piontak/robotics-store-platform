import { createSlice } from "@reduxjs/toolkit"

const initialState={
    arr_robots:[]
}

const dataReducerRobot=createSlice({
    name:"robot",
    initialState,
    reducers:{
        set_arr_robots:(state,action)=>{
            state.arr_robots=action.payload


    }
    }
})
export default dataReducerRobot.reducer
export const {set_arr_robots}=dataReducerRobot.actions