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
    <div>
      <div className="flex flex-col md:flex-row gap-4 lg:py-12 py-8 px-0 mx-0 w-full">
        {/* Banner Content */}
        <div
          className="flex flex-col justify-center text-center md:text-start lg:space-y-4 space-y-3 w-full"
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
          data-aos-duration="2000"
        >
          <Slider />
        </div>
      </div>

      {/* New Testimonials Section */}
      <section className="bg-gray-100 py-12 mt-12">
        <div className="max-w-screen-xl mx-auto text-center px-6">
          <h3 className="text-3xl font-semibold text-gray-800 mb-8" data-aos="fade-up" data-aos-duration="1500">
            What Our Clients Say
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Telisa Made It / Mioko Humphrey",
                quote: "I was excited to book a Discovery Call with Nikki to get some insight on my situation. We covered a lot of ground and she addressed my questions/concerns with ease. I feel confident about developing a better understanding when it comes to managing my finances with her guidance. I look forward to our upcoming coaching sessions!"
              },
              {
                name: "Kii Moments Photography",
                quote: "Honest and genuine about the information you share. You are direct and to the point which helps with clarity on both ends. I feel the passion you have for your clients and community and am excited to work with you in the future!"
              },
              {
                name: "Shar Bennett",
                quote: "My discovery call with Niki exceeded my expectations. Niki was professional, organized and detail-oriented. The session flowed efficiently and did not feel rushed. She ensured that all requested topics were discussed in length and helped me set a clear plan for growing my business efficiently to the next level. I will definitely continue to work with her as a coach and valued advisor."
              },
              {
                name: "Michael Flemming",
                quote: "Nikki is definitely a coach you want on your team. Very knowledgeable and truly understands the business and finance landscape. She really puts into perspective how you can move forward in your business journey. I am very happy to have someone alongside me to help on this journey."
              },
              {
                name: "DonnaB’s - Cyshea Evans",
                quote: "Working with Nik-keisha has been very inspiring and rewarding. She is open, welcoming, understanding, and relatable. She thinks on the spot, is very concise, and passionate about what she does. It’s truly an honor and privilege sharing my journey with Nikki and her community."
              },
              {
                name: "Aisha Larchie",
                quote: "Nikki is great! She has a way of putting you at ease while also helping you better understand your situation. She made me feel comfortable enough to share and passed no judgments. I was actually able to get the clarity I needed to feel empowered in my next steps! Thank you, Nikki, you helped me find peace of mind again."
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <p className="italic text-lg text-gray-600">"{testimonial.quote}"</p>
                <p className="mt-4 text-gray-800 font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
