import React, { Fragment } from 'react'
import { Rating } from 'react-simple-star-rating'
import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'

const item = inject("carts")(observer((props) => {

  useEffect(()=>{

      props.carts.getFeedBack(props.itemName , props.item.id)

   },[props])
    
  return (
    <Fragment>
        <span>{props.itemName}</span>
        <span className='ratingInDetails'><Rating size={20} initialValue={props.item.score} readonly={true}/></span>
        <span>{props.item.initialPrice}</span>
        <span>{props.item.quentity}</span> 
        <span>{Math.round((props.item.initialPrice * props.item.quentity) * 100 ) / 100}</span>
        <span><button>{props.carts.feedBack}</button></span>
    </Fragment>
  )

}))

export default item