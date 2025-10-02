// frontend/src/router/PublicRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ currentUser }) => {
    // if (currentUser) {
    //     return <Navigate to={`/${currentUser.username}`} replace />;
    // }

    return <Outlet />;
};

export default PublicRoute;