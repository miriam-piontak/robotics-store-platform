import express from "express";
import Category from "../models/category.js"; // ייבוא המודל

const router = express.Router();

//חיפוש כל הקטגוריות
router.get("/getAllCategories", (req, res) => {
    Category.find() 
    .then(arr => {
        res.status(200).send(arr);
    })
    .catch(e => res.status(400).send(e.message));
});
//חיפוש קטגוריה לפי קוד
router.get("/getCategoryById/:id",(req,res)=>{
    Category.findById(req.params.id)
    .then(arr=>{
        res.status(200).send(arr)
    })
    .catch(e=> res.status(400).send(e.message))
})

//הוספת קטגוריה
router.post("/postCategory",(req,res)=>{
    const c=new Category(req.body)
    c.save()
    .then(arr=>{
        res.status(200).send(arr)
    })
    .catch(e=> res.status(400).send(e.message))
})

//מחיקת קטגוריה לפי קוד
router.delete("/deleteCategory/:id",(req,res)=>{
    Category.findByIdAndDelete(req.params.id)
    .then(arr=>{
        res.status(200).send(arr)
    })
    .catch(e=> res.status(400).send(e.message))
})

//עדכון קטגוריה לפי קוד
router.put("/updateCategory/:id",(req,res)=>{
    Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(arr=>{
        res.status(200).send(arr)
    })
    .catch(e=> res.status(400).send(e.message))
})

export default router;