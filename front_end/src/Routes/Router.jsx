import { createBrowserRouter, Form } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Private from "../private/Private";
import ErrorPage from "../Pages/ErrorPage";
import LandingPage from "../Pages/LandingPage";
import Footer from "../components/Footer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/Footer",  
        element: <Footer></Footer>,
      },
      {
        path: "/landing-page",
        element: <Private><LandingPage /></Private>,
      },

      {
        path: "/about-us",  
        element: <About></About>,
      },
      
      {
        path:'/auth/register',
        element:<Register></Register>
      },
      {
        path:'/auth/login',
        element:<Login></Login>
      },
     
    ],
  },
  {

  },
]);

export default router;
