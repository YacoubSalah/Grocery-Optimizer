import React from 'react'
import './search_bar.css'
import { observer, inject } from 'mobx-react'


const storesSearchBar = inject("store" , "carts" , "products")(observer((props) => {

  function searchProductStores(){
    props.carts.getStoresByProducts(props.products.cart)
  }

  return (
    <div className='searchBar'>
      <div className='selectsDiv'>
        
        <div className='CitySelectedDiv'>
          <span>City Name :</span>
          <select defaultValue={'default'}>
            <option value="" >Choose a Location...</option>
            {props.store.storesLocationList.map(city => {
              return (
                <option key={city} value={city}>{city}</option>
              )
            })}
          </select>
        </div>

        <div className='StoreSelectedDiv'>
          <span>Store :</span>
          <select defaultValue={'default'}>
            <option value="">Choose a Store...</option>
            {props.store.storesNameList.map(store => {
              return (
                <option key={store} value={store}>{store}</option>
              )
            })}
          </select>
        </div>

        {/* <button className='findPriceButton'>Find price</button> */}
        <button className='searchButton' onClick={searchProductStores}>Search</button>

      </div>

      
      <div className='Checkboxes'>
        <span>Sort :</span>
        <label className="containerCheckbox">By Price
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <label className="containerCheckbox">By Score
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>

        {/* --------------------------------- */}

        <span>filter :</span>

        <label className="containerCheckbox">Incomplete
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <label className="containerCheckbox">Only scored
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  )
}))

export default storesSearchBar