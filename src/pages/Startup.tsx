import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo.png';

const Startup = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#ededed' }}>
      <img src={logo} alt="Logo" className="w-[400px] h-[400px] mb-16 rounded-full" />
      <div className="flex flex-col gap-12 w-full max-w-lg">
        <button
          className="w-full py-8 text-4xl font-bold rounded-2xl shadow-xl transition-all bg-gradient-to-r from-[#75b3b8] to-[#8dbf7f] text-white hover:scale-105 focus:outline-none"
          style={{ minHeight: '100px' }}
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
        <button
          className="w-full py-8 text-4xl font-bold rounded-2xl shadow-xl transition-all bg-gradient-to-r from-[#75b3b8] to-[#8dbf7f] text-white hover:scale-105 focus:outline-none"
          style={{ minHeight: '100px' }}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Startup; 