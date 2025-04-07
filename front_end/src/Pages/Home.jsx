import React from "react";
import Banner from "../components/banner";
import About from "../components/About";
import HowIt from "../components/HowIt";


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col w-full px-0">
      {/* banner section */}
      <Banner />

      {/* How it works section */}
      <HowIt />

      <div className="mt-auto text-center py-6 text-gray-500 text-sm">
        NMCD.Inc. All rights reserved.
      </div>
    </div>
  );
};

export default Home;
