import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DonarTable from "./DonarTable/DonarTable";
import Lottie from "lottie-react";
import NoData from "../../../public/assets/animation/noData.json";

const DonarList = () => {
  const [donar, setDonar] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://backend-winter-aid.vercel.app/donar/${id}`
      )
      .then((res) => {
        setDonar(res.data);
        //   console.log(res.data);
      });
  }, []);

  return (
    <div>
      {donar.length === 0 ? (
        <div className="text-center mx-auto py-4 max-w-xl">
          <Lottie animationData={NoData}></Lottie>
        </div>
      ) : (
        <DonarTable donar={donar}></DonarTable>
      )}
    </div>
  );
};

export default DonarList;
