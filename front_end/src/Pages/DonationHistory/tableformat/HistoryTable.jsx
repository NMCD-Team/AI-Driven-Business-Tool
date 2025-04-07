import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";

const HistoryTable = ({ toastModi, donations }) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto mt-4 mx-4 lg:mx-0">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm font-semibold">
              <th className="px-6 py-4 text-left">Campaign Name</th>
              <th className="px-6 py-4 text-left">Donation Amount</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr
                key={donation._id}
                className="hover:bg-gray-50 hover:border border-gray-200 transition duration-300"
              >
                <td className="px-4 py-2 text-sm text-blue-600 text-start  max-w-64 ">
                  <Link to={`/campaignDetail/${donation.itemId}`}>
                    {donation.campaignName && donation.campaignName.slice(0, 50)}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-800">
                  ৳{donation.donationAmount}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {new Date(donation.donationDate).toLocaleDateString("en-GB")}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {donation.district},{donation.upazila}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {donation.status === "Successful" ? (
                    <span className="text-green-600 flex items-center">
                      <FaCheckCircle className="mr-2" /> Successful
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center">
                      <FaTimesCircle className="mr-2" /> Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  <button
                    onClick={() => toastModi(donation._id)}
                    className="btn text-xl"
                  >
                    <FiDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
