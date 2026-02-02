import express from "express";
import Customer from "../models/customer.js"; // ייבוא המודל

const router = express.Router();

//חיפוש כל הלקוחות
router.get("/getAllCustomers", (req, res) => {
    Customer.find() 
    .then(arr => {
        res.status(200).send(arr);
    })
    .catch(e => res.status(400).send(e.message));
});

//חיפוש לקוח לפי קוד
router.get("/getCustomerById/:id",(req,res)=>{
    Customer.findById(req.params.id) 
    .then(arr=>{
        res.status(200).send(arr)
    })
    .catch(e=> res.status(400).send(e.message))
})

//חיפוש לקוח לפי שם משתמש וסיסמה
router.post("/getCustomerByNameAndPin", (req, res) => {
    // שליפת הנתונים מה-Body
    const { customerName, pin } = req.body;

    Customer.findOne({ customerName: customerName, pin: pin })
    .then(customer => {
        // בדיקה האם הלקוח בכלל קיים
        if (!customer) {
            return res.status(404).send("שם משתמש או סיסמה שגויים");
        }
        res.status(200).send(customer);
    })
    .catch(e => res.status(400).send(e.message));
});

//הוספת לקוח
router.post("/postCustomer",(req,res)=>{
    const c=new Customer(req.body)
    c.save()
    .then(arr=>{
        res.status(200).send(arr)
    })
    .catch(e=> res.status(400).send(e.message))
})

export default router;