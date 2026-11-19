import './App.css';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;