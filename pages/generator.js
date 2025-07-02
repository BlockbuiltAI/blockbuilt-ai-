import { useState } from 'react';

export default function Generator() {
  const [form, setForm] = useState({
    name: '',
    creditor: '',
    account: '',
    reason: '',
  });

  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLetter('⏳ Generating letter...');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-letter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLetter(data.letter || '❌ Error: ' + data.error);
    } catch (err) {
      setLetter('❌ Network error');
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: 20, fontFamily: 'Arial', maxWidth: 600, margin: 'auto' }}>
      <img src="/logo.png" alt="Logo" style={{ width: 120, marginBottom: 20 }} />
      <h1>🧠 Credit Dispute Letter Generator</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="creditor"
          placeholder="Creditor Name"
          value={form.creditor}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="account"
          placeholder="Account Number"
          value={form.account}
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="reason"
          placeholder="Reason for Dispute"
          value={form.reason}
          onChange={handleChange}
          required
          rows={5}
          cols={40}
        ></textarea><br /><br />

        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Generating...' : 'Generate Letter'}
        </button>
      </form>

      <div style={{ marginTop: 30 }}>
        <h2>📄 Your Letter</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{letter}</pre>
      </div>
    </main>
  );
}
