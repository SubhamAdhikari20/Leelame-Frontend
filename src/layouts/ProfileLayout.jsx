// frontend/src/layouts/ProfileLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";


const ProfileLayout = ({ currentUser }) => {
    return (
        <>
            <Navbar currentUser={currentUser} />
            <main className="min-h-[90vh] bg-gray-100 dark:bg-background text-gray-900 dark:text-foreground transition-colors duration-300">
                <section className="container mx-auto px-5 py-10 flex gap-10 flex-col md:flex-row">
                    {/* Sidebar Section */}
                    <Sidebar currentUser={currentUser} />

                    {/* Main Content */}
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </section>
            </main>
            {/* <Footer currentUser={currentUser} /> */}
        </>
    );
};

export default ProfileLayout;