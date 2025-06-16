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
      <p className="text-center mt-4">&copy; {currentYear} NMCD.Inc. All rights reserved.</p>
    </div>
  );
};

export default MainLayout;
