import React, { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import toast from "react-hot-toast";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const ForgetPass = () => {

    const {user, userForgePassword, email} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleForm = (e) =>{
        e.preventDefault()
        const email = e.target.inputEmail.value;
        userForgePassword(email)
        .then(()=>{
          window.open("https://mail.google.com/mail/u/0/#inbox", "_blank")
          e.target.reset()
        })
        .catch(error =>{
            toast.error(error.message)
        })
        e.target.reset()
    }

  return (
    <div>
        <h2 className="text-2xl my-10 font-semibold text-center">
          Forget Your Password
        </h2>
      <div className="card mx-auto my-4 border bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleForm} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="inputEmail"
              placeholder="email"
              defaultValue={email}
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

export default ForgetPass;
