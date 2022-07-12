import React from 'react'
import './details_component.css'
/* import { Rating } from 'react-simple-star-rating' */
import GridHeader from './grid_header' 

function details_component() {
  return (
    <div className='DetailsContainer'>
      <div class="container">
        <div class="content">
          <h1>Yackobs Store</h1>
          <h3>store location</h3>
        </div>
        <div className='gridcontent'>
             <GridHeader />
             
        </div>
      </div>
    </div>
  )
}

export default details_component