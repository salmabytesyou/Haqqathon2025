import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/main');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-4xl font-bold mb-4">Aligned</h1>
      <h2 className="text-2xl font-semibold mb-8">Sign Up</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4">
        <label className="text-lg font-medium text-gray-700" htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label className="text-lg font-medium text-gray-700" htmlFor="fname">First name:</label>
        <input
          id="fname"
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={fname}
          onChange={e => setFname(e.target.value)}
        />
        <label className="text-lg font-medium text-gray-700" htmlFor="lname">Last name:</label>
        <input
          id="lname"
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={lname}
          onChange={e => setLname(e.target.value)}
        />
        <label className="text-lg font-medium text-gray-700" htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="mt-6 py-3 bg-green-500 text-white text-xl rounded-lg font-semibold hover:bg-green-600 transition-colors">Sign Up</button>
      </form>
      <p className="mt-6 text-gray-700">Please input your details to sign up to our wonderful app!</p>
    </div>
  );
};

export default Signup; 