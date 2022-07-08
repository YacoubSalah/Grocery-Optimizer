import React from "react";
import { Link } from 'react-router-dom'
import './navgiation_bar.css'

function navigationBar(){
    return(
        <div className="Navbar">
            <Link  to="/"><h3>Home</h3></Link>
            <Link  to="/products"><h3>Products</h3></Link>
            <Link  to="/stores"><h3>Stores</h3></Link>
        </div>
    );
}

export default navigationBar