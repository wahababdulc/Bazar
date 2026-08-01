import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminGuard from '../components/AdminGuard';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const msgs = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    setMessages(msgs.reverse());
  }, []);

  const refresh = () => {
    const msgs = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    setMessages(msgs.reverse());
  };

  const removeMessage = (index) => {
    const original = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    const realIndex = original.length - 1 - index;
    original.splice(realIndex, 1);
    localStorage.setItem('contact_messages', JSON.stringify(original));
    refresh();
  };

  const clearAll = () => {
    if (!confirm('Clear all contact messages?')) return;
    localStorage.removeItem('contact_messages');
    setMessages([]);
  };

  return (
    <AdminGuard>
      <div className="flex-grow container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Admin — Contact Messages</h2>
          <div className="space-x-2">
            <Link to="/" className="text-sm text-green-600 hover:underline">Back to site</Link>
            <Link to="/admin/reviews" className="ml-2 text-sm text-green-600 hover:underline">Manage Reviews</Link>
            <button onClick={refresh} className="ml-2 bg-white border px-3 py-1 rounded shadow-sm">Refresh</button>
            <button onClick={clearAll} className="ml-2 bg-red-600 text-white px-3 py-1 rounded">Clear All</button>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-gray-600">No messages found.</div>
        ) : (
          <div className="grid gap-4">
            {messages.map((m, i) => (
              <div key={i} className="bg-white p-4 rounded shadow flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500">{m.timestamp ? new Date(m.timestamp).toLocaleString() : '—'}</div>
                  <div className="font-semibold text-lg">{m.name || 'Anonymous'}</div>
                  <div className="text-sm text-gray-600">{m.email}</div>
                  <p className="mt-2 text-gray-700 whitespace-pre-line">{m.message}</p>
                </div>
                <div className="ml-4 flex flex-col items-end">
                  <button onClick={() => removeMessage(i)} className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
