import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    window.localStorage.setItem('user', JSON.stringify({
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password
    }));
    window.localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('userLogin'));
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      <h2 className="text-3xl font-bold mb-6 text-center">Login / Register</h2>
      <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 border App-border rounded-xl p-8 shadow-md w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="InputOpinions"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="InputOpinions"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="InputOpinions"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="InputOpinions"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="InputOpinions"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="head-btn self-center mt-2 cursor-pointer">Submit</button>
      </form>
    </div>
  )
}

export default LoginPage