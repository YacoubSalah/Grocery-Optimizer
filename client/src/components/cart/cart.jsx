import React from 'react'
import { observer, inject } from 'mobx-react'

const Cart = inject("products")(observer((props) => {


  return (
    <div className='cart'>
         <p>Item     Count    Price</p>
         {props.products.cartProducts.map(item => {

           return(
            <div>{item.productName}    {item.count}    {item.avgPrice}</div>
           )

         })}
    </div>
  )
}))

export default Cart