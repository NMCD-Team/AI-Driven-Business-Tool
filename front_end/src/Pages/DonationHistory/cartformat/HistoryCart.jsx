import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";

const HistoryCart = ({ donations, toastModi }) => {
  return (
    <div className="w-full ">
      <div className=" grid grid-cols-1 md:grid-cols-2  place-items-center gap-4 mx-4">
        {donations.map((item) => (
          <div
            key={item._id}
            className="block lg:max-w-sm  w-full  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-base font-bold tracking-tight text-blue-600 dark:text-white">
              <Link to={`/campaignDetail/${item.itemId}`}>
                {item.campaignName && item.campaignName.slice(0, 50)}
              </Link>
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <span className="font-bold">Donation Amount : ৳</span>{" "}
              {item.donationAmount}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <span className="font-bold">Date: </span>
              {new Date(item.donationDate).toLocaleDateString("en-GB")}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <span className="font-bold">Location: </span>
              location
            </p>

            <p className="font-normal text-gray-700 dark:text-gray-400 flex gap-4">
              <span className="font-bold">Status: </span>
              {item.status === "Successful" ? (
                <span className="text-green-600 flex items-center">
                  <FaCheckCircle className="mr-2" /> Successful
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <FaTimesCircle className="mr-2" /> Pending
                </span>
              )}
            </p>

            <p className="font-normal text-gray-700 dark:text-gray-400 text-right">
              <button
                onClick={() => toastModi(item._id)}
                className="btn text-xl text-red-600"
              >
                <FiDelete />
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryCart;
