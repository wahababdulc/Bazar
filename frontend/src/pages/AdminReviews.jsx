import { useEffect, useState } from 'react';
import AdminGuard from '../components/AdminGuard';
import { Link } from 'react-router-dom';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const r = JSON.parse(localStorage.getItem('reviews') || '[]');
    setReviews(r.reverse());
  }, []);

  const refresh = () => {
    const r = JSON.parse(localStorage.getItem('reviews') || '[]');
    setReviews(r.reverse());
  };

  const approve = (index) => {
    const original = JSON.parse(localStorage.getItem('reviews') || '[]');
    const realIndex = original.length - 1 - index;
    original[realIndex].approved = true;
    localStorage.setItem('reviews', JSON.stringify(original));
    refresh();
  };

  const remove = (index) => {
    const original = JSON.parse(localStorage.getItem('reviews') || '[]');
    const realIndex = original.length - 1 - index;
    original.splice(realIndex, 1);
    localStorage.setItem('reviews', JSON.stringify(original));
    refresh();
  };

  const clearAll = () => {
    if (!confirm('Clear all reviews?')) return;
    localStorage.removeItem('reviews');
    setReviews([]);
  };

  return (
    <AdminGuard>
      <div className="flex-grow container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Admin — Reviews</h2>
          <div className="space-x-2">
            <Link to="/" className="text-sm text-green-600 hover:underline">Back to site</Link>
            <Link to="/admin/messages" className="ml-2 text-sm text-green-600 hover:underline">Manage Messages</Link>
            <button onClick={refresh} className="ml-2 bg-white border px-3 py-1 rounded shadow-sm">Refresh</button>
            <button onClick={clearAll} className="ml-2 bg-red-600 text-white px-3 py-1 rounded">Clear All</button>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-gray-600">No reviews found.</div>
        ) : (
          <div className="grid gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white p-4 rounded shadow flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500">{r.createdAt ? new Date(r.createdAt).toLocaleString() : '—'}</div>
                  <div className="font-semibold text-lg">{r.name || 'Anonymous'}</div>
                  <div className="text-sm text-gray-600">Rating: {r.rating} / 5 {r.approved ? <span className="text-green-600">(Approved)</span> : <span className="text-yellow-600">(Pending)</span>}</div>
                  <p className="mt-2 text-gray-700 whitespace-pre-line">{r.comment}</p>
                </div>
                <div className="ml-4 flex flex-col items-end gap-2">
                  {!r.approved && <button onClick={() => approve(i)} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded">Approve</button>}
                  <button onClick={() => remove(i)} className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
