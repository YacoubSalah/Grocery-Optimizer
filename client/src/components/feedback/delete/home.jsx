import React, { Fragment } from 'react'
import PostForum from '../post_forum/post_forum'

import './home.css'

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