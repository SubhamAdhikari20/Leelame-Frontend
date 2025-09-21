// frontend/src/layouts/Footer.jsx
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./../assets/leelame_logo2_cropped_png.png";


const Footer = ({ currentUser }) => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="bg-gray-900 text-gray-300">
                <div className="container mx-auto bg-gray-900 text-gray-300 px-4 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0  py-7">
                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <img
                                src={Logo}
                                alt="Leelame Logo"
                                width={75}
                                height={75}
                                className="rounded-full"
                            />
                        </Link>
                        <div className="text-center md:text-left">
                            <Link
                                to="/"
                                className="text-white text-2xl font-bold"
                            >
                                Leelame
                            </Link>
                            <p className="text-sm mt-1">
                                Your premium bidding solution
                            </p>
                        </div>
                    </div>
                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center space-x-6">
                        <Link to="/" className="hover:text-white text-sm">
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="hover:text-white text-sm"
                        >
                            Products
                        </Link>
                        {currentUser ? (
                            <Link
                                to="/my-bids"
                                className="hover:text-white text-sm"
                            >
                                My Bids
                            </Link>
                        ) : null}
                        <Link to="/blog" className="hover:text-white text-sm">
                            Blog
                        </Link>
                        <Link to="/about" className="hover:text-white text-sm">
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="hover:text-white text-sm"
                        >
                            Contact
                        </Link>
                    </div>
                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white cursor-pointer"
                        >
                            <FaFacebook size={20} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white cursor-pointer"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white cursor-pointer"
                        >
                            <FaInstagram size={20} />
                        </a>
                    </div>
                </div>
            </footer>
            <div className="sticky bottom-0 z-500 inset-x-0 bg-gray-900 text-gray-300 border-t border-gray-700 py-7">
                <p className="text-center text-xs sm:text-sm">
                    &copy; {currentYear} Leelame. All rights reserved.
                </p>
            </div>
        </>
    );
};

export default Footer;