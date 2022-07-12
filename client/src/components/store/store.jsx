import React from 'react'
import './store.css'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom'
import './store.css'

function store(props) {

  const id = props.store.id

  return (
    <div className='storeCard'>
      <div className='imagAndScoreDiv'>
        <img className='storeImage' src='https://bombyxplm.com/wp-content/uploads/2021/01/421-4213053_default-avatar-icon-hd-png-download.png' alt="defult" />
        <div><Rating className='ratingSpan' ratingValue={20} /></div>
      </div>
      <div className='DetailsDiv'>
         <h3>{props.store.name}</h3>
         <h3>{props.store.location}</h3>
         <h3>Total Price : {props.store.totalPrice}$</h3>
      </div>
      <Link  to="/details" state={id}><button className="btn">Details</button></Link>
    </div>
  )
}

export default store