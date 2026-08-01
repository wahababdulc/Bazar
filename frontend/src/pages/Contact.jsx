import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = { name, email, message, timestamp: new Date().toISOString() };
    try {
      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      existing.push(msg);
      localStorage.setItem('contact_messages', JSON.stringify(existing));
      setStatus('Message saved locally. Key: contact_messages');
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      setStatus('Failed to save message locally.');
    }
  };

  return (
    <div className="flex-grow container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      <p className="text-gray-700 mb-4">Have questions? Reach out to us at <a href="mailto:contact@freshwahabsmart.com" className="text-green-700">contact@freshwahabsmart.com</a>.</p>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl">
        <input value={name} onChange={e => setName(e.target.value)} className="w-full border p-3 rounded mb-4" placeholder="Your name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full border p-3 rounded mb-4" placeholder="Your email" required />
        <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full border p-3 rounded mb-4" placeholder="Message" rows={6} required />
        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded">Send Message</button>
      </form>
      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
      <p className="mt-2 text-xs text-gray-500">Messages are stored in your browser's localStorage under the key <strong>contact_messages</strong>. To view them open the browser devtools Application → Local Storage.</p>
    </div>
  );
}
