import React from 'react'
import { useEffect } from 'react'
import { observer, inject } from 'mobx-react'

import './search_bar.css'

const storesSearchBar = inject("store", "carts")(observer((props) => {

  return (
    <div className='storesSearchbar'>

      <div className='selectorMenu'>
        <select name="cityNameFilter" defaultValue="" onChange={props.carts.updatedFilteredStoresCarts}>
          <option value="" >Choose City...</option>
          {props.carts.citiesNameList.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>

      <div className='selectorMenu'>
        <select name="storeNameFilter" defaultValue="" onChange={props.carts.updatedFilteredStoresCarts}>
          <option value="">Choose a Store...</option>
          {props.carts.storesNameList.map(store => <option key={store} value={store}>{store}</option>)}
        </select>
      </div>


    </div >

  )

}))

export default storesSearchBar