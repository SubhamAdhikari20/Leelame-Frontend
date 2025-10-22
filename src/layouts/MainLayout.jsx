// frontend/src/layouts/MainLayout.jsx
import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";


const MainLayout = ({ currentUser }) => {
    return (
        <>
            <Navbar currentUser={currentUser} />
            <main className="bg-[size:20px_20px] min-h-[90vh] bg-gray-100 dark:bg-background text-gray-900 dark:text-foreground transition-colors duration-300">
                <Outlet />
            </main>
            <Footer currentUser={currentUser} />
        </>
    );
};

export default MainLayout;