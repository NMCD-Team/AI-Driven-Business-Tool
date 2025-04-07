import React from "react";

const About = () => {
  return (
    <div className="border-t-2 border-b-2 my-8 px-4 lg:px-0">
      <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold text-slate-800 text-center md:py-12 py-4">
        About Us
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14 px-4">
        <div
          className="p-6 max-w-xl md:mx-auto border rounded-xl space-y-2 shadow-lg shadow-sky-200"
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1500"
        >
          <img className="size-20" src="/assets/target.png" alt="" />
          <h3 className="text-2xl font-bold text-slate-800">Our mission</h3>
          <p className="text-base font-normal text-slate-600">
            To connect donors with volunteers, providing winter clothing to
            vulnerable communities across Bangladesh and ensuring warmth for
            everyone in need.
          </p>
        </div>
        <div className="p-6 border rounded-xl max-w-xl md:mx-auto space-y-2 shadow-lg shadow-sky-200 " data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1500">
          <img
            className="size-20"
            src="/assets/light-bulb.png"
            alt=""
          />
          <h3 className="text-2xl font-bold text-slate-800">Our vision</h3>
          <p className="text-base font-normal text-slate-600">
            To build a compassionate society where no one faces winter without
            dignity and comfort, using technology to bridge the gap between
            generosity and need.
          </p>
        </div>
        <div className="p-6 border rounded-xl max-w-xl md:mx-auto space-y-2 shadow-lg shadow-sky-200" data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1500">
          <img
            className="size-20"
            src="/assets/contribution.png"
            alt=""
          />
          <h3 className="text-2xl font-bold text-slate-800">Contribution</h3>
          <p className="text-base font-normal text-slate-600">
            Users can contribute by donating warm clothes, volunteering to
            distribute them, spreading awareness, and sharing feedback to
            improve the platform. Together, we can bring warmth to those in
            need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
