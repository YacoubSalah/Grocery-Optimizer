import React from 'react'
import { observer, inject } from 'mobx-react'

import Store from '../store/store'

import './stores_elem.css'

const stores = inject("carts")(observer((props) => {

  let storesList = (props.carts.storesCartsList)

  return (
    <div className='stores'>
      {storesList.map(store => <Store key={store.id} store={store} />)}
    </div>
  )
  
}))

export default stores