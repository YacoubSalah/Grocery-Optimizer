import React from 'react'
import Product from '../product/product'
import './ProductsSearch.css'
function ProductsSearch() {

  let arr = []
  for (let i = 0; i < 10; i++) {
    arr.push(< Product />)
  }
  return (
    <div className='container'>
      <div class="Search">search Component</div>
      <div class="LeftSide">Categories</div>
      <div class="RigthSide">Cart </div>
      <div class="Products">
          {arr.map(element => element)}
      </div>
    </div>
  )
}

export default ProductsSearch