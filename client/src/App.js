import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './components/home/home';
import ProductsSearch from './components/productsSearch/productsSearch';
import StoreSearch from './components/storesSearch/storesSearch';
import Navbar from './components/navigation_bar/navigation_bar'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Products' element={<ProductsSearch />} />
          <Route path='/Stores' element={<StoreSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
