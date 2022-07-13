import React, { Fragment } from 'react'
import PostForum from '../post_forum/post_forum'

import './feedback.css'

function Home() {
  return (
    <div className='feedbackContainer'>
    <Fragment>
         <PostForum />
    </Fragment>
    </div>
  )
}

export default Home