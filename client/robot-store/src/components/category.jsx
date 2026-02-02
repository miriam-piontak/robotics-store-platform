//useState- מאפשר לשמור נתונים מקומיים שמשתנים תוך כדי עבודה
//useEffect- השומר של הקומפוננטה. מאפשר לנו לעמוד על נקודות זמן מסוימות
import React, { useEffect, useState } from 'react';
//useSelector- שולף נתונים מהמחסן הגולבלי (סטור)
//useDispatch- מעדכן את המחסן הגלובלי (סטור)
import { useSelector, useDispatch } from 'react-redux';
//ייבוא פעולות מהרידקס פעולות אלו הם אנשי קשר של השרת
import { getAll, deleteCategory, addCategory, updateCategory } from '../api/categoryApi';
//ייבוא הפעולה שמעדכנת את הסטור של הקטגוריות
import { setCategories } from '../redux/categoryReducer';
//ייבוא קובץ עיצוב
import './category.css';

//תמיד נתחיל בפונקציה הראשית של הקומפוננטה
const Category = () => {

    //שליפת הקטגוריות מהסטור הגלובלי
    const dispatch = useDispatch();
    //שליפת הקטגוריות מהסטור הגלובלי
    const categories = useSelector((state) => state.category.categories);

    //מצב מקומי לשמירת הקטגוריה החדשה להוספה
    const [newCategory, setNewCategory] = useState("");
    //מצב מקומי לשמירת הקטגוריה לעדכון
    const [editingId, setEditingId] = useState(null); // מכיל ID אם אנחנו במצב עריכה

    useEffect(() => {
        if (categories.length === 0) {
            refreshCategories();
        }
    }, []);

    //פונקציה לרענון הקטגוריות מהשרת
    const refreshCategories = async () => {
        const data = await getAll();
        if (data) {
            //עדכון הסטור עם הקטגוריות מהשרת
            dispatch(setCategories(data));
        };
    };

    //הוספה או עדכון קטגוריה
    const handleSave = async () => {
        //newCategory.trim()- מסיר רווחים מיותרים מההתחלה ומהסוף
        if (!newCategory.trim()) return; // לא להוסיף אם השם ריק

        if (editingId) {
            // עדכון קטגוריה קיימת
            await updateCategory(editingId, { categoryName: newCategory });
            setEditingId(null); // יציאה ממצב עריכה
        } else {
            // הוספת קטגוריה חדשה
            await addCategory({ categoryName: newCategory });
        }
        setNewCategory(""); // איפוס השדה
        refreshCategories(); // רענון הקטגוריות
    };

    //פונקציה למחיקת קטגוריה        
    const handleDelete = async (category) => {
        if (window.confirm(`אתה בטוח שאתה רוצה למחוק את ${category.categoryName}?`)) {
            await deleteCategory(category._id);
            refreshCategories(); // רענון הקטגוריות
        }
    };

    //כניסה למצב עריכה
    const startEditing = (category) => {
        setEditingId(category._id);
        setNewCategory(category.categoryName);
    };

    return (
        <div className="shop-page-container">
            <div className="category-wrapper">
                <h1 className="shop-title">מרכז בקרת נתונים</h1>
                
                <div className="category-control-panel">
                    <div className="input-group-cyber">
                        <input
                            className="category-input-cyber"
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="הקלד שם קטגוריה..."
                        />
                        <button className="btn-cyber-add" onClick={handleSave}>
                            <span className="btn-text">{editingId ? "עדכן קטגוריה" : "הוסף קטגוריה"}</span>
                            <span className="btn-glow"></span>
                        </button>
                    </div>
                </div>

                <div className="categories-list-modern">
                    {categories.map((category) => (
                        <div key={category._id} className="category-item-modern">
                            <div className="category-status-indicator"></div>
                            <span className="category-label">{category.categoryName}</span>
                            <div className="category-controls">
                                <button className="control-btn edit-btn" onClick={() => startEditing(category)}>ערוך</button>
                                <button className="control-btn delete-btn" onClick={() => handleDelete(category)}>מחק</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;