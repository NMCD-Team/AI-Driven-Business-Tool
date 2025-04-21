import React, { useContext } from 'react';
import { AuthContext } from '../Provider/Provider';
import { Navigate, useLocation } from 'react-router-dom';

const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show a loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  // If the user is authenticated, render children
  if (user && user?.email) {
    return children;
  }

  // If the user is not authenticated, redirect to the login page
  return (
    <Navigate
      to="/auth/login"
      state={{ from: location }}
    />
  );
};

export default Private;
