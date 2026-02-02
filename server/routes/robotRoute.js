import express from "express";
import multer from "multer";
import path from "path"; // ספרייה לטיפול בסיומות קבצים
import Robot from "../models/robot.js";

const router = express.Router();

// הגדרת אחסון (Storage) - כדי שהקובץ יישמר עם סיומת (כמו .jpg)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image/'); // השם המדויק של התיקייה שלך
    },
    filename: function (req, file, cb) {
        // יוצר שם ייחודי: זמן נוכחי + מספר אקראי + הסיומת המקורית
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// חיפוש כל הרובוטים
router.get("/getAllRobots", (req, res) => {
    Robot.find()
    .then(arr => res.status(200).send(arr))
    .catch(e => res.status(400).send(e.message));
});

// הוספת רובוט חדש
router.post("/postRobot", upload.single('img'), async (req, res) => {
    try {
        // בניית האובייקט לשמירה במסד הנתונים
        const robotData = {
            ...req.body,
            // אם הועלה קובץ, נשמור את השם החדש שלו. אם לא - ריק.
            img: req.file ? req.file.filename : "" 
        };

        const r = new Robot(robotData);
        const savedRobot = await r.save();
        
        res.status(200).send(savedRobot);
    } catch (e) {
        console.error("שגיאה בהוספת רובוט:", e.message);
        res.status(400).send(e.message);
    }
});

export default router;