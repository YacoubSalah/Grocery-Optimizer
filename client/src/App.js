import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './Components/home/Home';
import ProductsSearch from './Components/ProductsSearch/ProductsSearch';
import StoreSearch from './Components/StoreSearch/StoreSearch';
import Navbar from './Components/navigation_bar/navigation_bar'


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
