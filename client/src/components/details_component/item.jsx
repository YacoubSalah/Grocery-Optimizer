import React, { Fragment } from 'react'
import { Rating } from 'react-simple-star-rating'
import { observer, inject } from 'mobx-react'
import {Button } from '@mui/material';


const item = inject("carts" , "products")(observer((props) => {
    
  return (
    <Fragment>
        <span>{props.itemName}</span>
        <span className='ratingInDetails'><Rating size={20} initialValue={props.item.score} readonly={true}/></span>
        <span>{props.item.initialPrice === null ? "Not in store" : props.item.initialPrice}</span>
        <span>{props.products.cart[props.itemName]}</span> 
        <span>{props.item.initialPrice === null ?  "Not in store" :  
        Math.round(props.item.totalPrice * 100 ) / 100}</span>
        <span><Button onClick={() => props.handelClickOpenSnackbar(props.itemName , props.id)} >0</Button></span>
    </Fragment>
  )

}))

export default item