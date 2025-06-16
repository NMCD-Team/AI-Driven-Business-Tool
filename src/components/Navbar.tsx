import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";
import React from "react";

interface User {
  email: string;
  [key: string]: any;
}

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext) as {
    user: User | null;
    userLogout: () => void;
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Links = (
    <>
      <li><Link to="/" className="text-xl text-white hover:text-[#FFE712] transition">Home</Link></li>
      <li><Link to="/business-form" className="text-xl text-white hover:text-[#FFE712] transition">Business Form</Link></li>
      <li><Link to="/about-us" className="text-xl text-white hover:text-[#FFE712] transition">About Us</Link></li>
      <li><Link to="/footer" className="text-xl text-white hover:text-[#FFE712] transition">Contact Us</Link></li>
    </>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#6D828F] shadow-md' : 'bg-[#6D828F] shadow-none'}`}>
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 h-10" src="/assets/logo.png" alt="NMCD Inc Logo" />
          <span className="text-xl font-bold text-white">NMCD.Inc</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex flex-row space-x-6 items-center">
          {Links}
        </ul>

        {/* Right side - Auth */}
        <div className="flex items-center gap-4">
          {user?.email ? (
            <div className="flex items-center gap-3">
              <div className="dropdown dropdown-end relative">
                <button className="btn btn-ghost btn-circle avatar placeholder">
                  <div className="bg-white text-[#6D828F] rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-lg font-bold">{user.email.charAt(0).toUpperCase()}</span>
                  </div>
                </button>
              </div>
              <button onClick={userLogout} className="hidden lg:inline-block bg-white text-[#6D828F] px-4 py-2 rounded-md hover:bg-opacity-90 transition-all">Logout</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/auth/login" className="btn btn-outline btn-sm text-xl text-white hover:text-[#FFE712]">Login</Link>
              <Link to="/auth/register" className="btn btn-outline btn-sm text-xl text-white hover:text-[#FFE712]">Register</Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-56">
            {Links}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
