import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/navigation_bar/navigation_bar'
import Home from './components/home/home';
import ProductsSearch from './components/products_search/products_search'
import StoreSearch from './components/stores_search/stores_search'
import NewHome from './components/new-home/new-home'

import './app.css'

function App() {
  return (
    <div className='app'>
      <Router >
        <div className="appHeader">
          <Navbar />
        </div>
        <div className="appBody">
          <Routes >
            <Route path='/' element={<Home />} />
            {/* <Route path='/' element={<Home />} /> */}
            <Route path='/products' element={<ProductsSearch />} />
            <Route path='/stores' element={<StoreSearch />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
