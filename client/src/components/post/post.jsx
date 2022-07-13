import React from 'react'
import './post.css'
import { Rating } from 'react-simple-star-rating'

function post(props) {
  return (
    <div className='feedbackpost'>
        <div className='postIMage' >
            <img  src={props.post.imageURL} alt="item" />
            <h3>{props.itemName}</h3>
        </div>
        <div className='postStoreData'>
            <h2>Store</h2>
            <h3>Name : {props.storeName}</h3>
            <h3>City : {props.storeLocation}</h3>
        </div>
        <div className='postitemData'>
             <h3>Price : {props.post.price}</h3>
             <h3>Score : <Rating size={20} initialValue={props.post.score} readonly={true}/></h3>
             <h3>note : {props.post.note}</h3>
        </div>
    </div>
  )
}

export default post