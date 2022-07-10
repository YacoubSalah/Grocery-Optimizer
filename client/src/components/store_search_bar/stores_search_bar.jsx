import React from 'react'
import './stores_search_bar.css'

function storesSearchBar() {
  return (
    <div className='searchBar'>
      <div className='selectsDiv'>
        <div>
          <span>City Name :</span>
          <select>
            <option>
              haifa
            </option>
          </select>
        </div>
        <div>
          <span>Store :</span>
          <select>
            <option>
              supersall
            </option>
          </select>
        </div>

        <button className='findPriceButton'>Find price</button>
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
}

export default storesSearchBar