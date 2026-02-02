import { useState } from "react"; // תופס את מה שהמשתמש מקליד
import { useDispatch, useSelector } from "react-redux"; // שולח את הפונקציה לסטור
import { login } from "../redux/userReducer"; // הפעולה שיצרתי מקודם
import { useNavigate } from "react-router-dom"; // ניווט בין דפים
import './logIn.css'; 

function Login() {
    // 1. יצירת משתני יוזסטייט
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const admin = useSelector(state => state.user.admin);

    // הגדרת דיספאצ' וינויגיט
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // בדיקה לפני שליחה לפונקציה לוגאין
    const handleSubmit = async (e) => {
        // 4. מונע את ברירת המחדל של הטופס
        e.preventDefault();

        // אם אתה מנהל
        if (username === admin.name && password === admin.password) {
            dispatch(login({ customerName: admin.name, pin: admin.password, role: "admin" }));
            alert("ברוך הבא מנהל המערכת");
            navigate('/shop');
        }
        // אם אתה משתמש רגיל
        else {
            // נבדוק אם המשתמש כבר קיים
            try {
                const response = await fetch("http://localhost:8080/api/customerApi/getCustomerByNameAndPin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        customerName: username, pin: password
                    })
                });
                if (response.ok) {
                    const user = await response.json();

                    dispatch(login({
                        customerName: user.customerName,
                        creditDetails: user.creditDetails,
                        pin: user.pin,
                        role: "user"
                    }));

                    alert("ברוך הבא " + user.customerName);
                    navigate('/shop');
                } else {
                    alert("אינך רשום במערכת");
                    navigate('/signUp');
                }
            } catch (err) {
                console.error("Login failed:", err);
                alert("אירעה שגיאה במהלך ההתחברות. נסה שוב מאוחר יותר.");
            }
        }
    };

return (
        <div className="auth-page-container">
            <div className="auth-card">
                <h1 className="auth-title">חזרה לנבחרת</h1>
                <p className="auth-subtitle">הזן פרטים, והרובוט יפתח לך את הדלת.</p>
                
                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="שם משתמש"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                    />
                    
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="סיסמה"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password" 
                    />
                    
                    <button className="auth-submit-btn" type="submit">התחברות</button>
                </form>
                
                <p className="auth-footer">
                    עדיין לא בצי העצלנים? <span onClick={() => navigate('/signUp')} className="auth-link">לחץ כאן להרשמה</span>
                </p>
            </div>
        </div>
    );
}

export default Login;