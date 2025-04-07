import React, { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import { useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const { UpdateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate()
  const updateProfile = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    UpdateUserProfile({ displayName: name, photoURL: photo })
      .then((result) => {
        navigate("/dashboard");
        // console.log(result);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h2 className="text-2xl py-4 font-semibold text-center">
        Update Your Profile
      </h2>
      <div
        class="card bg-base-100 border  w-full max-w-sm shrink-0 
      shadow-2xl"
      >
        <form onSubmit={updateProfile} class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Photo URl</span>
            </label>
            <input
              type="text"
              placeholder="Your Photo url."
              name="photo"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
