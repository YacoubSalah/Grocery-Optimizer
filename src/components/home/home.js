import React from 'react'
import { Link } from 'react-router-dom'

import background from "../../images/cart.jpg"

import './home.css'

function Home() {

    return (
        <>
            <img className='background' src={background} alt='background'></img>
            <div className='homeContainer'>
                <div className='title'>Grocery Optimizer</div>
                <div className='description'>Grocery Optimizer is your best assitance when it comes to chosing grocery stores.
                    <br></br><br></br>A customer can explore a wide range of grocery products and see their average market price, create a cart
                    and check its prices from different stores, and most importantly add and view feedback of stores products.
                    <br></br><br></br>In Grocery Optimizer our data comes and goes to our customers, to ensure non-biasing and accurate feedback.
                    <br></br><br></br>Lets start:
                </div>
                <div className='buttons'>
                    <Link to="/products">
                        <button className="homeButton">Explore products</button>
                    </Link>
                    <Link to="/feedback">
                        <button className="homeButton">Add feedback</button>
                    </Link>
                </div>
            </div >
        </>
    )
}

export default Home