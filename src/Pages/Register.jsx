import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/Provider';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Register = () => {
  const { userCreate, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    userCreate(email, password)
      .then(() => {
        return updateUser({ displayName: name });
      })
      .then(() => {
        setLoading(false);
        toast.success("Registration successful!");
        navigate('/business-form');
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div className="relative text-white min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/pattern.svg')] bg-cover bg-center" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xl bg-[#6D828F] rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">Create Account</h2>
        <form onSubmit={handleForm} className="space-y-6">
          <div>
            <label className="block text-white mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#6D828F] font-semibold py-3 rounded-md hover:bg-gray-100 transition"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-white underline hover:text-gray-200">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
