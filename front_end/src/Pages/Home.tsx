import React from "react";
import Banner from "../components/Banner";
import HowIt from "../components/HowIt";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col w-full px-0">
      {/* Banner section */}
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
