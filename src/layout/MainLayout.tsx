import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css"; // Important to include AOS styles
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Import Footer component

const MainLayout: React.FC = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <div className="font-poppins">
      <Navbar />
      <Outlet />
      <footer className="bg-gray-800 text-white py-6 mt-12">
            <div className="max-w-screen-xl mx-auto text-center">
              <p>&copy; 2025 NMCD.Inc. All rights reserved.</p>
              <p>Designed by NMCD.Inc</p>
            </div>
      </footer>
    </div>
  );
};

export default MainLayout;
