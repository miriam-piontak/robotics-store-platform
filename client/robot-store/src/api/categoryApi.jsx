import axios from "axios"
const url = "https://robot-store-backend.onrender.com/api/categoryApi";

//חיפוש כל הקטגוריות
export const getAll = async() => {
    try {
        const {data}=await axios.get(`${url}/getAllCategories`)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}
//חיפוש קטגוריה לפי קוד
export const getById = async(id) => {
        try {
        const {data}=await axios.get(`${url}/getCategoryById/${id}`)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}
//מחיקת קטגוריה לפי קוד
export const deleteCategory = async(id) => {
        try {
            const {data} = await axios.delete(`${url}/deleteCategory/${id}`)
            return data;
        }
        catch(e) {
            console.log(e)
        }
}

//הוספת קטגוריה
export const addCategory = async(category) => {
    try {
        const {data}=await axios.post(`${url}/postCategory`,category)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}

//עדכון קטגוריה לפי קוד
export const updateCategory = async(id,category) => {
    try {
        const {data}=await axios.put(`${url}/updateCategory/${id}`,category)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}