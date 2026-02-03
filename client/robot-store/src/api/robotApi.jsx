import axios from "axios";

/**
 * פונקציה לקביעת כתובת הבסיס של השרת.
 * בודקת האם האפליקציה רצה על המחשב המקומי או על השרת המרוחק.
 */
const getBaseUrl = () => {
    // בדיקה אם הדפדפן נמצא ב-localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return "http://localhost:8080";
    }
    // הכתובת של ה-Backend ב-Render כפי שסיפקת
    return "https://robot-store-backend.onrender.com";
};

const url = getBaseUrl();

/**
 * קבלת כל הרובוטים
 */
export const getAll = async () => {
    try {
        // שים לב: אם השרת מחזיר שגיאה 404, ייתכן שצריך להוריד את /api/robotApi
        // ולהישאר רק עם ${url}/getAllRobots
        const { data } = await axios.get(`${url}/api/robotApi/getAllRobots`);
        return data;
    } catch (e) {
        console.error("Error fetching all robots:", e);
        throw e;
    }
};

/**
 * קבלת רובוט לפי מזהה (ID)
 */
export const getById = async (id) => {
    try {
        const { data } = await axios.get(`${url}/api/robotApi/getRobotById/${id}`);
        return data;
    } catch (e) {
        console.error("Error fetching robot by ID:", e);
        throw e;
    }
};

/**
 * הוספת רובוט חדש
 */
export const addRobot = async (robot) => {
    try {
        const { data } = await axios.post(`${url}/api/robotApi/postRobot`, robot);
        return data;
    } catch (e) {
        console.error("Error adding robot:", e);
        throw e;
    }
};

/**
 * יצירת נתיב מלא לתמונה שנמצאת בשרת
 */
export const getImageUrl = (img) => {
    if (!img) return "";
    return `${url}/${img}`;
};