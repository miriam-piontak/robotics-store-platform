import { createSlice } from "@reduxjs/toolkit"

//המצב התחלתי של המשתמש
const initialState = {
    currentUser: { customerName: "guest",role:"guest"},
    admin:{name:"מרים",password:"1234"}
};

//יצירת הreducer של המשתמש
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //עדכון המשתמש הנוכחי
        login: (state, action) => {
            //action.payload=מכיל את המידע שהגיע מהשרת
            //state.currentUser=עדכון המשתמש הנוכחי בסטייט
            state.currentUser = action.payload;
        },
        logout: (state) => {
            //איפוס המשתמש הנוכחי למשתמש אורח
            state.currentUser = { customerName: "guest" };
        }
    }
}
);

//מיצאים את הפעולות
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;


