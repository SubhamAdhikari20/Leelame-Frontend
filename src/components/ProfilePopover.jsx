// frontend/src/components/ProfilePopOver.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
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
} from "./ui/alert-dialog.jsx";
import { Button } from "./ui/button.jsx";


const ProfilePopover = ({
    currentUser,
    logoutDialogOpen,
    setLogoutDialogOpen,
    setDesktopMenuOpen,
    setMobileMenuOpen,
    handleLogout,
}) => {
    if (!currentUser) return null;

    return (
        <div className="absolute right-0 mt-3 w-70 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-20">
            {/* Profile Header */}
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

            {/* Action */}
            <div className="grid grid-cols-2 gap-1 px-3 pb-3">
                {/* Profile Link */}
                <Link
                    to={`/${currentUser.username}/my-profile/dashboard`}
                    className="flex items-center justify-center gap-2 px-2 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded hover:bg-gray-100"
                    onClick={() => {
                        setDesktopMenuOpen(false);
                        setMobileMenuOpen(false);
                    }}
                >
                    <FaUser /> My Profile
                </Link>

                {/* Logout Button */}
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
                                className="bg-green-600 hover:bg-green-700 text-white"
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

            {/* Footer */}
            <div className="border-t px-4 py-2 text-center text-xs text-gray-400">
                Secured by <strong>Leelame</strong>
            </div>
        </div>
    )
}

export default ProfilePopover;