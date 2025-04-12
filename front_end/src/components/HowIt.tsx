import React from "react";
import HowItIs from "./HowItIs";

const HowIt: React.FC = () => {
  return (
    <div className="py-5 px-4 lg:mx-0">
      <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold text-slate-800 text-center md:py-4 py-4">
        How It Work Section
      </h1>
      <HowItIs />
    </div>
  );
};

export default HowIt;
