import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaDonate } from "react-icons/fa";
import { useLoaderData, useSearchParams } from "react-router-dom";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

const Details = () => {
  const campaign = useLoaderData();
  // const isCampaignOngoing = campaignEndDate >= currentDate;

  const handleDonate = () =>{
    const currentDate = new Date();
    const campaignEndDate = new Date(campaign.endDate);
 
    if (campaignEndDate < currentDate) {
      toast.error("The campaign has ended.");
      return; 
    } else {
      document.getElementById("my_modal_1").showModal();
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Campaign Header */}
      <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden">
        <img
          src={campaign.campaignImg}
          alt={campaign.campaignName}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {campaign.campaignName}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(campaign.startDate).toLocaleDateString("en-GB")} -{" "}
            {new Date(campaign.endDate).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>

      {/* Campaign Details */}
      <div className="bg-gray-100 mt-6 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Campaign Details
        </h2>
        <p className="text-gray-700">{campaign.campaignDescription}</p>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Location</h3>
          <p className="flex items-center mt-2 text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-gray-500" />
            {`${campaign.division}, ${campaign.district}, ${campaign.upazila}, ${campaign.village}`}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Target</h3>
          <p className="text-gray-600">
            Donate at least {campaign.target} items.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Clothes Needed</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {campaign.clothes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Donation Section */}
      <div className="bg-gray-200 mt-6 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Ready to Donate?
        </h2>
        <p className="text-gray-600">
          Minimum Donation Amount: ৳{campaign.minDonation}
        </p>
        <button onClick={handleDonate} className="mt-4 w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center justify-center shadow hover:bg-blue-600">
          <FaDonate className="mr-2" />
          Donate Now
        </button>
        <Modal id={campaign._id}></Modal>
      </div>
    </div>
  );
};

export default Details;
