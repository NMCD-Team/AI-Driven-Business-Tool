import { createBrowserRouter, Form } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import Donations from "../Pages/Donations";
import Details from "../Pages/Details";
import DonateForm from "../Pages/DonateForm";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Private from "../private/Private";
import Dashboard from "../Pages/Dashboard";
import UpdateForm from "../Pages/UpdateForm";
import ErrorPage from "../Pages/ErrorPage";
import ForgetPass from "../Pages/ForgetPass";
import AddCampaigns from "../Pages/add_campain/AddCampaigns";
import MyCampaigns from "../Pages/MyCampaigns/MyCampaigns";
import DonationHistory from "../Pages/DonationHistory/DonationHistory";
import DonarList from "../Pages/Donar/DonarList";
import UpdateCampaign from "../Pages/updatePage/UpdateCampaign";
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
        path: "/donation-campaigns",  
        element: <Donations></Donations>,
      },
      {
        path: "/campaignDetail/:id",
        element: <Private><Details></Details></Private>,
        loader:({params}) => fetch(`https://backend-winter-aid.vercel.app
/campaign/${params.id}`)
      },
      {
        path:'/auth/register',
        element:<Register></Register>
      },
      {
        path:'/auth/login',
        element:<Login></Login>
      },
      {
        path: '/dashboard',
        element: <Private><Dashboard></Dashboard></Private>,
      },
      {
        path: '/update-profile',
        element: <Private><UpdateForm></UpdateForm></Private>
      },
      {
        path: '/forgetPassword',
        element: <ForgetPass></ForgetPass>
      },
      // ! add my final project 
      {
        path: '/add-campaign',
        element: <Private><AddCampaigns></AddCampaigns></Private>
      },
      {
        path: '/myCampaigns',
        element: <Private><MyCampaigns></MyCampaigns></Private> 
      },
      {
        path: '/DonationHistory',
        element: <Private><DonationHistory></DonationHistory></Private> 
      },
      {
        path: '/DonarList/:id',
        element: <DonarList></DonarList>
      },
      {
        path: '/update/:id',
        element: <UpdateCampaign></UpdateCampaign>,
        loader: ({params})=> fetch(`https://backend-winter-aid.vercel.app
/campaign/${params.id}`)
      },
    ],
  },
  {

  },
]);

export default router;
