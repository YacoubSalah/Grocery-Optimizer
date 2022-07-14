import React from 'react'
import { useEffect } from 'react'
import { observer, inject } from 'mobx-react'

import './search_bar.css'

const storesSearchBar = inject("store", "carts", "products")(observer((props) => {

  useEffect(() => {
    props.carts.getStoresNameList()
    props.carts.getStoresLocationList()
  }, [props.carts])

  function searchProductStores() {
    props.carts.getStoresByProducts(props.products.cart)
  }

  return (
    <div className='storesSearchbar'>

      <div className='selectorMenu'>
        <select defaultValue={'default'}>
          <option value="" >Choose City...</option>
          {props.carts.storesLocationList.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>

      <div className='selectorMenu'>
        <select defaultValue={'default'}>
          <option value="">Choose a Store...</option>
          {props.carts.storesNameList.map(store => <option key={store} value={store}>{store}</option>)}
        </select>
      </div>

      <div >
        <button className='searchButton' onClick={searchProductStores}>Search</button>
      </div>
      
    </div >

  )

}))

export default storesSearchBar