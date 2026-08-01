import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Review from './pages/Review';
import AdminMessages from './pages/AdminMessages';
import AdminReviews from './pages/AdminReviews';

export default function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('freshMartCart'))?.items || []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
        <Navbar cartCount={cart.length} openCart={() => setIsCartOpen(true)} />
        
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route path="/products" element={<Products cart={cart} setCart={setCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/review" element={<Review />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {isCartOpen && <Cart cart={cart} setCart={setCart} closeCart={() => setIsCartOpen(false)} />}
      </div>
    </Router>
  );
}