import React from "react";
import { Link } from 'react-router-dom'
import './navgiation_bar.css'

function navigationBar() {
    return (
        <div className="Navbar">
            <a href="/" className='navBarLogo'><img src="https://i.ibb.co/JkxRMhr/GO-Logo.png"></img></a>
            <a href="/" className="name">GroceryOptimizer</a>
            <Link className='link' to="/">Home</Link>
            <Link className='link' to="/products">Products</Link>
            <Link className='link' to="/stores">Stores</Link>
        </div >
    );
}

export default navigationBar