import React from 'react'
import './snackbar_component.css'
import Post from './post/post'
import {Button } from '@mui/material';

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
            <Button onClick={handelClickClose} >close</Button>
        </div>
    </div>
  )
}

export default snackbar