import React from "react";
import "../fonts/fonts.css"; // Make sure this points to your actual fonts setup

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow max-w-6xl mx-auto py-12 px-6">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-garnett-extrabold mb-10 text-center text-black">
          About Us
        </h1>

        {/* Who We Are */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-poppins text-[#000000] mb-3">
            Who We Are
          </h2>
          <p className="text-lg font-poppins text-[#6D828F] leading-relaxed">
            NMCD Inc. (Nik-Keisha Moodie Coaching & Development) is a coaching and development consultancy rooted in purpose, empowerment, and equity. We specialize in supporting entrepreneurs, small business owners, and underrepresented leaders as they build sustainable and profitable ventures.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-poppins text-[#000000] mb-3">
            Our Mission
          </h2>
          <p className="text-lg font-poppins text-[#6D828F] leading-relaxed">
            To equip and empower entrepreneurs—especially those from marginalized communities—with the tools, strategy, and support needed to grow and scale their businesses.
          </p>
        </section>

        {/* What Sets Us Apart */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-poppins text-[#000000] mb-3">
            What Sets Us Apart
          </h2>
          <ul className="list-disc list-inside text-lg font-poppins text-[#9AA7B2] leading-relaxed">
            <li>Community-focused, purpose-driven</li>
            <li>Holistic business and financial coaching</li>
            <li>A digital ecosystem built for long-term growth</li>
            <li>Inclusive programs and culturally relevant resources</li>
          </ul>
        </section>

        {/* Meet the Founder */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-poppins text-[#000000] mb-6">
            Meet the Founder
          </h2>

          {/* Text */}
          <p className="text-lg font-poppins text-[#6D828F] leading-relaxed mb-6">
            Nik-Keisha Moodie is a Strategic Business & Finance Consultant with a passion for entrepreneurship, education, and economic empowerment. With years of experience coaching and mentoring startups and small businesses, she created NMCD Inc. to build a space where innovation, strategy, and support meet.
          </p>

          {/* Image */}
          <div className="w-full flex justify-center">
            <img
              src="/assets/IMG_9822.jpg"
              alt="Nik-Keisha Moodie"
              className="w-full max-w-md h-auto object-cover rounded-2xl shadow-lg border-4 border-[#FFE712]"
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-[#B9B8AF] text-sm font-poppins">
        NMCD Inc. All rights reserved.
      </div>
    </div>
  );
};

export default About;
