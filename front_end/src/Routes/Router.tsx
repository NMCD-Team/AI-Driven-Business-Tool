import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout.js";
import Home from "../Pages/Home.js";
import About from "../Pages/About.js";
import Register from "../Pages/Register.jsx";
import Login from "../Pages/Login.js";
import Private from "../private/Private.js";
import ErrorPage from "../Pages/ErrorPage.js";
import ForgetPass from "../Pages/ForgetPass.js";
import LandingPage from "../Pages/LandingPage.js";
import Footer from "../components/Footer.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/landing-page",
        element: <Private><LandingPage /></Private>,
      },
      {
        path: "/Footer",
        element: <Footer />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/forgetPassword",
        element: <ForgetPass />,
      },
    ],
  },
]);

export default router;
