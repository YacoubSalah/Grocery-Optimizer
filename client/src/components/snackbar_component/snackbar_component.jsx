import React from 'react'
import './snackbar.css'
import Post from '../post/post'

function snackbar(props) {

  const handelClickClose = () => 
  {
    props.handleToClose()
  }
  return (
    <div className='snackbar' id={props.open ? "show" : "hide"}>
        <div className='posts'>
            {props.posts.map(post => {
              return ( <Post 
                         key={post.createdAt}
                         post={post}
                         itemName={props.itemName}
                         storeName={props.storeName}
                         storeLocation={props.storeLocation}
                         /> )
            })}
        </div>
        <div className='fotter' >
            <button onClick={handelClickClose} >close</button>
        </div>
    </div>
  )
}

export default snackbar