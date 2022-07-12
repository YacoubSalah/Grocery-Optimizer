import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

import Navbar from './components/navigation_bar/navigation_bar'
import Home from './components/home/home';
import ProductsSearch from './components/products_search/products_search'
import StoreSearch from './components/stores_search/stores_search'
import Details from './components/details_component/details_component'

import './app.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductsSearch />} />
          <Route path='/stores' element={<StoreSearch />} />
          <Route path='/details' element={<Details />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
