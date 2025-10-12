// frontend/src/layouts/ProfileLayout.jsx
import React from "react";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";


const ProfileLayout = ({ currentUser }) => {
    return (
        <div className="container mx-auto px-5 py-10 flex gap-10 flex-col md:flex-row">
            {/* Sidebar Section */}
            <Sidebar currentUser={currentUser} />

            {/* Main Content */}
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default ProfileLayout;