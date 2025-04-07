import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/Provider';
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { userLogin, userGoogleLogin, setEmail } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  // Handle form submission
  const handleForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    userLogin(email, password)
      .then(result => {
        // Redirect to /landing-page after login
        navigate('/landing-page');
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    userGoogleLogin()
      .then(result => {
        // Redirect to /landing-page after Google login
        navigate('/landing-page');
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  // Forget password logic
  const forgetPassword = () => {
    setEmail(inputValue);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full md:max-w-lg max-w-sm rounded-lg py-10 shrink-0 shadow-2xl shadow-sky-300 border border-sky-200 my-4">
        <h2 className="text-2xl font-semibold text-center">
          Login your account
        </h2>
        <form onSubmit={handleForm} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={(e) => setInputValue(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <button>
                <Link onClick={forgetPassword} to={'/forgetPassword'} className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </button>
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-ghost bg-sky-500 text-white hover:text-slate-950">Login</button>
          </div>
        </form>
        <h2 className="font-normal text-center">
          Don’t Have An Account?{" "}
          <Link className="text-sky-500" to={"/auth/register"}>
            Register
          </Link>
        </h2>
        <button onClick={handleGoogleSignIn} className="btn w-56 mx-auto mt-4">
          <span className="text-2xl"><FcGoogle /></span> login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
