import express from "express";
import Shopping from "../models/shopping.js"; // ייבוא המודל

const router = express.Router();

//חיפוש כל הקניות
router.get("/getAllShopping", (req, res) => {
    Shopping.find() 
    .then(arr => {
        res.status(200).send(arr);
    })
    .catch(e => res.status(400).send(e.message));
});

//חיפוש קניה לפי קוד
router.get("/getShoppingById/:id",(req,res)=>{
    Shopping.findById(req.params.id)
    .then(arr=>{
        res.status(200).send(arr)
    })
    .catch(e=> res.status(400).send(e.message))
})

//הוספת קניה
router.post("/postShopping",(req,res)=>{
    const s=new Shopping(req.body)
    s.save()
    .then(arr=>{
        res.status(200).send(arr)
    })
    .catch(e=> res.status(400).send(e.message))
})

//שליפת מוצרים לפי קוד לקוח
router.get("/getShoppingByCustomerId/:pin",(req,res)=>{
    Shopping.find({customerCode: req.params.pin })
    .then(orders => {    
        if (orders.length === 0) {
            return res.status(404).send("לא נמצאו קניות עבור קוד לקוח זה");
        }
        res.status(200).send(orders);
    })
    .catch(e => res.status(400).send("שגיאה: " + e.message));
});

export default router;