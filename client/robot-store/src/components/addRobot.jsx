import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { set_arr_robots } from '../redux/dataReducerRobot'; // פעולה לעדכון הסטור של הרובוטים
import { getAll as getAllRobots } from '../api/robotApi'; // ייבוא הפונקציה שמושכת את כל הרובוטים
import './addRobot.css';

const AddRobot = () => {
    const [robot, setRobot] = useState({
        robotName: "",
        price: 0,
        amountInStock: 0,
        category: 0,
        desc: "",
        img: ""
    });
    

    const [categories, setCategories] = useState([]);
    //מאפשר שליחת פעולות לסטור
    const dispatch = useDispatch();
    //ניווט בין דפים
    const navigate = useNavigate();

    //שליפת כל הקטגוריות מהשרת
    useEffect(() => {
        fetch("https://robot-store-backend.onrender.com/api/categoryApi/getAllCategories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("שגיאה בטעינת קטגוריות:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // עדכון השדה המתאים באובייקט הרובוט
        setRobot({...robot, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //שליחת נתוני הרובוט לשרת
            const response = await fetch("https://robot-store-backend.onrender.com/api/robotApi/postRobot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(robot)
            });
            if (response.ok) {
                //הרובוט נוסף בהצלחה
                alert("הרובוט נוסף בהצלחה!");
                //שליפת כל הרובוטים המעודכנת מהשרת
                const robots = await getAllRobots();
                //עדכון הסטור עם מערך הרובוטים המעודכן
                dispatch(set_arr_robots(robots));
                //ניווט חזרה לדף הראשי או לדף הרובוטים
                navigate("/");
            } else {
                alert("שגיאה בהוספת הרובוט.");
            }
        } catch (error) {
            console.error("שגיאה בהוספת הרובוט:", error);
        }
    };

    return (
        <div className="add-robot-page">
            <div className="add-robot-card">
                <h2>הוסף רובוט חדש</h2>
                <form onSubmit={handleSubmit} className="add-robot-form">
                    <div className="form-field">
                        <label>שם המועמד:</label>
                        <input type="text" name="robotName" value={robot.robotName} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                        <label>מחיר:</label>
                        <input type="number" name="price" value={robot.price} onChange={handleChange} required />
                    </div>  
                    <div className="form-field">
                        <label>כמות במחסן:</label>
                        <input type="number" name="amountInStock" value={robot.amountInStock} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                        <label>קטגוריה:</label>
                        <select name="category" value={robot.category} onChange={handleChange} required>
                            <option value="">בחר קטגוריה</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-field">
                        <label>מה יודע לעשות:</label>
                        <textarea name="desc" value={robot.desc} onChange={handleChange} required></textarea>
                    </div>
                    <div className="form-field">
                        <label>קישור לתמונה:</label>
                        <input type="text" name="img" value={robot.img} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="submit-robot-btn">קדימה לעבודה</button>
                </form>
            </div>
        </div>
    );
}

export default AddRobot;