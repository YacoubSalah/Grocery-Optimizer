import React, { Fragment } from 'react'
import { Rating } from 'react-simple-star-rating'
import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'
/* import { useSnackbar } from 'react-simple-snackbar' */

const item = inject("carts" , "products")(observer((props) => {

  /* const [openSnackbar, closeSnackbar] = useSnackbar()

  const snackbar = () => {
    openSnackbar('This is the content of the Snackbar.')
  } */

  useEffect(()=>{

      props.carts.getFeedBack(props.itemName , props.id)

   },[props])
    
  return (
    <Fragment>
        <span>{props.itemName}</span>
        <span className='ratingInDetails'><Rating size={20} initialValue={props.item.score} readonly={true}/></span>
        <span>{props.item.initialPrice === null ? "Not in store" : props.item.initialPrice}</span>
        <span>{props.products.cart[props.itemName]}</span> 
        <span>{props.item.initialPrice === null ?  "Not in store" :  
        Math.round(props.item.totalPrice * 100 ) / 100}</span>
        <span><button >{props.carts.feedBack}</button></span>
    </Fragment>
  )

}))

export default item