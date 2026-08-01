import { useState } from 'react';

export default function AdminGuard({ children }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');

  const tryLogin = (e) => {
    e.preventDefault();
    // Simple frontend password check. Default password: alpha2412
    if (password === 'alpha2412') {
      setAuthed(true);
    } else {
      alert('Incorrect password');
    }
  };

  const logout = () => {
    setAuthed(false);
    setPassword('');
  };

  if (authed) {
    return (
      <div>
        <div className="flex justify-end p-4">
          <button onClick={logout} className="text-sm bg-red-600 text-white px-3 py-1 rounded">Logout</button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="flex-grow container mx-auto px-6 py-20">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Admin Login</h3>
        <form onSubmit={tryLogin}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password" className="w-full border p-3 rounded mb-4" />
          <div className="flex justify-end">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
