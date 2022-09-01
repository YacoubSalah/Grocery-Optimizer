import React from 'react'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import './store.css'

const store = inject("carts", "products")(observer((props) => {

  const id = props.store.id

  return (
    <div className='storeCard'>

      <label className='incompletelabel'>{props.store.isComplete ? null : "*InComplete"}</label>

      <div className='storeImageContainer'>
        <img className='storeImage' src={props.store.image} alt="defult" />
      </div>

      <div className='ratingSpan'><Rating ratingValue={props.store.score * 20} readonly={true} /></div>

      <div className='storeData'>
        <span className='storeName'>{props.store.name} store</span>
        <span className='storeLocation'> {props.store.location}</span>
      </div>

      <div className='storePriceValue'> {props.store.totalPrice} ₪</div>

      <div className='buttonContainer'>
        <Link to="/details" state={id}>
          <button className="DetailsButton">Details</button>
        </Link>
      </div>

    </div>
  )
}))

export default store