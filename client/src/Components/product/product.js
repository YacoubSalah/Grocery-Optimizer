import React from 'react'
import "./product.css"
import Photo from './img.jpg'
function Product() {
  return (
    <div className='product'>
      <div className='gridForCards'>
        <div className='imageDivandText'>
          <label>name product</label>
          <br/>
          <img src={Photo} alt='img' className='imageproduct'/>
        </div>
        <div className='inputsDiv'>
          <p>unit price: 7</p>
          <p>total price: 7</p>
          <label>Unit Count</label>
          <input className='unitCountNumber' type="number" />
        </div>
      </div>
      <button className='addToCardButton'>Add To card</button>
    </div>
  )
}
export default Product