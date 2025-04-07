{/*import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";

const Donation = ({ item }) => {
  const {
    _id,
    campaignName,
    campaignDescription,
    campaignImg,
    division,
    district,
    upazila,
    village,
    endDate,
    startDate,
    minDonation,
  } = item;

  const currentDate = new Date();
  const campaignEndDate = new Date(endDate);
  const isCampaignOngoing = campaignEndDate >= currentDate;

  return (
    <div
      key={item._id}
      className="lg:max-w-sm md:max-w-xs bg-white border border-indigo-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" data-aos="fade-up"
      data-aos-easing="ease-in-sine"
      data-aos-duration="1500"
    >
      <div className=" h-44 w-full mx-auto ">
        <img
          className="rounded-t-lg h-full w-full object-cover"
          src={campaignImg}
          alt=""
        />
      </div>
      <div className="p-5">
        <div
          className={`p-1 w-36 text-center mb-3 rounded-full text-xs font-semibold ${
            isCampaignOngoing
              ? "bg-green-100 text-green-700" // Ongoing campaign styles
              : "bg-red-100 text-red-700" // Ended campaign styles
          }`}
        >
          {isCampaignOngoing ? "Campaign Ongoing" : "Campaign Ended"}
        </div>
        <a href="#">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {campaignName}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center ">
          <span className="text-2xl font-bold text-sky-600">
            <MdLocationOn />
          </span>
          <span className="text-sm text-gray-500 font-semibold ">
            {upazila}, {village}
          </span>
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xl font-medium flex items-center">
            {minDonation}
            <TbCurrencyTaka />
          </p>
          <Link to={`/campaignDetail/${item._id}`}>
            <button
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-600 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Details
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Donation;
*/}