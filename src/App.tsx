import './App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Contact from './pages/Contact';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Checkout-Success" element={<CheckoutSuccess />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;