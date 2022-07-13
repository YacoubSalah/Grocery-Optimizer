import React from 'react'

import { observer, inject } from 'mobx-react'

import "./cartItem.css"

const Cart = inject("products")(observer((props) => {

  let productName = props.cartItem
  let productQuantity = props.products.cart[productName]
  let productUnitPrice = props.products.products[productName] ? props.products.products[productName].averagePrice : null

  return (
    <div className='cartItem'>
      <div className='cartProductName' onClick={props.products.deleteCartItem}>{productName}</div>
      <input className='cartProductQuantity' name={productName} value={productQuantity} onChange={props.products.bindCartItemQuantity} type="number" min="0" />
      <div className='cartProductTotalPrice'>{Math.round(productUnitPrice * productQuantity * 10) / 10} ₪</div>
    </div>
  )
}))

export default Cart