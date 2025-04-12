import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to our platform! We are dedicated to helping those in need through various donation campaigns and community-driven projects. Our goal is to bring people together and make a meaningful impact in the lives of others.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          This platform allows donors to contribute to verified causes, while volunteers and organizers can set up campaigns with ease. Transparency, trust, and impact are at the heart of what we do.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Whether you are here to donate, create a campaign, or simply learn more about how we operate—thank you for being part of our journey.
        </p>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-gray-500 text-sm">
        NMCD.Inc. All rights reserved.
      </div>
    </div>
  );
};

export default About;
