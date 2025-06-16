import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Provider/Provider"

interface PrivateProps {
    children: ReactNode;
}

const Private: React.FC<PrivateProps> = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    const hasJwtToken = !!localStorage.getItem("accessToken");

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    if ((user && user.email) || hasJwtToken) {
        return <>{children}</>;
    }

    return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default Private;
