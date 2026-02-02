import { useState } from "react"; // תופס את מה שהמשתמש מקליד
import { useDispatch } from "react-redux"; // שולח את הפונקציה לסטור
import { login } from "../redux/userReducer"; // הפעולה שיצרתי מקודם
import { useNavigate } from "react-router-dom"; // ניווט בין דפים
import './signUp.css';

function SignUp() {
    // 1. יצירת משתני יוזסטייט
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [creditDetails, setCreditDetails] = useState("");

    // הגדרת דיספאצ' וינויגיט
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // בדיקה לפני שליחה לפונקציה לוגאין
    const handleSubmit = async (e) => {
        // 4. מונע את ברירת המחדל של הטופס
        e.preventDefault();

        // נבנה אוביקט של משתנה חדש
        const newUser = {
            customerName: username,
            pin: password,
            creditDetails: creditDetails
        }

        // נשלח את האוביקט לסרבר
        try {
            const response = await fetch("http://localhost:8080/api/customerApi/postCustomer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            });
            if (response.ok) {
                const saveUser = await response.json();
                dispatch(login({ 
                    customerName: saveUser.customerName, 
                    password: saveUser.password, 
                    creditDetails: saveUser.creditDetails,
                    role: "user" 
                }));
                alert("נכנסת בהצלחה. עכשיו אפשר לחזור לנוח.");
                navigate('/shop');
            } else {
                alert("ההרשמה נכשלה. נסה שוב מאוחר יותר.");
            }
        } catch (err) {
            console.error("SignUp failed:", err);
            alert("שגיאת מערכת. נסה שוב מאוחר יותר.");
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <h1 className="auth-title">הצטרפות לצי העצלנים</h1>
                <p className="auth-subtitle">מלא את הפרטים, הרובוט כבר יעשה את השאר.</p>
                
                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="איך הרובוט יקרא לך?"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="קוד סודי"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="מספר כרטיס (כדי שנוכל להתעשר)"
                        value={creditDetails}
                        onChange={(e) => setCreditDetails(e.target.value)}
                        required
                    />

                    <button className="auth-submit-btn" type="submit">
                        התחברות
                    </button>
                </form>

                <p className="auth-footer">
                    כבר חבר בנבחרת? <span onClick={() => navigate('/logIn')} className="auth-link">לחץ כאן להתחברות</span>
                </p>
            </div>
        </div>
    );
}

export default SignUp;