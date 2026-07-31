import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('adminToken'));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setLoggedIn(true);
        alert("Welcome Admin!");
        navigate('/');
    } else {
        alert("Incorrect Email or Password!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setLoggedIn(false);
    alert('Logged out successfully');
  };

  return (
    <div className="flex-grow flex justify-center items-center py-20 px-4">
      {loggedIn ? (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-green-600 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Admin Logged In</h2>
          <p className="mb-8 text-gray-600">You are currently logged in as an admin.</p>
          <button onClick={handleLogout} className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700">Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} autoComplete="off" className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-green-600">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Login</h2>
          <div className="space-y-5">
            <input name="email" type="email" placeholder="Email" autoComplete="off" className="w-full border-2 rounded-lg px-4 py-3 bg-white text-gray-800" required />
            <input name="password" type="password" placeholder="Password" autoComplete="new-password" className="w-full border-2 rounded-lg px-4 py-3 bg-white text-gray-800" required />
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">Sign In</button>
          </div>
        </form>
      )}
    </div>
  );
}