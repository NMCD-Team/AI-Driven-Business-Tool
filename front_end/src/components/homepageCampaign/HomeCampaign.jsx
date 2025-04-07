{/*import axios from "axios";
import React, { useEffect, useState } from "react";
import Donation from "../Donation";
import { Link } from "react-router-dom";

const HomeCampaign = () => {
  const [campaign, setCamping] = useState([]);

  useEffect(() => {
    axios.get(`https://backend-winter-aid.vercel.app
/sort`).then((res) => {
      setCamping(res.data.slice(0, 6));
    });
  });
  return (
    <div>
      <h1 className=" md:text-4xl text-3xl font-bold text-slate-800 text-center md:py-12 py-4">
        Latest Campaign
      </h1>
      <div className="">
        {campaign.length > 0 ? (
          <div className="grid px-4 lg:px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaign.map((item) => (
              <Donation key={item._id} item={item}></Donation>
            ))}
            <Link to={'/donation-campaigns'}><button className="btn text-center btn-info text-white">View All</button></Link>
          </div>
        ) : (
          <p className="text-4xl font-bold text-center">no data</p>
        )}
      </div>

       
    </div>
  );
};

export default HomeCampaign; */}
