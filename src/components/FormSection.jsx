import React, { useState } from 'react'

const FormSection = ({ onAddOpinion, user }) => {
  const [form, setForm] = useState({ name: '', email: '', comment: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let opinion;
    if (user) {
      if (!form.comment) {
        setError('Please enter your opinion.');
        return;
      }
      opinion = { name: user.name, email: user.email, comment: form.comment, username: user.username };
    } else {
      if (!form.name || !form.email || !form.comment) {
        setError('Please fill in all fields.');
        return;
      }
      opinion = { ...form };
    }
    setError('');
    onAddOpinion(opinion);
    setForm({ name: '', email: '', comment: '' });
  };

  return (
    <div className="w-full h-[70vh] flex flex-col items-center py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Share Your Opinion</h2>
      <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 border App-border rounded-xl p-6 shadow-md w-full max-w-md flex flex-col gap-4">
        {!user && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="InputOpinions"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="InputOpinions"
            />
          </>
        )}
        <textarea
          name="comment"
          placeholder="Your Opinion..."
          value={form.comment}
          onChange={handleChange}
          rows={3}
          className="InputOpinions resize-none"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="head-btn self-center mt-2 cursor-pointer">Submit</button>
      </form>
    </div>
  )
}

export default FormSection