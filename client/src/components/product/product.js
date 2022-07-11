import React from 'react'
import { observer, inject } from 'mobx-react'

import "./product.css"

const Product = inject("products")(observer((props) => {

  let products = props.products.products
  let cart = props.products.cart
  let productName = props.productName

  return (
    <div className='product'>

      <img className='productImage' src={products[productName].image} alt="productImage" />

      <div className='productName'>{productName}</div>

      <div className='productAveragePriceContainer'>
        <div className='productAveragePriceTitle'>Average price: </div>
        <div className='productAveragePriceValue'>   {Math.round(products[productName].averagePrice * 100) / 100} ₪</div>
      </div>

       <input
        className='productQuantityValue' name={productName} type="number"
        value={products[productName].quantity} onChange={props.products.updateProductQuantity}
      />
 
 
      <button
        className='productAddRemoveButton' name={productName}
        onClick={props.products.updateCartItem} >{cart[productName] ? "Remove" : "Add"}
      </button>

    </div >
  )

}))
export default Product