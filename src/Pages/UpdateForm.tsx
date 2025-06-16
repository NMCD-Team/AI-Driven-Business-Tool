import React, { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Importing toast

const UpdateForm = () => {
  const { UpdateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const updateProfile = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    UpdateUserProfile({ displayName: name, photoURL: photo })
      .then((result) => {
        toast.success("Profile updated successfully!");
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.message); // Show error message if update fails
      });
  };

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h2 className="text-2xl py-4 font-semibold text-center">Update Your Profile</h2>
      <div className="card bg-base-100 border w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={updateProfile} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Your Photo URL"
              name="photo"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
