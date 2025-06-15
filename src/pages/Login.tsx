import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/main');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: '#ededed' }}>
      <div className="flex flex-row gap-x-12 max-w-4xl w-full items-center justify-center mx-auto">
        <div className="flex-1 flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-[400px] h-[400px] max-w-[40vw] max-h-[70vh] object-contain rounded-full" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6 items-center">
            <label className="text-lg font-medium text-gray-700 w-full text-left" htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              className="border border-gray-300 rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label className="text-lg font-medium text-gray-700 w-full text-left" htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className="border border-gray-300 rounded px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="mt-6 py-4 w-full text-2xl font-bold rounded-2xl bg-gradient-to-r from-[#75b3b8] to-[#8dbf7f] text-white shadow-xl hover:scale-105 transition-all">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 