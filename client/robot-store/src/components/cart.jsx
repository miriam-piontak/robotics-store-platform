import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add, less } from "../redux/dataReducerCart";
import './cart.css';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // נשלוף את הנתונים מהסטור
    const arr = useSelector(s => s.cart.arr_cart);
    const sum = useSelector(s => s.cart.total_amount);
    const currentUser = useSelector((state) => state.user.currentUser);

    // פונקציה לשמירת ההזמנה
    const handleFinishOrder = async () => {
        if (!currentUser || currentUser.customerName === "guest") {
            alert("עליך להתחבר למערכת על מנת להשלים את ההזמנה");
            navigate('/logIn');
            return;
        }

        const orderObj = {
            customerCode: currentUser.pin || currentUser.password,
            robots: arr,
            sum: sum
        };

        if (arr.length === 0) {
            alert("הסל ריק");
            return;
        }

        try {
            const response = await fetch("https://robot-store-backend.onrender.com/api/shoppingApi/postShopping", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderObj)
            });

            if (response.ok) {
                alert("ההזמנה נשמרה בהצלחה");
                navigate('/shop');
            } else {
                alert("שגיאה בשמירת ההזמנה");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("שגיאת תקשורת עם השרת");
        }
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">סל הקניות שלי ({arr.length} מוצרים)</h1>

            <div className="cart-content">
                {/* רשימת המוצרים - צד ימין */}
                <div className="cart-items-list">
                    {arr.map(a => (
                        <div className="cart-item-row" key={a._id}>
                            <div className="item-image">
                                <img src={"https://robot-store-backend.onrender.com/" + a.img} alt={a.robotName} />
                            </div>

                            <div className="item-info">
                                <div className="item-details-text">
                                    <h2 className="item-name">{a.robotName}</h2>
                                    <div className="item-status">במלאי - משלוח מהיר</div>
                                </div>

                                <div className="quantity-actions-area">
                                    <div className="quantity-selector">
                                        <button className="qty-btn" onClick={() => dispatch(add(a))}>+</button>
                                        <span className="qty-number">{a.count}</span>
                                        <button className="qty-btn" onClick={() => dispatch(less(a))}>-</button>
                                    </div>
                                    <div className="unit-price-label">מחיר ליחידה: {a.price} ₪</div>
                                </div>

                                <div className="item-price-total">{a.price * a.count} ₪</div>
                                
                                <button className="remove-item-btn" onClick={() => console.log("Remove", a._id)}>הסר</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* סיכום הזמנה - צד שמאל */}
                <div className="cart-summary">
                    <h2 className="summary-title">סיכום הזמנה</h2>
                    <div className="summary-row">
                        <span>משלוח: </span>
                        <span>חינם</span>
                    </div>
                    <div className="summary-row total">
                        <span>סה"כ לתשלום: </span>
                        <span className="total-amount">{sum} ₪</span>
                    </div>
                    <button className="checkout-btn" onClick={handleFinishOrder}>המשך לתשלום מאובטח</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;