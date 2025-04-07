import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

const DonarTable = ({donar}) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto mt-4 mx-4 lg:mx-0">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm font-semibold">
              <th className="px-6 py-4 text-left">No</th>
              <th className="px-6 py-4 text-left">Donar Name</th>
              <th className="px-6 py-4 text-left">Donation Amount</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Donar Email</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {donar.map((person, idx) => (
              <tr
                key={person._id}
                className="hover:bg-gray-50 hover:border border-gray-200 transition duration-300"
              >
                <td className="px-6 py-4 text-gray-800">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {person.donorName}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  ৳{person.donationAmount}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {new Date(person.donationDate).toLocaleDateString("en-GB")}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {person.donorEmail}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {person.status === "Successful" ? (
                    <span className="text-green-600 flex items-center">
                      <FaCheckCircle className="mr-2" /> Successful
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center">
                      <FaTimesCircle className="mr-2" /> Pending
                    </span>
                  )}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonarTable;
