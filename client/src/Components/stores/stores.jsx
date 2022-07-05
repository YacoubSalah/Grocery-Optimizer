import React from 'react'
import './stores.css'
import Store from '../store/store'

function stores() {

  let arr = []
  for(let i=0 ; i< 10 ; i++){
    arr.push(<Store />)
  }
  return (
    <div className='stores'>
        {arr.map(element => element)}
    </div>
  )
}

export default stores