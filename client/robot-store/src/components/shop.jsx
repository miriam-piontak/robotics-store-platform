import { useEffect } from "react"
import { getAll, getImageUrl } from "../api/robotApi"
import { useDispatch, useSelector } from "react-redux"
import { set_arr_robots } from "../redux/dataReducerRobot";
import { add } from "../redux/dataReducerCart";
import { useNavigate } from "react-router-dom";
import './shop.css';

function Shop() {
    const dis = useDispatch();
    const navigate = useNavigate();

    //שולף מתוך מאגר מקומי
    //הצגת כל התלמידות
    const arr = useSelector(s => s.robot?.arr_robots || [])

    //בעת טעינת הקומפוננטה
    useEffect(() => {
        const ac = new AbortController();
        async function getData() {
            //רק אם המערך ריק
            if (arr.length == 0) {
                try {
                    //תבצע קריאת שרת
                    const arr_robots = await getAll({ signal: ac.signal })

                    //מעדכן את המערך המשותף לתשובה מהשרת
                    dis(set_arr_robots(arr_robots))
                } catch (err) {
                    if (err.name === 'AbortError') return;
                    console.error("getAll failed:", err);
                }
            }
        }
        getData()
        return () => ac.abort()
    }, [arr.length, dis])

    return (
        <div className="shop-page-container">
            {/* כותרת קצרה וקולעת */}
            <h1 className="shop-title">מישהו חייב לעבוד</h1>

            <div className="products-grid">
                {
                    arr.map(s =>
                        <div key={s._id} className="robot-card">

                            <div className="image-container">
                                <img src={getImageUrl(s.img)} alt={s.robotName} />
                            </div>

                            <div className="card-content">
                                <h2 className="robot-name">{s.robotName}</h2>
                                <h3 className="robot-price">{s.price} ₪</h3>
                                
                                <div className="stock-section">
                                    <div className="stock-container">
                                        {/* חישוב דינמי של רוחב הפס לפי הכמות במלאי */}
                                        <div className="stock-bar" style={{ width: `${Math.min(s.amountInStock * 5, 100)}%` }}></div>
                                    </div>
                                    <span className="stock-info">שורדים במחסן: {s.amountInStock}</span>
                                </div>

                                <div className="card-actions">
                                    <button className="btn-details" onClick={() => navigate(`/moreDetails/${s._id}`)}>
                                        מה הסיפור שלי?
                                    </button>
                                    <button className="btn-add-cart" onClick={() => {
                                        dis(add(s))
                                    }}>
                                         חיב אחד כזה!
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Shop;