import { useState, useEffect } from 'react';

export default function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fallbackProducts = [
      { id: 1, title: 'Fresh Apples', category: 'Fruits', price: 2.99, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80' },
      { id: 2, title: 'Organic Carrots', category: 'Vegetables', price: 1.49, image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=800&q=80' },
      { id: 3, title: 'Fresh Bread', category: 'Bakery', price: 2.49, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
      { id: 4, title: 'Milk', category: 'Dairy', price: 3.29, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80' }
    ];

    fetch('https://arman231294-code.github.io/api/products.json')
      .then(res => res.json())
      .then(data => {
        const loaded = data?.products?.length ? data.products : fallbackProducts;
        setProducts(loaded);
        setFilteredProducts(loaded);
      })
      .catch(() => {
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
      });
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.title} added to cart!`);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setFilteredProducts(products.filter(p => p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)));
  };

  const handleCategory = (cat) => {
    if (cat === 'All') setFilteredProducts(products);
    else setFilteredProducts(products.filter(p => p.category === cat));
  };

  return (
    <div className="flex-grow container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Products</h2>
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <input type="text" onChange={handleSearch} placeholder="Search products..." className="border-2 border-green-200 rounded-full px-4 py-2 w-full md:w-1/3 focus:outline-none focus:border-green-500" />
        <div className="flex flex-wrap gap-2">
          {['All', 'Fruits', 'Vegetables', 'Bakery', 'Dairy', 'Beverages'].map(cat => (
            <button key={cat} onClick={() => handleCategory(cat)} className="bg-green-100 text-green-800 hover:bg-green-600 hover:text-white px-4 py-1 rounded-full transition">{cat}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map(p => (
          <div key={p.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full hover:shadow-xl transition">
            <div>
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full mb-2 inline-block">{p.category}</span>
              <img src={p.image} className="w-full h-40 object-cover rounded mb-2" alt={p.title} />
              <h3 className="font-bold line-clamp-1">{p.title}</h3>
              <p className="text-green-600 font-bold mt-2">${p.price.toFixed(2)}</p>
            </div>
            <button onClick={() => addToCart(p)} className="w-full bg-green-600 text-white mt-3 py-2 rounded hover:bg-green-700">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
