import React from "react";
import { Link } from 'react-router-dom'
import './navgiation_bar.css'

function navigationBar() {
    return (
        <div className="Navbar">
            <Link className='logoImage' to="/">
                <img src="https://i.ibb.co/JkxRMhr/GO-Logo.png" alt="logo"></img>
            </Link>
            <Link className="logoText" to="/">
                <div>GroceryOptimizer</div>
            </Link>
            <Link className='link' to="/">Home</Link>
            <Link className='link' to="/products">Products</Link>
            <Link className='link' to="/stores">Stores</Link>
        </div >
    );
}

export default navigationBar