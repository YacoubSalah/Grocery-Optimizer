import React from 'react'
import SearchBar from '../store_search_bar/stores_search_bar'
import Stores from '../stores/stores'
import './stores_search.css'
import { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import Details from '../details_component/details_component'

const StoresSearch = inject("carts" , "products")(observer((props) => {

  useEffect(() => {

    props.carts.getStoresByProducts(props.products.cart)
    
  });

  return (
    <div className='containerStores'>
        <SearchBar/>
        {props.carts.flagShowDestails ? <Details /> : <Stores />}
    </div>
  )
}))

export default StoresSearch