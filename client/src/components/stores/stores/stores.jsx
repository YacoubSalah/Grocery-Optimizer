import React from 'react'
import { useEffect } from 'react'
import { observer, inject } from 'mobx-react'

import SearchBar from '../search_bar/search_bar'
import StoresElem from '../stores_elem/stores-elem'

import './stores.css'

const StoresSearch = inject("carts" , "products")(observer((props) => {

  useEffect(() => {

    props.carts.getStoresByProducts(props.products.cart)

  },[props.carts, props.products.cart]);

  

  useEffect(() => {

    props.carts.calculateTotalPrices()

  } , [props.carts])

  return (
    <div className='containerStores'>
        <SearchBar/>
        <StoresElem />
    </div>
  )
}))

export default StoresSearch