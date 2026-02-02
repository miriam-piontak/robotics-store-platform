import React from 'react';
import { useNavigate } from 'react-router-dom';
import './open.css';

const Open = () => {
    const navigate = useNavigate();

    return (
        
        <div className="open-page-container">
            <div className="open-hero-content">
                <br /><br />
                <h1 className="open-title">
                    Lazy<span className="accent-color">Tech</span> 2026
                </h1>
                <h2 className="tagline">העולם מתקדם, למה שאתה תישאר מאחור ותעבוד?</h2>
                
                <p className="open-subtitle">
                    בעידן שבו בינה מלאכותית מטיסה חלליות, אין שום סיבה הגיונית שתבזבז זמן על משימות משעממות. 
                    הרובוטים שלנו כאן כדי לעשות את העבודה השחורה, בזמן שאתה נהנה מהחיים.
                </p>
                
                <div className="open-button-group">
                    <button className="btn-add-cart" onClick={() => navigate('/shop')}>
                      לצפיה בכל הרובוטים
                    </button>
                    <button className="btn-details" style={{marginRight: '15px'}} onClick={() => navigate('/logIn')}>
                        כניסת לקוחות 
                    </button>
                </div>
            </div>

            <div className="open-cards-section-wrapper">
                <div className="open-cards-section">
                    <div className="mini-card">
                        <div className="icon-glow">🛡️</div>
                        <h3 className="card-h3">אחריות "זה לא אני"</h3>
                        <p className="card-p">
                            אנחנו מתחייבים: אם הרובוט עשה פדיחה, המערכת תדע להסיט את האש. 
                            מנגנון הכחשה מובנה בכל דגם של 2026.
                        </p>
                    </div>

                    <div className="mini-card">
                        <div className="icon-glow">🔋</div>
                        <h3 className="card-h3">סוללת "שנ"צ נצחי"</h3>
                        <p className="card-p">
                            הרובוטים שלנו עובדים 24/7 כדי שאתה תוכל לישון בשקט. 
                            יעילות אנרגטית מקסימלית למינימום מאמץ אנושי.
                        </p>
                    </div>

                    <div className="mini-card">
                        <div className="icon-glow">🤝</div>
                        <h3 className="card-h3">התחייבות לדיסקרטיות</h3>
                        <p className="card-p">
                            הרובוט שלך  שומר אמונים. הוא לעולם לא יספר לאף אחד שבעצם הוא זה שעשה את כל העבודה הקשה.
                        </p>
                    </div>
                </div>
            </div>

            <div className="miriam-signature">
                <p>היי, אני <strong>מרים</strong>, ואני כאן כדי לוודא שתעשו כמה שפחות ותיהנו כמה שיותר. צריכים עזרה בבחירת הרובוט שלכם? אני זמינה לכל שאלה!</p>
            </div>
        </div>
    );
};

export default Open;