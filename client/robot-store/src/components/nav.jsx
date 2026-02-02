import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userReducer'; // הפעולה שמאפסת את המשתמש
import './nav.css';

function Nav() {

    const currentUser = useSelector((state) => state.user.currentUser)
    const dispatch = useDispatch();
    return (
        <nav className="navbar-container">
    <div className="nav-content-wrapper">
        
        {/* צד ימין - התחברות / שלום מריים */}
        <div className="user-section">
            {currentUser?.customerName === "guest" ? (
                <div className="auth-links">
                    <Link to='signUp' className="auth-link signup-btn">הרשמה</Link>
                    <Link to='logIn' className="auth-link login-btn">התחברות</Link>
                </div>
            ) : (
                <div className="user-logged">
                    <button className="logout-btn" onClick={() => dispatch(logout())}>יציאה</button>
                    <span className="user-greeting">שלום <strong>{currentUser.customerName}</strong></span>
                </div>
            )}
        </div>

        {/* מרכז הדף - קישורי ניווט */}
        <div className="nav-links">
            {/* הסל משמאל בתוך הקבוצה */}
            <Link to={'cart'} className="nav-link">סל</Link>
            <Link to={'shop'} className="nav-link">מוצרים</Link>
            <Link to={'category'} className="nav-link">קטגוריות</Link>
            <Link to={'buy'} className="nav-link">איזור אישי</Link>
            <Link to={'addRobot'} className="nav-link">הוסף רובוט</Link>
        </div>

        {/* צד שמאל - ריק כדי לאזן את הפלקס או לשים לוגו עתידי */}
        <div className="nav-left-spacer"></div>
    </div>
</nav>
    );
};

export default Nav;