import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";
import Slider from "./Slider";

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleStartAssessment = () => {
    if (user?.email) {
      navigate("/business-form");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 lg:py-12 py-8 px-4">
      {/* Banner Content */}
      <div
        className="flex flex-col justify-center text-center md:text-start lg:space-y-4 space-y-3"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <h1 className="md:text-6xl text-3xl font-garnett-extrabold text-[#000000]">
          <span className="text-[#6D828F]">NMCD.Inc</span>
        </h1>
        <p className="md:text-base text-sm font-poppins text-[#6D828F] leading-6">
          Welcome to the Business Assessment Tool. <br />
          Take the guesswork out of growing your business. <br /><br />
          NMCD Inc.’s Business Assessment Tool is designed to give entrepreneurs
          and small business owners a quick snapshot of where they currently
          stand—and what areas may need attention. Based on your responses,
          you'll receive a free personalized summary* highlighting key focus
          areas such as the business overview, operational efficiency,
          financial health, and more. <br /><br />
          Whether you're just starting out or looking to grow, this tool will
          help you identify strengths, uncover gaps, and gain clarity on your
          next steps. <br /><br />
          ✔️ Fast <br />
          ✔️ Free <br />
          ✔️ Insightful <br /><br />
          <i>
            *Your personalized snapshot includes a portion of your results. To
            unlock your full report and receive tailored recommendations, book a
            1:1 business assessment consultation.*
          </i>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
          <button
            onClick={handleStartAssessment}
            className="btn bg-[#6D828F] text-white text-lg font-poppins font-medium px-6 py-2 rounded"
          >
            Start Assessment
          </button>
          <a href="/footer">
            <button className="btn border border-[#6D828F] text-[#6D828F] text-lg font-poppins font-medium px-6 py-2 rounded hover:bg-[#6D828F] hover:bg-opacity-10">
              Book Your Full Report Session
            </button>
          </a>
        </div>
      </div>

      {/* Banner Slider */}
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
