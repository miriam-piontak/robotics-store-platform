import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// ייבוא כל קבצי הראוטרים
import category from './routes/categoryRoute.js';
import customer from './routes/customerRoute.js';
import robot from './routes/robotRoute.js';
import shopping from './routes/shoppingRoute.js';

const app = express(); // קודם יוצרים את ה-app

// הגדרות בסיסיות (Middlewares)
app.use(cors());
app.use(express.json());

/**
 * הגדרת תיקיית התמונות כציבורית
 * חשוב: השורה הזו חייבת לבוא אחרי ה-const app
 */
app.use('/image', express.static('image'));

// שימוש בראוטרים
app.use("/api/categoryApi", category);
app.use("/api/customerApi", customer);
app.use("/api/robotApi", robot);
app.use("/api/shoppingApi", shopping);

// חיבור למונגו
mongoose.connect('mongodb://localhost:27017/shop')
    .then(s => { console.log('Connected to MongoDB!!!') })
    .catch(e => console.log(e.message));

app.get("/test", (req, res) => {
    res.send("השרת עובד!");
});

// פונקציית האזנה
app.listen(8080, () => {
    console.log('Server is running on port 8080!!!!!!');
});