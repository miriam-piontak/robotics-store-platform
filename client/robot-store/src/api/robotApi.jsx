import axios from "axios"
const url = "http://localhost:8080/api/robotApi";

//חיפוש כל הרובוטים
export const getAll = async() => {
    try {
        const {data}=await axios.get(`${url}/getAllRobots`)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}

//חיפוש רובוט לפי קוד
export const getById = async(id) => {
        try {
        const {data}=await axios.get(`${url}/getRobotById/${id}`)
        return data;
    }
    catch(e) {
        console.log(e)
    }

}

//הוספת רובוט
export const addRobot = async(robot) => {
    try {
        const {data}=await axios.post(`${url}/postRobot`,robot)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}
export const getImageUrl = (img) => `http://localhost:8080/${img}`;