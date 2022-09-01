import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavigationBar from './components/navigation_bar/navigation_bar'
import Home from './components/home/home';
import Products from './components/products/products/products'
import Stores from './components/stores/stores/stores'
import Feedback from './components/feedback/feedback/feedback'
import Details from './components/details/details'

import './app.css'

function App() {

  return (
      <div className='app'>
        <Router >
          <div className="appHeader">
            <NavigationBar />
          </div>
          <div className="appBody">
            <Routes >
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/stores' element={<Stores />} />
              <Route path='/feedback' element={<Feedback />} />
              <Route path='/details' element={<Details />} />
            </Routes>
          </div>
        </Router>
      </div>
  )
}

export default App
