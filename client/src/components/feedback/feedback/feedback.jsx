import React, { Fragment } from 'react'

import PostForum from '../post_forum/post_forum'
import background from '../../../images/cart.jpg'

import './feedback.css'

function Home() {
  return (
    <div className='feedbackContainer'>
    <img className='background' src={background} alt='background'></img>
    <div className='feedbackContainer'>
    <Fragment>
         <PostForum />
    </Fragment>
    </div>
    </div>
  )
}

export default Home