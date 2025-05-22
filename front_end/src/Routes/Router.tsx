import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Private from "../private/Private";
import ErrorPage from "../Pages/ErrorPage";
import ForgetPass from "../Pages/ForgetPass";
import Footer from "../components/Footer";
import BusinessForm from "../components/BusinessFrom"; // import BusinessForm

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
        path: "/business-form", // Route for BusinessForm
        element: <Private><BusinessForm /></Private>, // Protect with Private route
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
