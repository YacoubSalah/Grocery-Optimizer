import React from 'react'
import './storesSearchBar.css'

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
        <label class="containerCheckbox">By Price
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="containerCheckbox">By Score
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>

        {/* --------------------------------- */}

        <span>filter :</span>

        <label class="containerCheckbox">Incomplete
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="containerCheckbox">Only scored
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
  )
}

export default storesSearchBar