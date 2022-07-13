import React from 'react'
import './post.css'

function post(props) {

    console.log(props.post)
  return (
    <div className='feedbackpost'>
        <div className='postIMage' >
            <img  src={props.post.imageURL} alt="item" />
            <p>{props.itemName}</p>
        </div>
        <div className='postStoreData'>

        </div>
        <div className='postitemData'>
            
        </div>
    </div>
  )
}

export default post