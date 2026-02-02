import axios from "axios"
const url = "http://localhost:8080/api/customerApi";

//חיפוש כל הלקוחות
export const getAll = async() => {
    try {
        const {data}=await axios.get(`${url}/getAllCustomers`)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}

//חיפוש לקוח לפי קוד
export const getById = async(id) => {
        try {
        const {data}=await axios.get(`${url}/getCustomerById/${id}`)
        return data;
    }
    catch(e) {
        console.log(e)
    }

}
//הוספת לקוח
export const addCustomer = async(customer) => {
    try {
        const {data}=await axios.post(`${url}/postCustomer`,customer)
        return data;
    }
    catch(e) {
        console.log(e)
    }
}

//חיפוש לקוח לפי שם משתמש וסיסמה
export const getByNameAndPin = async(customerName, pin) => {
    try {
        const {data}=await axios.post(`${url}/getCustomerByNameAndPin`, { customerName, pin })
        return data;
    }
    catch(e) {
        console.log(e)
    }
}
