import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import Product from '../product/product'
import Categories from '../categories/categories'
import CartItem from '../cart/cartItem'

import './products_search.css'

const ProductsSearch = inject("products")(observer((props) => {

  useEffect(() => {

    props.products.search()
    props.products.getCategories()

  }, [props.products])

  return (
    <div className='containerProductsPage'>

      <div className='categoryDiv'>
        <Categories key={Math.random()}/>
      </div>

      <div className='bodyDiv'>

        <div className='searchDiv'>
          <input className='searchInput' name='searchWord' onChange={props.products.handelInputChange} placeholder='Enter name to search' />
          <button className='searchButton' onClick={props.products.search}>Serach</button>
        </div>

        <div className='products'>
          {props.products.productsNameList.map(productName => <Product key={productName} productName={productName} />)}
        </div>

      </div>

      <div className='cartDiv'>
      <h2>CART</h2>
        {Object.keys(props.products.cart).map(cartItem => <CartItem key={cartItem} cartItem={cartItem} />)}
      <p>Total average price :</p>  {props.products.cartAveragePrice}
      <Link  to="/stores"><h3>Calculate Cart</h3></Link>
      </div>

    </div>
  )
}))

export default ProductsSearch