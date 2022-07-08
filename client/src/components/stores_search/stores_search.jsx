import React from 'react'
import SearchBar from '../store_search_bar/stores_search_bar'
import Stores from '../stores/stores'
import './stores_search.css'

function storesSearch() {
  return (
    <div className='containerStores'>
        <SearchBar/>
        <Stores/>
    </div>
  )
}

export default storesSearch