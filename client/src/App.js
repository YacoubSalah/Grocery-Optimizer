import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './components/home/Home';
import ProductsSearch from './components/ProductsSearch/ProductsSearch';
import StoreSearch from './components/StoreSearch/StoreSearch';
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
