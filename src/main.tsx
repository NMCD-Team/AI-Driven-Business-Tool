import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router.js"; // Import your routing configuration
import Provider from "./Provider/Provider.jsx"; // Global context provider for state management
import "react-datepicker/dist/react-datepicker.css"; // Import any additional CSS
import { Toaster } from "react-hot-toast"; // For toast notifications
import './fonts/fonts.css';

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
createRoot(rootElement).render(
  <StrictMode>
    <Provider>
      <div className="relative z-10 min-h-screen bg-cover bg-center backdrop-blur-lg bg-opacity-40">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-031.jpg")' }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-screen-xl mx-auto p-6">
          <RouterProvider router={router}></RouterProvider>
          <Toaster />

        </div>
      </div>
    </Provider>
  </StrictMode>
);