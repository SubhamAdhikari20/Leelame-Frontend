// frontend/src/layouts/MainLayout.jsx
import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";


const MainLayout = ({ currentUser }) => {
    return (
        <>
            <Navbar currentUser={currentUser} />
            <main className="min-h-screen bg-[size:20px_20px]">
                <Outlet />
            </main>
            <Footer currentUser={currentUser} />
        </>
    );
};

export default MainLayout;