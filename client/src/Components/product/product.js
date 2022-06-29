import React from 'react'
import "./product.css"
function Product() {
  return (
    <div className='product'>
        <h4>name product</h4>
        {/* <img src='./img.jpg' alt='img' width="100px" height="100px"/> */}
        <div className='left'>
        <p>unit price: 7</p>
        <p>total price: 7</p>
        </div>
        <input type="number"/><br/>
        <button>add to cart</button>
    </div>
  )
}
export default Product