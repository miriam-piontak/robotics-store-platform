import { Routes, Route } from 'react-router-dom';
import Shop from './shop';
import Cart from './cart';
import MoreDetails from './moreDetails';
import Login from './logIn';
import SignUp from './signUp';
import AddRobot from './addRobot';
import Category from './category';
import Buy from './buy';
import Open from './open';

// חובה להגדיר פונקציה שעוטפת את ה-return
export const Routing = () => {
    return (
        <Routes>
            {/* 1. דף הבית - יציג את החנות כשנכנסים לאתר */}
            <Route path="/" element={<Open />} />            <Route path="shop" element={<Shop />} />
            <Route path="logIn" element={<Login />} />
            <Route path="cart" element={<Cart />} />
            <Route path="moreDetails/:id" element={<MoreDetails />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="addRobot" element={<AddRobot />} />
            <Route path="buy" element={<Buy />} />
            <Route path="category" element={<Category />} />
            <Route path="open" element={<Open />} />        </Routes>
    );
};