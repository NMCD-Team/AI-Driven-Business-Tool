import React, { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center  min-h-screen">
        <h1 className="md:text-4xl text-2xl text-slate-700 font-bold py-10">
          Welcome, <span className="text-sky-500">{user?.email}</span>
        </h1>
      <div className="card bg-base-100 border w-full max-w-sm  shadow-xl shadow-gray-300">
        <figure>
          <div className="avatar pb-4 pt-6">
            <div className="ring-info ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src={user?.photoURL}/>
            </div>
          </div>
        </figure>
            <div className="divider px-4 divider-info my-0 "></div>
        <div className="card-body py-4 items-center">
          <h2 className="card-title">name:{user?.displayName}</h2>
          <p>Email: {user?.email}</p>
          <div className="card-actions justify-center">
            <Link to={'/update-profile'} className="btn bg-sky-400 text-slate-950 ">Update</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
