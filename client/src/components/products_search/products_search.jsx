import React , { useEffect } from 'react'
import { observer, inject } from 'mobx-react'

import Product from '../product/product'
import Categories from '../categories/categories'
import Cart from '../cart/cart'

import './products_search.css'

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
           <input className='searchInput' name='search_Value' onChange={props.products.handelOnChangeEvent} placeholder='Enter name to search' />
           <button className='searchButton' onClick={props.products.handelSearchClickEvent}>Serach</button>
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
      </div>

    </div>
  )
}))

export default ProductsSearch