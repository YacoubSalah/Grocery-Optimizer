import React from 'react'
import "./product.css"

function Product(props) {

  return (
    <div className='product'>
      <img src={props.product[0].image} alt="productImage" />
      <p>{props.product[0].name}</p>
      <p>
        <span>Avg unit Price : {props.product[0].avergePrice}</span>
      </p>
      <p>Count : <input type="number" /></p>
      <button className='AddToCartButton'>Add</button>
    </div>
  )
}
export default Product