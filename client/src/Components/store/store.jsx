import React from 'react'
import './store.css'
import { Rating } from 'react-simple-star-rating'

function store() {
  return (
    <div className='storeCard'>
        <div>
            <h3>Store Name</h3>
            <h3>Store City</h3>
            <h3>total : 10</h3>
            <button className='detalisButton'>Detalis</button>
        </div>
        <div>
            <img src='https://static.wikia.nocookie.net/phobia/images/8/82/Milk2.jpg/revision/latest/scale-to-width-down/360?cb=20170124115645' alt="imageMilk" />
            <div className='starsDiv'>
               <Rating />
            </div>
        </div>
    </div>
  )
}

export default store