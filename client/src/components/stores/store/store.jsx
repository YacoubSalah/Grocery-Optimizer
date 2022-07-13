import React from 'react'
import './store.css'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom'
import './store.css'
import { observer, inject } from 'mobx-react'


const store = inject("carts" , "products")(observer((props) => {

  const id = props.store.id

  return (
    <div className='storeCard'>
      <div className='imagAndScoreDiv'>
        <img className='storeImage' src='https://bombyxplm.com/wp-content/uploads/2021/01/421-4213053_default-avatar-icon-hd-png-download.png' alt="defult" />
        <div><Rating className='ratingSpan' ratingValue={20} readonly={true} /></div>
      </div>
      <div className='DetailsDiv'>
         <h3>{props.store.name}</h3>
         <h3>{props.store.location}</h3>
         <h3>Total Price : {props.carts.sumTotalPriceForStore(props.store.productCart)}$</h3>
      </div>
      <label className='incompletelabel'>{ props.store.isComplete ? null : "InComplete" }</label>
      <Link  to="/details" state={id}><button className="btn">Details</button></Link>
    </div>
  )
}))

export default store