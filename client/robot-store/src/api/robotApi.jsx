import axios from "axios"

// כתובת השרת ב-Render
const url = "https://robot-store-backend.onrender.com";

//חיפוש כל הרובוטים
export const getAll = async() => {
    try {
        const {data} = await axios.get(`${url}/getAllRobots`)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}

//חיפוש רובוט לפי קוד
export const getById = async(id) => {
    try {
        const {data} = await axios.get(`${url}/getRobotById/${id}`)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}

//הוספת רובוט
export const addRobot = async(robot) => {
    try {
        const {data} = await axios.post(`${url}/postRobot`, robot)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}

// פונקציה לקבלת נתיב התמונה מהשרת
export const getImageUrl = (img) => `${url}/${img}`;