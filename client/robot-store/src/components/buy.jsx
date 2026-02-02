import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './buy.css';

function Buy() {
    //המערך שיציג את ההזמנות של הלקוח
    const [arr_orders, setArrOrders] = useState([]);
    //מצב טעינה
    const [loading, setLoading] = useState(true);
    //שליפת המשתמש הנוכחי מהסטור
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();

    //בעת טעינת הקומפוננטה
    useEffect(() => {
        //פונקציה לשליפת ההזמנות של הלקוח מהשרת
        const fetchOrders = async () => {
            // אם אין משתמש או שהמשתמש הוא אורח, לא נבצע שליפה
            if (!currentUser || currentUser.customerName === "guest") {
                setLoading(false);
                return;
            }

            try {
                //שליפת ההזמנות מהשרת לפי מזהה הלקוח
                const response = await fetch(`https://robot-store-backend.onrender.com/api/shoppingApi/getShoppingByCustomerId/${currentUser.pin}`);
                //המרת התגובה לפורמט JSON
                const data = await response.json();
                //עדכון המערך המקומי עם ההזמנות שנשלפו
                setArrOrders(data);
                //במקרה שיש בעיה
            } catch (error) {
                console.error("שגיאה בשליפה", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser && currentUser.pin) fetchOrders();
        else setLoading(false);
    }, [currentUser]);

    // בדיקה אם המשתמש מחובר - אם לא, נציג הודעה מתאימה
    if (!currentUser || currentUser.customerName === "guest") {
        return (
            <div className="orders-container">
                <div className="no-user-logged">
                    <h2>אופס! אינך מחובר למערכת</h2>
                    <p>כדי לצפות בהיסטוריית הקניות שלך, עליך להתחבר לחשבון.</p>
                    <button className="login-redirect-btn" onClick={() => navigate('/logIn')}>
                        התחבר עכשיו
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-container">
            <h1 className="title">היסטוריית הקניות שלי</h1>

            {loading ? (
                <p className="status-msg">טוען נתונים מהמערכת...</p>
            ) : arr_orders.length > 0 ? (
                <div className="orders-list">
                    {arr_orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <span className="order-id">קנייה מס' {order._id.slice(-6)}</span>
                            </div>

                            <div className="order-body">
                                {/* הורדנו את הכותרת "פירוט מוצרים" ואת ה-UL כדי לשמור על שורות נקיות */}
                                {order.robots && order.robots.map((robot, index) => (
                                    <div key={index} className="order-item-row">
                                        <div className="item-right-group">
                                            <div className="item-img-container">
                                                {robot.img && <img src={"https://robot-store-backend.onrender.com/" + robot.img} alt={robot.robotName} />}
                                            </div>
                                            <div className="item-text-content">
                                                <span className="item-name">{robot.robotName}</span>
                                                <span className="item-price-each">{robot.price} ₪ ליחידה</span>
                                            </div>
                                        </div>
                                        <div className="item-left-group">
                                            <span className="qty-text">כמות: {robot.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="total-price-container">
                                    <span className="total-label">סה"כ לתשלום:</span>
                                    {/* מוסיפים את סימן ה-₪ כאן ולא ב-CSS כדי למנוע כפילויות */}
                                    <span className="total-amount">{order.sum} ₪</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-data">
                    <p>לא נמצאו רכישות קודמות.</p>
                </div>
            )}
        </div>
    );
}

export default Buy;