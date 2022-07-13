import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/navigation_bar/navigation_bar'
import Home from './components/home/home';
import ProductsSearch from './components/products_search/products_search'
import StoreSearch from './components/stores_search/stores_search'
import Details from './components/details_component/details_component'
import NewHome from './components/new-home/new-home'
import SnackbarProvider from 'react-simple-snackbar'

import './app.css'

function App() {
  return (
    <SnackbarProvider>
      <div className='app'>
        <Router >
          <div className="appHeader">
            <Navbar />
          </div>
          <div className="appBody">
            <Routes >
              <Route path='/' element={<NewHome />} />
              {/* <Route path='/' element={<Home />} /> */}
              <Route path='/products' element={<ProductsSearch />} />
              <Route path='/stores' element={<StoreSearch />} />
              <Route path='/details' element={<Details />} />
            </Routes>
          </div>
        </Router>
      </div>
    </SnackbarProvider>
  )
}

export default App
