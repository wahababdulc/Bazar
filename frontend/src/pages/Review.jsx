import { useEffect, useState } from 'react';

export default function Review() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [approvedReviews, setApprovedReviews] = useState([]);

  useEffect(() => {
    const r = JSON.parse(localStorage.getItem('reviews') || '[]');
    setApprovedReviews(r.filter(x => x.approved));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const entry = { name, email, rating: Number(rating), comment, approved: false, createdAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('reviews') || '[]');
    existing.push(entry);
    localStorage.setItem('reviews', JSON.stringify(existing));
    setStatus('Thanks — your review was submitted for approval.');
    setName(''); setEmail(''); setRating(5); setComment('');
  };

  return (
    <div className="flex-grow container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">Leave a Review</h3>
          <form onSubmit={submit} className="bg-white p-6 rounded shadow">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full border p-3 rounded mb-3" required />
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Your email" className="w-full border p-3 rounded mb-3" required />
            <div className="mb-3">
              <label className="block text-sm mb-1">Rating</label>
              <select value={rating} onChange={e => setRating(e.target.value)} className="border p-2 rounded">
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} star{n>1?'s':''}</option>)}
              </select>
            </div>
            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={5} placeholder="Your review" className="w-full border p-3 rounded mb-3" required />
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Review</button>
              {status && <span className="text-sm text-gray-600">{status}</span>}
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Approved Reviews</h3>
          {approvedReviews.length === 0 ? (
            <div className="bg-white p-6 rounded shadow text-gray-600">No approved reviews yet.</div>
          ) : (
            <div className="space-y-4">
              {approvedReviews.map((r, i) => (
                <div key={i} className="bg-white p-4 rounded shadow">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{r.name || 'Anonymous'}</div>
                    <div className="text-yellow-400">{'★'.repeat(r.rating) + '☆'.repeat(5-r.rating)}</div>
                  </div>
                  <p className="text-sm text-gray-500">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}</p>
                  <p className="mt-2 text-gray-700">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
