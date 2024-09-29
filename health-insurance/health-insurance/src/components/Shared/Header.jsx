// src/components/Shared/Header.js
import React from 'react';
import { Link , Route, Router} from 'react-router-dom';
import Register from '../Authentication/Register';
import Login from '../Authentication/Login';
import AdminDashboard from '../Admin/AdminDashboard';


function Header() {
    return (
     
        <header>
             <img src="src/assets/images/himslogo.png" alt="Logo"></img>
        <h1>Health Insurance Management System</h1>
        <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>            
                <Link to="/logout">Logout</Link>
            </nav>
</header>
    )};


export default Header;
