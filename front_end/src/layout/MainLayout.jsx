import { Outlet } from "react-router-dom";
import Banner from "../components/banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import Aos from "aos";
import { useEffect } from "react";


const MainLayout = () => {
  useEffect(()=>{
    Aos.init()
  },[])
  return (
    <div className="font-poppins">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;