import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router.js"; // Import your routing configuration
import Provider from "./Provider/Provider.tsx"; // Global context provider for state management
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
      <div className="max-w-6xl mx-auto"> {/* Wrapper div with centered layout */}
        <RouterProvider router={router}></RouterProvider> {/* Router setup */}
        <Toaster /> {/* Toast notifications */}
      </div>
    </Provider>
  </StrictMode>
);
