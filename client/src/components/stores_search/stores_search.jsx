import React from 'react'
import SearchBar from '../store_search_bar/stores_search_bar'
import Stores from '../stores/stores'
import './stores_search.css'
import { useEffect } from 'react'
import { observer, inject } from 'mobx-react'

const StoresSearch = inject("carts" , "products")(observer((props) => {

  useEffect(() => {

    props.carts.getStoresByProducts(props.products.cart)
    
  });

  return (
    <div className='containerStores'>
        <SearchBar/>
        <Stores />
    </div>
  )
}))

export default StoresSearch