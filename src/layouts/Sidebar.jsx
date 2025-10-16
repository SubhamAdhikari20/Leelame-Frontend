// forntend/src/layouts/Sidebar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Trophy,
    Heart,
    UserCog,
    LogOut,
    Menu,
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../components/ui/sheet.jsx";
import { Button } from "../components/ui/button.jsx";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../components/ui/avatar.jsx";
import { ScrollArea } from "../components/ui/scroll-area.jsx";
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
import { logout } from "../redux/reducers/userSlice.js";
import { useDispatch } from "react-redux";


const Sidebar = ({ currentUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    if (!currentUser) return null;

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "dashboard" },
        { name: "Winning Bids", icon: <Trophy size={18} />, path: "winning-bids" },
        { name: "My Favorites", icon: <Heart size={18} />, path: "favorites" },
        { name: "Profile Settings", icon: <UserCog size={18} />, path: "settings" },
    ];

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const SidebarContent = () => (
        <div className="flex flex-col p-5">
            {/* Profile Section */}
            <div className="flex flex-col items-center py-5 border-b">
                <Avatar className="w-16 h-16 border-1 border-gray-900">
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
                <h1 className="mt-2 font-bold text-gray-900">
                    {currentUser?.fullName}
                </h1>
                <h2 className="font-semibold text-gray-800">
                    {currentUser?.username}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                    {currentUser?.email}
                </p>
            </div>

            {/* Scrollable Menu */}
            <ScrollArea className="flex-1 mt-4">
                <nav className="flex flex-col gap-2">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname.includes(item.path);
                        return (
                            <Link
                                key={index}
                                to={`/${currentUser?.username}/my-profile/${item.path}`}
                            >
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={`w-full justify-start gap-3 rounded-lg text-gray-700 transition ${isActive
                                        ? "bg-green-50 text-green-700 font-semibold"
                                        : "hover:bg-green-50 hover:text-green-600"
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>

            {/* Logout */}
            <div className="py-4 border-t mt-4">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            className="w-full justify-start gap-3 bg-green-600 hover:bg-green-700"
                        >
                            <LogOut size={18} />
                            Log Out
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
                            >
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => {
                                    handleLogout();
                                }}
                            >
                                Logout
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );

    return (
        <aside className="">
            {/* 🖥 Desktop Sidebar */}
            <div className="hidden md:block w-full sticky top-30 inset-x-0 bg-white shadow-lg rounded-2xl">
                <SidebarContent />
            </div>

            {/* 📱 Mobile Sidebar (Sheet Drawer) */}
            <div className="md:hidden p-3 flex items-center justify-between w-full bg-white border-b">
                <h1 className="text-lg font-semibold">Menu</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>
        </aside>
    );
};

export default Sidebar;