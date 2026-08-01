import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, openCart }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-500 text-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <i className="fas fa-leaf mr-2"></i> Fresh Wahab Smart
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="font-medium hover:text-green-200">Home</Link>
          <Link to="/products" className="font-medium hover:text-green-200">Products</Link>
          <Link to="/contact" className="font-medium hover:text-green-200">Contact Us</Link>
          <Link to="/admin/messages" className="font-medium hover:text-green-200">Admin</Link>
          <Link to="/admin/reviews" className="font-medium hover:text-green-200">Admin Reviews</Link>
          <Link to="/review" className="font-medium hover:text-green-200">Review</Link>
          <Link to="/about" className="font-medium text-yellow-300">About Us</Link>
          <Link to="/login" className="font-medium hover:text-green-200">Login</Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="text-white text-2xl mr-4">
            <i className={open ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative cursor-pointer" onClick={openCart}>
            <i className="fas fa-shopping-cart text-2xl border border-white rounded-full p-2 hover:bg-green-600"></i>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden bg-white text-green-800 shadow-md">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-2">
            <Link to="/" onClick={() => setOpen(false)} className="font-medium">Home</Link>
            <Link to="/products" onClick={() => setOpen(false)} className="font-medium">Products</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="font-medium">Contact Us</Link>
            <Link to="/review" onClick={() => setOpen(false)} className="font-medium">Review</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="font-medium text-yellow-600">About Us</Link>
            <Link to="/login" onClick={() => setOpen(false)} className="font-medium">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}