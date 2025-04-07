import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import HistoryTable from "./tableformat/HistoryTable";
import HistoryCart from "./cartformat/HistoryCart";
import Lottie from "lottie-react";
import NoData from "../../../public/assets/animation/noData.json";
import { AuthContext } from "../../Provider/Provider";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    axios
      .get(`https://backend-winter-aid.vercel.app
/allDonations`)
      .then((res) => {
        //   setDonations(res.data);
        const donationData = res.data;
        const filtered = donationData.filter(
          (item) => item.isDelete !== true && item.userEmail === user.email);
        setDonations(filtered);
      });
  }, []);

  // console.log(donations);

  const handleHistoryDelete = (id) => {
    axios
      .patch(`https://backend-winter-aid.vercel.app/historyDelete/${id}`)
      .then((res) => {
        // console.log(res.data);
        const remainingData = donations.filter((item) => item._id !== id);
        setDonations(remainingData);
        toast.success("History cleared successfully! ✅🗑️");
      });
  };

  const toastModi = (id) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleHistoryDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h2 className="text-2xl py-6 font-bold mb-4 text-gray-700 text-center">
        Donation History
      </h2>
      {donations.length === 0 ? (
        <div className="text-center mx-auto py-4 max-w-xl">
          <Lottie animationData={NoData}></Lottie>
        </div>
      ) : (
        <>
          <div className="hidden lg:flex w-full min-h-[calc(100vh-200px)]">
            <HistoryTable
              donations={donations}
              toastModi={toastModi}
            ></HistoryTable>
          </div>
          <div className="md:flex lg:hidden in-h-[calc(100vh-200px)]">
            <HistoryCart
              donations={donations}
              toastModi={toastModi}
            ></HistoryCart>
          </div>
        </>
      )}
    </div>
  );
};

export default DonationHistory;
