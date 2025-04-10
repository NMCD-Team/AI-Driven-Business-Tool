import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  // console.log(user);
  const Links = (
    <>

      <Link to={"/"} className="btn btn-ghost lg:text-base font-medium mr-2">
        Home
      </Link>

      <Link
        to={"/about-us"}
        className="btn btn-ghost lg:text-base font-medium mr-2">
        About Us
      </Link>

      <Link to={"/Footer"} className="btn btn-ghost lg:text-base font-medium mr-2">
        Contact US
      </Link>

    </>
  );
  return (
    <div className=" text-slate-900 px-2">
      <div className="navbar border rounded-br-xl rounded-bl-xl  max-w-6xl mx-auto h-12">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {Links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <img className="size-12" src="/assets/logo.png" alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>
        <div className="navbar-end">
          {user && user.email ? (
            <>
             
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  
                </ul>
              </div>
              <button onClick={userLogout} className="btn ml-4">
                logout
              </button>
            </>
         ) : (
          <div className="flex gap-2">
            <Link to={"/auth/login"} className="btn btn-outline">
              Login
            </Link>
            <Link to={"/auth/register"} className="btn btn-outline">
              Register
            </Link>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
