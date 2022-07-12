import React from 'react'
import './stores.css'
import Store from '../store/store'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'

const stores = inject("carts")(observer((props) => {

  let storesList = toJS(props.carts.storesCartsList)
  return (
    <div className='stores'>
      {storesList.map(store => {
        return(
           <Store  key={store.id} showDetailsCompnonet={props.carts.showDetailsCompnonet} store={store} />
        )
      })}
    </div>
  )
}))

export default stores