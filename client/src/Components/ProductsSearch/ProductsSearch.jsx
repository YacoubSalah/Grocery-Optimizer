import React from 'react'
import Product from '../product/product'
import Categories from '../categories/categories'
import Cart from '../Cart/Cart'
import './ProductsSearch.css'
import { observer, inject } from 'mobx-react'
import { useEffect } from 'react'


const ProductsSearch = inject("products")(observer((props) => {


  useEffect(() => {
    
      props.products.initializeProductsList()

  },[props.products])

  return (
    <div className='containerProductsPage'>
      <div className='categoryDiv'>
         <Categories />
      </div>
      <div className='bodyDiv'>
        <div className='searchDiv'>
           <input className='searchInput' placeholder='Enter name to search' />
           <button className='searchButton'>Serach</button>
        </div>
        <div className='products'>
               {props.products.ProductsList.map(product => {
                return (
                  <Product key={product[0].name} product={product} />
                )
               })}
        </div>
      </div>
      <div className='cartDiv'>
        <Cart />
        <div className='card'>
           cabaabsabsabsbabsb
        </div>
      </div>
    </div>
  )
}))

export default ProductsSearch