// frontend/src/components/Footer.jsx
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = ({ currentUser }) => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0 py-7">
                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <img
                                src="images/leelame_logo2_cropped_png.png"
                                alt="Leelame Logo"
                                width={75}
                                height={75}
                                className="rounded-full"
                            />
                        </Link>
                        <div className="text-center md:text-left">
                            <Link
                                to="/"
                                className="text-gray-800 dark:text-gray-300 text-2xl font-bold"
                            >
                                Leelame
                            </Link>
                            <p className="text-sm mt-1">
                                Your premium bidding solution
                            </p>
                        </div>
                    </div>
                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center md:space-x-6 space-x-3 text-gray-500 dark:text-gray-300">
                        <Link to="/" className="hover:text-foreground dark:hover:text-foreground md:text-sm text-[12.5px]">
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="hover:text-foreground dark:hover:text-foreground md:text-sm text-[12.5px]"
                        >
                            Products
                        </Link>
                        {currentUser ? (
                            <Link
                                to="/my-bids"
                                className="hover:text-foreground dark:hover:text-foreground md:text-sm text-[12.5px]"
                            >
                                My Bids
                            </Link>
                        ) : null}
                        <Link to="/blog" className="hover:text-foreground dark:hover:text-foreground md:text-sm text-[12.5px]">
                            Blog
                        </Link>
                        <Link to="/about" className="hover:text-foreground dark:hover:text-foreground md:text-sm text-[12.5px]">
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="hover:text-foreground dark:hover:text-foreground md:text-sm text-[12.5px]"
                        >
                            Contact
                        </Link>
                    </div>
                    {/* Social Media Icons */}
                    <div className="flex space-x-4 text-gray-700 dark:text-gray-300">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground dark:hover:text-foreground cursor-pointer"
                        >
                            <FaFacebook size={20} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground dark:hover:text-foreground cursor-pointer"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground dark:hover:text-foreground cursor-pointer"
                        >
                            <FaInstagram size={20} />
                        </a>
                    </div>
                </div>
            </footer>
            <div className="sticky bottom-0 z-20 inset-x-0 bg-background dark:bg-background text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700 py-7 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.05),0_-2px_4px_-2px_rgba(255,255,255,0.05)]">
                <p className="text-center text-xs sm:text-sm">
                    &copy; {currentYear} Leelame. All rights reserved.
                </p>
            </div>
        </>
    );
};

export default Footer;