import React from 'react'
import { observer, inject } from 'mobx-react'

import "./product.css"

const Product = inject("products")(observer((props) => {

  let products = props.products.products
  let cart = props.products.cart
  let productName = props.productName

  return (
    <div className='product'>

      <img src={products[productName].image} alt="productImage" />

      <p>{productName}</p>

      <p>
        <span>Avg unit Price : {products[productName].averagePrice}</span>
      </p>

      <p>Quantity : <input value={products[productName].quantity} name={productName} onChange={props.products.updateProductQuantity} type="number" /></p>

      <button name={productName} className='AddToCartButton' onClick={props.products.updateCartItem} >{cart[productName]   ? "Remove" : "Add"}</button>

    </div>
  )

}))
export default Product