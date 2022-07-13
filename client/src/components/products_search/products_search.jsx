import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    <div className='productSearchContainer'>

      <div className='categoryMenu'>
        <Categories key={Math.random()} />
      </div>

      <div className='productsAndSearchBar'>

        <div className='searchMenu'>
          <input className='searchInput' name='searchWord' onChange={props.products.handelInputChange} placeholder='Enter name to search' />
          <button className='searchButton' onClick={props.products.search}>Serach</button>
        </div>

        <div className='products'>
          {props.products.productsNameList.map(productName => <Product className='product' key={productName} productName={productName} />)}
        </div>

      </div>

      <div className='cart'>

        <div className='cartTitle'>Cart</div>

        {Object.keys(props.products.cart).map(cartItem => <CartItem className="cartItem" key={cartItem} cartItem={cartItem} />)}

        <div className='totalPriceContainer'>
          <div className='totalPriceText'>Total average price :</div>
          <div className='totalPriceValue'>{props.products.cartAveragePrice} ₪</div>
        </div>

        <Link to={"/stores"}  >
          <button className='cartButton'>Process Cart</button>
        </Link>

      </div>

    </div >
  )
}))

export default ProductsSearch
