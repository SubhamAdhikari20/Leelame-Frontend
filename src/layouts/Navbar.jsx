// frontend/src/layouts/Navbar.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar.jsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog.jsx";
import { Button } from "../components/ui/button.jsx";
import {
    FaBars,
    FaFilter,
    FaSearch,
    FaSignOutAlt,
    FaTimes,
    FaUser,
} from "react-icons/fa";
import PortalWrapper from "./PortalWrapper.jsx";
import {
    NotificationFeedPopover,
    NotificationIconButton,
} from "@knocklabs/react";
import { useDispatch } from "react-redux";
import { logout, updateUserDetails } from "../redux/reducers/userSlice.js";
import Searchbar from "../components/Searchbar.jsx";
import ProfilePopover from "../components/ProfilePopOver.jsx";


const Navbar = ({ currentUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const notifButtonRef = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [feedOpen, setFeedOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // Close desktop profile popover on outside click
    useEffect(() => {
        function onClickOutside(e) {
            if (
                !logoutDialogOpen &&
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setDesktopMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, [logoutDialogOpen]);

    // Search state
    const [searchQuery, setSearchQuery] = useState("");
    // const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    // Search handlers
    const handleSubmit = (e) => {
        e.preventDefault();
        // implement your search navigate or API call:
        if (searchQuery.trim()) {
            // Example: navigate to search results page
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            // if empty maybe focus input
            inputRef.current?.focus();
        }
    };

    const clearQuery = () => {
        setSearchQuery("");
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            clearQuery();
        }
    };

    const toggleMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        toggleMenu();
    };

    return (
        <header className="sticky top-0 inset-x-0 z-500 bg-white shadow-md transition-all">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-3 md:gap-5">
                {/* Branding */}
                <div className="flex items-center gap-15">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/images/leelame_logo_cropped_png.png"
                            alt="Leelame Logo"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <span className="text-xl sm:text-2xl font-bold text-gray-800">
                            Leelame
                        </span>
                    </Link>

                    {/* Desktop Navigation - Navbar Left*/}
                    <ul className="hidden lg:flex items-center gap-8 text-gray-700">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-gray-900 text-sm"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products"
                                className="hover:text-gray-900 text-sm"
                            >
                                Products
                            </Link>
                        </li>
                        {currentUser ? (
                            <li>
                                <Link
                                    to="/my-bids"
                                    className="hover:text-gray-900 text-sm"
                                >
                                    My Bids
                                </Link>
                            </li>
                        ) : null}
                        <li>
                            <Link
                                to="/blog"
                                className="hover:text-gray-900 text-sm"
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="hover:text-gray-900 text-sm"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="hover:text-gray-900 text-sm"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="hidden lg:hidden xl:flex md:flex gap-2 items-center flex-1 mx-2 transition-all">
                    {/* Searchbar*/}
                    <Searchbar
                        inputRef={inputRef}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        clearQuery={clearQuery}
                        onSubmit={handleSubmit}
                        placeholder="Search"
                        className="flex-1 max-w-5xl"
                        showButton={true}
                    />

                    {/* Filter button */}
                    <Button
                        type="button"
                        onClick={() => setFilterOpen(true)}
                        aria-label="Open filters"
                        className="inline-flex items-center gap-1 rounded-sm border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-colors p-2"
                    >
                        <FaFilter className="w-4 h-4" />
                    </Button>

                </div>

                {/* Medium and Small Screens: Search Icon Button */}
                <div className="flex md:hidden lg:flex xl:hidden items-center flex-1 justify-end">
                    <button
                        onClick={() => setSearchOpen(v => !v)}
                        aria-label="Open search"
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <FaSearch className="text-gray-700 w-5 h-5" />
                    </button>
                </div>

                {currentUser ? (
                    <>
                        <NotificationIconButton
                            ref={notifButtonRef}
                            onClick={() => setFeedOpen((v) => !v)}
                        />
                        {feedOpen && (
                            <PortalWrapper>
                                <NotificationFeedPopover
                                    buttonRef={notifButtonRef}
                                    isVisible={feedOpen}
                                    onClose={() => setFeedOpen(false)}

                                />
                            </PortalWrapper>
                        )}
                    </>
                ) : null}

                {/* Desktop Navigation - Navbar Right*/}
                <div className="hidden lg:flex items-center gap-8">
                    {currentUser ? (
                        <div className="relative" ref={menuRef}>
                            <Avatar
                                className="h-10 w-10 cursor-pointer border-1 border-gray-900"
                                onClick={() => setDesktopMenuOpen((v) => !v)}
                            >
                                {currentUser?.profilePictureUrl ? (
                                    <AvatarImage
                                        src={currentUser?.profilePictureUrl}
                                        alt={currentUser?.fullName}
                                    />
                                ) : (
                                    <AvatarFallback>
                                        {(
                                            currentUser?.fullName ??
                                            currentUser?.username ??
                                            "U"
                                        )
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()}
                                    </AvatarFallback>
                                )}
                            </Avatar>

                            {/* popover */}
                            {desktopMenuOpen && (
                                <>
                                    <ProfilePopover
                                        currentUser={currentUser}
                                        logoutDialogOpen={logoutDialogOpen}
                                        setLogoutDialogOpen={setLogoutDialogOpen}
                                        setDesktopMenuOpen={setDesktopMenuOpen}
                                        setMobileMenuOpen={setMobileMenuOpen}
                                        handleLogout={handleLogout}
                                    />
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-evenly items-center gap-4">
                            <Link to="/login">
                                <Button
                                    size="sm"
                                    className="flex-1 font-semibold"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/sign-up">
                                <Button
                                    size="sm"
                                    className="flex-1 font-semibold"
                                    variant="outline"
                                >
                                    Join
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-800 focus:outline-none cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <FaTimes size={24} />
                        ) : (
                            <FaBars size={24} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Small or Medium Size Screen Searchbar Overlay */}
            <nav className={`md:hidden lg:flex xl:hidden flex items-center bg-white shadow-md overflow-hidden transition-all duration-300 ${searchOpen
                ? "max-h-50 opacity-100"
                : "max-h-0 opacity-0"
                }`}>
                <div className="flex flex-1 gap-2 items-center max-w-xl md:max-w-2xl mx-auto px-3 sm:px-5 pt-1 pb-4">
                    {/* Filter Button */}
                    <Button
                        type="button"
                        onClick={() => setFilterOpen(true)}
                        aria-label="Open filters"
                        className="inline-flex items-center gap-1 rounded-sm border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-colors p-2"
                    >
                        <FaFilter className="w-4 h-4" />
                    </Button>

                    {/* Searchbar */}
                    <Searchbar
                        inputRef={inputRef}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        clearQuery={clearQuery}
                        onSubmit={handleSubmit}
                        onKeyDown={handleKeyDown}
                        placeholder="Search"
                        className="flex-1 max-w-2xl"
                        showButton={true}
                    />
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            <nav
                className={`lg:hidden bg-white shadow-md overflow-hidden transition-all duration-300 ${mobileMenuOpen
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
            >
                <div className="container mx-auto px-4 py-4 flex justify-center items-center flex-col gap-4">
                    <ul className="flex flex-col gap-4 text-gray-700">
                        <li>
                            <Link
                                to="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="hover:text-gray-900 text-base"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products"
                                onClick={() => setMobileMenuOpen(false)}
                                className="hover:text-gray-900 text-base"
                            >
                                Product
                            </Link>
                        </li>
                        {currentUser ? (
                            <li>
                                <Link
                                    to="/my-bids"
                                    className="hover:text-gray-900 text-sm"
                                >
                                    My Bids
                                </Link>
                            </li>
                        ) : null}
                        <li>
                            <Link
                                to="/blog"
                                onClick={() => setMobileMenuOpen(false)}
                                className="hover:text-gray-900 text-sm"
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                onClick={() => setMobileMenuOpen(false)}
                                className="hover:text-gray-900 text-sm"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="hover:text-gray-900 text-base"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>

                    {currentUser ? (
                        <>
                            <Link
                                to={`/${currentUser.username}/my-profile`}
                                onClick={toggleMenu}
                                className="flex items-center gap-2"
                            >
                                <Avatar className="h-8 w-8 cursor-pointer border-1 border-gray-900">
                                    {currentUser?.profilePictureUrl ? (
                                        <AvatarImage
                                            src={currentUser?.profilePictureUrl}
                                            alt={currentUser?.fullName}
                                        />
                                    ) : (
                                        <AvatarFallback>
                                            {(
                                                currentUser?.fullName ??
                                                currentUser?.username ??
                                                "U"
                                            )
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    )}
                                </Avatar>{" "}
                                My Profile
                            </Link>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="flex items-center gap-2">
                                        <FaSignOutAlt /> Logout
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="rounded-lg">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure you want to logout?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will end your session and
                                            return you to the sign-in page.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel
                                            onClick={() => {
                                                toggleMenu();
                                            }}
                                        >
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                            onClick={() => {
                                                handleLogout();
                                            }}
                                        >
                                            Logout
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    ) : (
                        <div className="flex flex-col justify-evenly items-center gap-4">
                            <Link to="/login">
                                <Button
                                    size="sm"
                                    className="flex-1 font-semibold"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/sign-up">
                                <Button
                                    size="sm"
                                    className="flex-1 font-semibold"
                                    variant="outline"
                                >
                                    Join
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;