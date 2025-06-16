import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/Provider';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const { userLogin, setEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    userLogin(email, password)
      .then(() => {
        setLoading(false);
        navigate('/business-form');
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const forgetPassword = () => setEmail(inputValue);

  return (
    <div className="relative text-white min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/pattern.svg')] bg-cover bg-center" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xl bg-[#6D828F] rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">Login</h2>
        <form onSubmit={handleForm} className="space-y-6">
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
              required
              placeholder="••••••••"
            />
            <div className="text-right mt-2">
              <Link to="/forgetPassword" onClick={forgetPassword} className="text-sm text-white underline hover:text-gray-200">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#6D828F] font-semibold py-3 rounded-md hover:bg-gray-100 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6">
          Don’t Have An Account?{' '}
          <Link to="/auth/register" className="text-white underline hover:text-gray-200">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
