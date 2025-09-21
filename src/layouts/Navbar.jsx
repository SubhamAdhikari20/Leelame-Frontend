// frontend/src/layouts/Navbar.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
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
} from "@/components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import {
    FaBars,
    FaSearch,
    FaSignOutAlt,
    FaTimes,
    FaUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import { Input } from "../components/ui/input";
import Logo from "./../assets/leelame_logo_cropped_png.png";


const Navbar = ({ currentUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const menuRef = useRef(null);

    const [feedOpen, setFeedOpen] = useState(false);
    const notifButtonRef = useRef(null);

    // if (!currentUser) {
    //     signOut();
    //     return null;
    // }

    // Close desktop popover on outside click
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
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-5">
                {/* Branding */}
                <div className="flex items-center gap-15">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src={Logo}
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
                        {/* {currentUser ? (
                            <div className="flex items-center gap-4">
                                <NotificationIconButton
                                ref={notifButtonRef}
                                onClick={() => setFeedOpen((v) => !v)}
                                />
                                {feedOpen && (
                                    <PortalWrapper>
                                    <NotificationFeedPopover
                                    buttonRef={notifButtonRef as React.RefObject<HTMLElement>}
                                    isVisible={feedOpen}
                                    onClose={() => setFeedOpen(false)}
                                    
                                    />
                                    </PortalWrapper>
                                    )}
                                    </div>
                        ) : null} */}
                    </ul>
                </div>

                {/* Searchbar*/}
                <form
                    onSubmit={handleSubmit}
                    className="hidden sm:flex items-center flex-1 max-w-3xl mx-4 xl:px-20"
                    role="search"
                    aria-label="Site search"
                >
                    <div className="relative flex-1 transition-shadow">
                        {/* left icon inside input */}
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="w-4 h-4 text-gray-400" />
                        </div>

                        {/* input */}
                        <Input
                            ref={inputRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            type="search"
                            name="search"
                            placeholder="Search"
                            className={
                                // dark pill style like your image
                                "w-full rounded-bl-full rounded-tl-full text-gray-900 font-medium placeholder-gray-300 py-3 pl-10 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors"
                            }
                            aria-label="Search"
                        />

                        {/* clear (X) — shown only when there's text */}
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={clearQuery}
                                aria-label="Clear search"
                                className="absolute inset-y-0 right-4 flex items-center pr-2 text-gray-300 hover:text-gray-100 focus:outline-none"
                            >
                                <FaTimes className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* circular search button on right (icon-in-circle) */}
                    <Button
                        type="submit"
                        aria-label="Search"
                        className="inline-flex items-center justify-center rounded-br-full rounded-tr-full border border-gray-300 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        <FaSearch className="w-5 h-5 text-gray-500" />
                    </Button>
                </form>

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
                                <div className="absolute right-0 mt-2 w-70 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50">
                                    <div className="px-4 py-3 text-center">
                                        <Avatar className="mx-auto h-12 w-12 border-1 border-gray-900">
                                            {currentUser.profilePictureUrl ? (
                                                <AvatarImage
                                                    src={
                                                        currentUser.profilePictureUrl
                                                    }
                                                    alt={currentUser.fullName}
                                                />
                                            ) : (
                                                <AvatarFallback>
                                                    {(
                                                        currentUser.fullName ??
                                                        currentUser.username ??
                                                        "U"
                                                    )
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                        <h1 className="mt-2 font-bold text-gray-900">
                                            {currentUser.fullName}
                                        </h1>
                                        <h2 className="mt-2 font-semibold text-gray-800">
                                            {currentUser.username}
                                        </h2>
                                        <p className="text-sm text-gray-500 truncate">
                                            {currentUser.email}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-1 px-3 pb-3">
                                        <Link
                                            to="/my-profile"
                                            className="flex items-center justify-center gap-2 px-2 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded hover:bg-gray-100"
                                            onClick={() => {
                                                setDesktopMenuOpen(false);
                                                setMobileMenuOpen(false);
                                            }}
                                        >
                                            <FaUser /> My Profile
                                        </Link>
                                        <AlertDialog
                                            open={logoutDialogOpen}
                                            onOpenChange={setLogoutDialogOpen}
                                        >
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    className="flex items-center justify-center gap-2 px-2 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded hover:bg-gray-100"
                                                    onClick={() =>
                                                        setLogoutDialogOpen(
                                                            true
                                                        )
                                                    }
                                                >
                                                    <FaSignOutAlt /> Logout
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="rounded-lg">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure you want to
                                                        logout?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This will end your
                                                        session and return you
                                                        to the sign-in page.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel
                                                        onClick={() => {
                                                            setLogoutDialogOpen(
                                                                false
                                                            );
                                                            setDesktopMenuOpen(
                                                                false
                                                            );
                                                            setMobileMenuOpen(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="bg-red-600 hover:bg-red-700 text-white"
                                                        onClick={() => {
                                                            handleLogout();
                                                            setLogoutDialogOpen(
                                                                false
                                                            );
                                                            setDesktopMenuOpen(
                                                                false
                                                            );
                                                            setMobileMenuOpen(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        Logout
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>

                                    <div className="border-t px-4 py-2 text-center text-xs text-gray-400">
                                        Secured by <strong>Bike Buddy</strong>
                                    </div>
                                </div>
                            )}

                            {/* <Button variant="outline" size="sm" onClick={() => signOut()}>
                                <FaSignOutAlt className="inline mr-1" /> Logout
                            </Button> */}
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
                                to="/my-profile"
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
                                My profile
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

                    {/* <div className="mt-4">
                        <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="text-base">Login</Button>
                        </Link>
                    </div> */}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;