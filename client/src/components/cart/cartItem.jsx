import React from 'react'

import { observer, inject } from 'mobx-react'

const Cart = inject("products")(observer((props) => {

  let name = props.cartItem
  let quantity = props.products.cart[name]
  let price = props.products.products[name] ? props.products.products[name].averagePrice : null

  return (
    <div className='cart'>
      <div>{name} {quantity} {Math.round(price*quantity*10)/10} </div>
    </div>
  )
}))

export default Cart