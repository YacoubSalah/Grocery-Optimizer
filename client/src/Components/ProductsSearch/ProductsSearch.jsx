import React from 'react'
import Product from '../product/product'
import Categories from '../categories/categories'
import Cart from '../cart/cart'
import './productsSearch.css'
function ProductsSearch() {
  return (
    <div className='containerProductsPage'>
      <div className='categoryDiv'>
         <Categories />
      </div>
      <div className='bodyDiv'>
        <div>
           <input className='searchInput' placeholder='Enter name to search' />
           <button className='searchButton'>Serach</button>
        </div>
        <div className='products'>
            <Product /> 
            <Product /> 
            <Product /> 
            <Product /> 
            <Product /> 
            <Product /> 
        </div>
      </div>
      <div className='cartDiv'>
        <Cart />
      </div>
    </div>
  )
}

export default ProductsSearch