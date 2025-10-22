// frontend/src/router/AppRouter.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import { updateUserDetails } from "../redux/reducers/userSlice.js";
import { fetchCurrentUser } from "../api/Api.js";

import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

import HomePage from "../pages/HomePage.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import ViewUserProfile from "../pages/ViewUserProfile.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

import SignUp from "../auth/SignUp.jsx";
import Login from "../auth/Login.jsx";
import VerifyAccountRegistration from "../auth/VerifyAccountRegistration.jsx";
import ForgotPassword from "../auth/ForgotPassword.jsx";
import VerifyAccountResetPassword from "../auth/VerifyAccountResetPassword.jsx";
import ResetPassword from "../auth/ResetPassword.jsx";
import ProfileLayout from "../layouts/ProfileLayout.jsx";
import ProfileDashboard from "../pages/ProfileDashboard.jsx";


const AppRouter = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCurrentUser = async () => {
            setLoading(true);
            try {
                const response = await fetchCurrentUser();
                // console.log("User data:", response.data.user);
                if (response.data.success) {
                    dispatch(updateUserDetails(response.data));
                }
            }
            catch (error) {
                // console.error("Failed to fetch user:", error);
                // dispatch(logout());
                return;
            }
            finally {
                setLoading(false);
            }
        };
        getCurrentUser();
    }, [dispatch]);

    if (loading) {
        return (
            <section className="flex items-center justify-center h-screen bg-background dark:bg-background">
                <Loader2 className="animate-spin w-10 h-10 text-gray-600 dark:text-gray-400" />
            </section>
        );
    }

    return (
        <Router>
            <Routes>
                {/* {currentUser ? (
                    currentUser.role === "buyer" ? (
                        // Protected Routes for 'buyers'
                        <Route element={<ProtectedRoute currentUser={currentUser} role={["buyer"]} />}>
                            <Route element={<MainLayout currentUser={currentUser} />}>
                                <Route path="/" element={<Navigate to={`/${currentUser.username}`} replace />} />
                                <Route path="/:username" element={<HomePage currentUser={currentUser} />} />
                                <Route path="/:username/my-profile" element={<UserProfile currentUser={currentUser} />} />
                            </Route>
                        </Route>
                    ) : currentUser.role === "seller" ? (
                        // Protected Routes for 'sellers'
                        <Route element={<ProtectedRoute />}>
                            <Route element={<MainLayout currentUser={currentUser} role={["seller"]} />}>
                                <Route path="/:username" element={<HomePage currentUser={currentUser} />} />
                            </Route>
                        </Route>
                    ) : null // currentUser.role === "admin"
                ) : (
                    // Public Routes
                    <Route element={<PublicRoute />}>
                        <Route element={<MainLayout currentUser={currentUser} />}>
                            <Route path="/" element={<HomePage currentUser={currentUser} />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/verify-account-registration/:username" element={<VerifyAccountRegistration />} />
                            <Route path="/verify-account-reset-password/:email" element={<VerifyAccountResetPassword />} />
                            <Route path="/reset-password/:email" element={<ResetPassword />} />

                            <Route path="/:username" element={<ViewUserProfile currentUser={currentUser} />} />
                        </Route>
                    </Route>
                )} */}


                {/* Protected Routes for 'buyers' */}
                <Route element={<ProtectedRoute currentUser={currentUser} role="buyer" />}>
                    <Route element={<MainLayout currentUser={currentUser} />}>
                        {currentUser &&
                            <>
                                <Route path="/" element={<Navigate to={`/${currentUser?.username}`} replace />} />
                                <Route path="/:username" element={<HomePage currentUser={currentUser} />} />
                                {/* <Route path="/:username/my-bids" element={<MyBidPage currentUser={currentUser} />} /> */}
                            </>
                        }
                    </Route>
                    <Route element={<ProfileLayout currentUser={currentUser} />}>
                        <Route path="/:username/my-profile/dashboard" element={<ProfileDashboard currentUser={currentUser} />} />
                        <Route path="/:username/my-profile/settings" element={<UserProfile currentUser={currentUser} />} />
                    </Route>
                </Route>

                {/* Protected Routes for 'sellers' */}
                <Route element={<ProtectedRoute currentUser={currentUser} role="seller" />}>
                    <Route element={<MainLayout currentUser={currentUser} />}>

                    </Route>
                </Route>

                { /* Public Routes */}
                <Route element={<PublicRoute />}>
                    <Route element={<MainLayout currentUser={currentUser} />}>
                        <Route path="/" element={<HomePage currentUser={currentUser} />} />
                        <Route path="/products" element={<ProductPage currentUser={currentUser} />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />

                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/verify-account-registration/:username" element={<VerifyAccountRegistration />} />
                        <Route path="/verify-account-reset-password/:email" element={<VerifyAccountResetPassword />} />
                        <Route path="/reset-password/:email" element={<ResetPassword />} />

                        <Route path="/:username" element={<ViewUserProfile />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes >
        </Router >
    );
};

export default AppRouter;