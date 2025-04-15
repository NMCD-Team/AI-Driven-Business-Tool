import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";
import toast from "react-hot-toast";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { userRegister, UpdateUserProfile, userGoogleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShowPass = () => setShow(!show);
  const handleSubmit = (e) => {
    e.preventDefault();
    // get from data
    const from = new FormData(e.target);
    const name = from.get("name");
    const photo = from.get("photo");
    const email = from.get("email");
    const password = from.get("password");

    userRegister(email, password)
      .then((result) => {
        navigate('/');
        UpdateUserProfile({ displayName: name, photoURL: photo })
          .then((result) => {
            // console.log(result);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
        // console.log(err.message);
      });

  };

  const handleGoogleSignIn = ()=>{
    userGoogleLogin()
    .then(result =>{
        navigate(location?.state ? location.state : '/')
        // console.log(result.user)
    })
    .catch(err =>{
        toast.error(err.message)
        // console.log(err.message)
    })
}
  return (
    <div className="min-h-screen flex justify-center my-10 items-center ">
      <div className="card bg-base-100 w-full md:max-w-lg max-w-sm rounded-lg py-10 shrink-0 shadow-2xl shadow-sky-300 border border-sky-200">
        <h2 className="text-2xl font-semibold text-center">
          Register your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control ">
            <label className="label" htmlFor="name">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered"
              required
            />
          </div>
        
          <div className="form-control ">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <button
              onClick={handleShowPass}
              type="button"
              className="text-xl cursor-pointer absolute top-12 right-5"
            >
              {show ? <IoEye /> : <IoMdEyeOff />}
            </button>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-ghost bg-sky-500  text-white hover:text-slate-950">
              Register
            </button>
          </div>
        </form>
        <h2 className="font-normal text-center">
          Already Have an account ? 
          <Link className="text-sky-500" to={"/auth/login"}>
            Login
          </Link>
        </h2>
        {/*<button onClick={handleGoogleSignIn} className="btn w-56 mx-auto mt-4">
          <span className="text-2xl flex items-center gap-2">
            <FcGoogle />
            <span>Register with Google</span>
          </span>
        </button>*/}
      </div>
    </div>
  );
};

export default Register;
