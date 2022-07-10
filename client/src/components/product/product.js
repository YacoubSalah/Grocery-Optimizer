import React from 'react'
import "./product.css"
import { observer, inject } from 'mobx-react'


const Product = inject("products")(observer((props) => {

  const handelAddToCart = () => {

    let avgPrice = props.product[0].avergePrice
  
    let productName = props.product[0].name

    props.products.handelAddToCart(avgPrice , productName)

  }

  return (
    <div className='product'>
      <img src={props.product[0].image} alt="productImage" />
      <p>{props.product[0].name}</p>
      <p>
        <span>Avg unit Price : {props.product[0].avergePrice}</span>
      </p>
      <p>Count : <input value={props.products.countForAddProducttoCart} name="countForAddProducttoCart" onChange={props.products.handelOnChangeEvent} type="number" /></p>
      <button className='AddToCartButton'  onClick={handelAddToCart} >Add</button>
    </div>
  )
}))
export default Product