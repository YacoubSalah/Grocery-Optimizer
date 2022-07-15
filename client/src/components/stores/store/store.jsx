import React from 'react'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import './store.css'

const store = inject("carts" , "products")(observer((props) => {

  const id = props.store.id

  return (
    <div className='storeCard'>
      <div className='imagAndScoreDiv'>
        <img className='storeImage' src={props.store.image} alt="defult" />
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