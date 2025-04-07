import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router.jsx";
import Provider from "./Provider/Provider.jsx";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <div className="max-w-6xl mx-auto">
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </div>
    </Provider>
  </StrictMode>
);
