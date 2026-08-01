import { useState, useEffect } from 'react';

export default function Cart({ cart, setCart, closeCart }) {
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(JSON.parse(localStorage.getItem('freshMartCart'))?.discount || 0);

  useEffect(() => {
    localStorage.setItem('freshMartCart', JSON.stringify({ items: cart, discount: discountPercent }));
  }, [cart, discountPercent]);

  const updateQuantity = (index, amount) => {
    const newCart = [...cart];
    if (newCart[index].quantity + amount > 0) {
      newCart[index].quantity += amount;
      setCart(newCart);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const applyDiscount = () => {
    const code = discountCode.toUpperCase();
    if (code === 'ARMAN') { setDiscountPercent(20); alert("20% Discount Applied!"); }
    else if (code === 'WASIF') { setDiscountPercent(10); alert("10% Discount Applied!"); }
    else { alert("Invalid Code."); }
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTotal = cartSubtotal > 0 ? cartSubtotal + 5 - (cartSubtotal * discountPercent / 100) : 0;

  return (
    <>
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col">
        <div className="p-4 border-b flex justify-between">
          <h2 className="text-xl font-bold text-green-700">Your Cart</h2>
          <button onClick={closeCart} className="text-gray-500 hover:text-red-500"><i className="fas fa-times"></i></button>
        </div>
        
        <div className="p-4 flex-grow overflow-y-auto">
          {cart.length === 0 ? <p className="text-center text-gray-500 py-8">Your cart is empty</p> : 
            cart.map((item, i) => (
              <div key={i} className="flex items-start border-b pb-4 mb-4">
                <img src={item.image} className="w-12 h-12 object-cover rounded mr-3" alt={item.title} />
                <div className="flex-grow">
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <div className="flex items-center mt-1">
                    <button className="bg-gray-200 px-2 rounded-l" onClick={() => updateQuantity(i, -1)}>-</button>
                    <span className="px-3 bg-gray-100">{item.quantity}</span>
                    <button className="bg-gray-200 px-2 rounded-r" onClick={() => updateQuantity(i, 1)}>+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button className="text-red-500 text-sm mt-1" onClick={() => removeFromCart(i)}>Remove</button>
                </div>
              </div>
            ))
          }
        </div>

        <div className="p-4 border-t bg-gray-50">
            <div className="flex">
                <input type="text" onChange={(e) => setDiscountCode(e.target.value)} placeholder="Discount Code" className="border rounded-l px-3 py-2 w-full focus:outline-none" />
                <button onClick={applyDiscount} className="bg-green-600 text-white px-4 rounded-r">Apply</button>
            </div>
            {discountPercent > 0 && <p className="text-green-600 text-sm mt-1">Discount applied: {discountPercent}% off</p>}
            
            <div className="flex justify-between mt-4 text-lg font-bold"><span>Total:</span><span className="text-green-700">${cartTotal.toFixed(2)}</span></div>
            <button onClick={() => { alert("Order Placed!"); setCart([]); setDiscountPercent(0); closeCart(); }} className="w-full bg-green-600 text-white py-3 mt-4 rounded-lg font-bold hover:bg-green-700 transition">Checkout</button>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeCart}></div>
    </>
  );
}