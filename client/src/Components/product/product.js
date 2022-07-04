import React from 'react'
import "./product.css"
import Photo from './img.jpg'
function Product() {
  return (
    <div className='product'>
      <img src={Photo} alt="productImage" />
      <p>Product Name</p>
      <p>
        <span>Avg unit Price : 10</span>
      </p>
      <p>Count : <input type="number" /></p>
      <button className='AddToCartButton'>Add</button>
    </div>
  )
}
export default Product