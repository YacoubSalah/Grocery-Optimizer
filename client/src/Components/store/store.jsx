import React from 'react'
import './store.css'
import { AiFillStar } from 'react-icons/ai';

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
                            <AiFillStar className="star" />
                            <AiFillStar className="star" />
                            <AiFillStar className="star" />
                            <AiFillStar className="star" />
                            <AiFillStar className="star" />
            </div>
        </div>
    </div>
  )
}

export default store