import React, { useContext, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import { AuthContext } from "../../Provider/Provider";

const AddCampaigns = () => {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  
  const handleForm = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const clothes = form.getAll("clothes");
    const userEmail = user.email;
    const finalData = {
      ...data,
      clothes,
      userEmail,
    };
    (finalData.startDate = startDate), (finalData.endDate = endDate);


    axios.post("https://backend-winter-aid.vercel.app/addCampaign", finalData).then((res) => {
      console.log(res.data);
      toast.success('Campaign successfully add.')
      navigate('/donation-campaigns')

    });
  };
  return (
    <section className="">
      {user.email === "log@gmail.com" && (
        <>
          <div className=" max-w-5xl mx-auto my-5 ">
            <form onSubmit={handleForm}>
              <h1 className="text-5xl font-bold text-center py-4">
                Add Campaign
              </h1>
              <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Create Campaign
                </h2>

                {/* <!-- Campaign Name --> */}
                <label className="block text-sm font-medium text-gray-700">
                  Campaign Name
                </label>
                <input
                  type="text"
                  id="campaign-name"
                  name="campaignName"
                  placeholder="Enter campaign name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {/* <!-- Campaign img --> */}
                <label className="block text-sm font-medium text-gray-700">
                  Campaign Thumbnail
                </label>
                <input
                  type="url"
                  id="campaign-name"
                  name="campaignImg"
                  placeholder="Enter campaign name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />

                {/* <!-- Campaign Description --> */}
                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Campaign Description
                </label>
                <textarea
                  id="campaign-description"
                  name="campaignDescription"
                  placeholder="Enter campaign details"
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>

                {/* <!-- Campaign Dates --> */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <DatePicker
                      className="border p-2 rounded-md w-full"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <DatePicker
                      className="border p-2 rounded-md w-full"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>
                </div>

                {/* <!-- Location --> */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Division Input */}
                    <input
                      type="text"
                      id="division"
                      name="division"
                      placeholder="Enter Division"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />

                    {/* District Input */}
                    <input
                      type="text"
                      id="district"
                      name="district"
                      placeholder="Enter District"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {/* Upazila Input */}
                    <input
                      type="text"
                      id="upazila"
                      name="upazila"
                      placeholder="Enter Upazila"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {/* village Input */}
                    <input
                      type="text"
                      id="village"
                      name="village"
                      placeholder="Enter Village"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* <!-- Minimum Donation Amount --> */}
                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Minimum Donation Amount
                </label>
                <input
                  type="number"
                  id="min-donation"
                  name="minDonation"
                  placeholder="Enter minimum donation amount"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />

                {/* <!-- Type of Clothes --> */}
                <label
                  htmlFor="type-of-clothes"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Type of Clothes
                </label>
                <select
                  id="type-of-clothes"
                  name="clothes"
                  multiple
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="Sweater">Sweater</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Gloves">Gloves</option>
                  <option value="Scarf">Scarf</option>
                  <option value="Muffler">Muffler</option>
                  <option value="Blanket">Blanket</option>
                  <option value="Woolen Sweater">Woolen Sweater</option>
                </select>

                {/* <!-- Target --> */}
                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Target
                </label>
                <input
                  type="number"
                  id="target"
                  name="target"
                  placeholder="Enter target quantity"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />

                {/* <!-- Submit Button --> */}
                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Campaign
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default AddCampaigns;
