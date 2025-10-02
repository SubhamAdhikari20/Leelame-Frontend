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

    if (!currentUser) {
        dispatch(logout());
        return <Navigate to="/" replace />;
    }

    // Check role
    if (role && !role.includes(currentUser.role)) {
        dispatch(logout());
        return <Navigate to="/" replace />;
    }

    // Check if username exists (only when visiting /:username route)
    useEffect(() => {
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
                    navigate(`/profile/${username}`, { replace: true });
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
    }, [username, currentUser]);

    if (isValidUser === null) {
        return (
            <section className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin w-10 h-10 text-gray-600" />
            </section>
        );
    }

    if (!isValidUser) {
        return <NotFoundPage />;
    }

    return <Outlet />;
};

export default ProtectedRoute;