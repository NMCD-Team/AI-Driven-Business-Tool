import React from "react";
import Slider from "./Slider";

const Banner: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 lg:py-12 py-8 px-4">
      {/* banner content */}
      <div
        className="flex flex-col justify-center text-center md:text-start lg:space-y-4 space-y-3"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <h1 className="md:text-6xl text-3xl font-bold text-slate-700">
          <span className="text-sky-500">NMCD</span>
        </h1>
        <p className="md:text-base text-sm font-medium leading-6 text-slate-500">
          Smart insights to help small businesses plan better, forecast
          accurately, and stay ahead of the competition. Make confident decisions
          with data-driven strategies tailored just for you.
        </p>

        <div>
          <a href="/auth/login">
            <button className="btn bg-sky-500 text-white text-lg font-medium">
              Try it now
            </button>
          </a>
        </div>
      </div>

      {/* banner slider */}
      <div
        className="md:w-1/2 w-full"
        data-aos="zoom-in"
        data-aos-duration="3000"
      >
        <Slider />
      </div>
    </div>
  );
};

export default Banner;
