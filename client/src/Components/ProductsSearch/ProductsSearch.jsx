import React from 'react'
import Product from '../product/product'
import './ProductsSearch.css'
function ProductsSearch() {
  return (
    <div>
      <h1>ProductsSearch</h1>
      <div className='products'>
        <Product />
        <Product />
        <Product />
        <Product />
      </div>

    </div>
  )
}

export default ProductsSearch