import React from 'react'
import { useEffect } from 'react'
import { observer, inject } from 'mobx-react'

import SearchBar from '../search_bar/search_bar'
import StoresElem from '../stores_elem/stores-elem'

import './stores.css'

const StoresSearch = inject("carts" , "products")(observer((props) => {

  useEffect(() => {

    props.carts.calculateTotalPrices(props.products.cart)

  } , [(props.products.cart)])

  return (
    <div className='containerStores'>
        <SearchBar/>
        <StoresElem />
    </div>
  )
}))

export default StoresSearch