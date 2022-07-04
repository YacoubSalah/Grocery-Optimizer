import React from 'react'
import SearchBar from '../storeSearchBar/storesSearchBar'
import Stores from '../stores/stores'
import './storesSearch.css'

function storesSearch() {
  return (
    <div className='containerStores'>
        <SearchBar/>
        <Stores/>
    </div>
  )
}

export default storesSearch