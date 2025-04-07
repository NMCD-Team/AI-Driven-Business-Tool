import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiDelete } from "react-icons/fi";
import { FaRegPenToSquare } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get(`https://backend-winter-aid.vercel.app/allCampaign`).then((res) => {
      setCampaigns(res.data);
    });
  }, []);
  // console.log(campaigns);

  const handleDelete = (id) => {
    axios.delete(`https://backend-winter-aid.vercel.app/item/delete/${id}`).then((res) => {
      // console.log(res.data);
      const remainingData = campaigns.filter((item) => item._id !== id);
      setCampaigns(remainingData);
      toast.success('successfully deletion.')
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
              handleDelete(id);
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
    <div className="max-w-6xl mx-auto">
      <div className="overflow-x-auto py-12 ">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="border ">
              <th className=" px-4 py-2 text-sm font-semibold text-gray-700 text-center">
                No
              </th>
              <th className=" px-4 py-2 text-sm font-semibold text-gray-700 text-center">
                Campaign Name
              </th>
              <th className=" px-4 py-2 text-sm font-semibold text-gray-700 text-center">
                Location
              </th>
              <th className=" px-4 py-2 text-sm font-semibold text-gray-700 text-center">
                Date
              </th>
              <th className=" px-4 py-2 text-sm font-semibold text-gray-700 text-center">
                Donors Count
              </th>
              <th className=" px-4 py-2 text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((item, idx) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 mb-2 rounded-lg lg:rounded-none border"
              >
                <td className="px-4 py-2 text-base text-gray-800 text-center border">
                  {idx + 1}
                </td>
                <td className="px-4 py-2 text-sm text-blue-600 text-start border max-w-64 ">
                  <Link to={`/campaignDetail/${item._id}`}>
                    {item.campaignName && item.campaignName.slice(0, 50)}
                  </Link>
                </td>
                <td className="px-4 py-2 text-base text-gray-800  ">
                  {item.division}, {item.district}, {item.upazila}
                </td>
                <td className="px-4 py-2 text-base text-gray-800 text-center border">
                  {new Date(item.startDate).toLocaleDateString("en-GB")} -{" "}
                  {new Date(item.endDate).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-2 text-base text-gray-800 text-center border ">
                  <p>{item.donarCount ? item.donarCount : 0}</p>
                  <Link to={`/DonarList/${item._id}`}>
                    <button className="text-xs text-blue-600 underline">
                      view all
                    </button>
                  </Link>
                </td>
                {/* <td className="px-4 py-2 text-base text-gray-800 text-center border">
                  {item.donationsCount ? item.donationsCount : 0}
                  </td> */}
                <td className="px-4 py-2 text-base text-gray-800 text-center  flex lg:flex-row md:flex-col items-center justify-center gap-4 ">
                  <Link to={`/update/${item._id}`}>
                    <button className="btn text-xl">
                      <FaRegPenToSquare />
                    </button>
                  </Link>
                  <button
                    onClick={() => toastModi(item._id)}
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

export default MyCampaigns;

{
  /* <Table>
          <Thead className="bg-gray-100">
            <Tr>
              <Th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">
                Campaign Name
              </Th>
              <Th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">
                Location
              </Th>
              <Th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">
                Date
              </Th>
              <Th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">
                Total Contributors
              </Th>
              <Th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">
                Donation Records
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {campaigns.map((item) => (
              <Tr
                key={item._id}
                className="hover:bg-gray-50 mb-2 rounded-lg lg:rounded-none"
              >
                <Td className="px-4 py-2 text-base text-gray-800">
                  {item.campaignName}
                </Td>
                <Td className="px-4 py-2 text-base text-gray-800">
                  {item.division}, {item.district}, {item.upazila}
                </Td>
                <Td className="px-4 py-2 text-base text-gray-800">
                  {new Date(item.startDate).toLocaleDateString("en-GB")} -{" "}
                  {new Date(item.endDate).toLocaleDateString("en-GB")}
                </Td>
                <Td className="px-4 py-2 text-base text-gray-800">
                  {item.totalContributors ? item.totalContributors : 0}
                </Td>
                <Td className="px-4 py-2 text-base text-gray-800">
                  {item.donationsCount ? item.donationsCount : 0}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table> */
}
