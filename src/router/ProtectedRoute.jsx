// frontend/src/router/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { validateUsernameProtectedRoutes } from "../api/Api.js";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice.js";


const ProtectedRoute = ({ currentUser, role }) => {
    const { username } = useParams();
    const [isValidUser, setIsValidUser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Check if username exists (only when visiting /:username route)
    useEffect(() => {
        if (!currentUser) {
            dispatch(logout());
            navigate("/", { replace: true });
            return;
        }

        // Check role
        const rolesToCheck = Array.isArray(currentUser.role) ? currentUser.role : [currentUser.role];
        const hasAccess = rolesToCheck.some(r => {
            if (role === "buyer" && r === "buyer") {
                return true;
            }

            if (role === "seller" && r === "seller") {
                const isVerifiedSeller = currentUser.sellerStatus === "verified";
                const isTemporarilyBanned = currentUser.sellerBannedDateTo && new Date(currentUser.sellerBannedDateTo) > new Date();
                const isPermanentlyBanned = currentUser.isSellerPermanentlyBanned;
                return isVerifiedSeller && !isTemporarilyBanned && !isPermanentlyBanned;
            }

            if (role === "admin" && r === "admin") {
                return true;
            }
            return false;
        });

        if (!hasAccess) {
            dispatch(logout());
            navigate("/", { replace: true });
            return;
        }

        const checkUser = async () => {
            if (!username) {
                setIsValidUser(true); // homepage without username is always valid
                return;
            }
            try {
                const response = await validateUsernameProtectedRoutes(username);
                const exists = response.data.exists;

                // Only allow if username exists and matches currentUser
                if (exists && currentUser && username === currentUser.username) {
                    setIsValidUser(true);
                }
                else if (exists && currentUser && username !== currentUser.username) {
                    setIsValidUser(false);
                    navigate(`/${username}`, { replace: true });
                }
                else {
                    setIsValidUser(false);
                }
            }
            catch (error) {
                setIsValidUser(false);
            }
        };
        checkUser();
    }, [username, currentUser, role, navigate, dispatch]);


    if (isValidUser === null) {
        return (
            <section className="flex items-center justify-center h-screen bg-background dark:bg-background">
                <Loader2 className="animate-spin w-10 h-10 text-gray-600 dark:text-gray-400" />
            </section>
        );
    }

    if (!isValidUser) {
        return <NotFoundPage />;
    }

    return <Outlet />;
};

export default ProtectedRoute;