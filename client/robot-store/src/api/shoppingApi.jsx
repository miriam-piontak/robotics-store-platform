import axios from "axios"
const url = "http://localhost:8080/api/shoppingApi";

//חיפוש כל הקניות
export const getAll = async() => {
    try {
        const {data}=await axios.get(`${url}/getAllShopping`)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}

//חיפוש קניה לפי קוד
export const getById = async(id) => {
        try {
        const {data}=await axios.get(`${url}/getShoppingById/${id}`)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}

//הוספת קניה
export const addShopping = async(shopping) => {
    try {
        const {data}=await axios.post(`${url}/postShopping`,shopping)
        return data;
    }
    catch(e) {
        console.log(e)
    } 
}
//חיפוש קניות לפי קוד לקוח
export const getByCustomerId = async(customerId) => {
    try {
        const {data}=await axios.get(`${url}/getShoppingByCustomerId/${customerId}`)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}
