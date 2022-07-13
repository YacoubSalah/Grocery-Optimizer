import React, { Fragment } from 'react'

import PostForum from '../post_forum/post_forum'
import background from '../../../images/cart.jpg'

import './feedback.css'

function Home() {
  return (
    <>
    <img className='background' src={background}></img>
    <div className='feedbackContainer'>
    <Fragment>
         <PostForum />
    </Fragment>
    </div>
    </>
  )
}

export default Home