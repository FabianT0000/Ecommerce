
import './App.css';
import Navbar from './Components/Navbar/ContainerNavbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from "./Pages/Product";
import Footer from './Components/Footer/Footer'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './Pages/Cart';
import LoginSingup from './Pages/LoginSingup';
function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory  category="men" />} />
          <Route path='/womens' element={<ShopCategory  category="women" />} />
          <Route path='/kids' element={<ShopCategory  category="kid" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSingup />} />

        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
