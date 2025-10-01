// frontend/src/router/AppRouter.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails, logout } from "../redux/reducers/userSlice.js";
import { fetchCurrentUser } from "../api/Api.js";
import MainLayout from "../layouts/MainLayout.jsx";
import SignUp from "../auth/SignUp.jsx";
import Login from "../auth/Login.jsx";
import VerifyAccountRegistration from "../auth/VerifyAccountRegistration.jsx";
import ForgotPassword from "../auth/ForgotPassword.jsx";
import VerifyAccountResetPassword from "../auth/VerifyAccountResetPassword.jsx";
import ResetPassword from "../auth/ResetPassword.jsx";
import HomePage from "../pages/HomePage.jsx";

const AppRouter = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await fetchCurrentUser();
                // console.log("User data:", response.data.user);
                dispatch(updateUserDetails(response.data));
            }
            catch (error) {
                console.error("Failed to fetch user:", error);
                // dispatch(logout());
            }
        };
        getCurrentUser();
    }, []);

    return (
        <>
            <Router>
                {currentUser ? (
                    currentUser.role === "buyer" ? (
                        <Routes>
                            <Route element={<MainLayout currentUser={currentUser} />}>
                                <Route path="/" element={<HomePage currentUser={currentUser} />} />
                            </Route>
                        </Routes>
                    ) : currentUser.role === "seller" ? (
                        <Routes>
                            <Route element={<MainLayout currentUser={currentUser} />}>
                                <Route path="/" element={<HomePage currentUser={currentUser} />} />
                            </Route>
                        </Routes>
                    ) : null // currentUser.role === "admin"
                ) : (
                    <Routes>
                        <Route element={<MainLayout currentUser={currentUser} />}>
                            <Route path="/" element={<HomePage currentUser={currentUser} />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/verify-account-registration/:username" element={<VerifyAccountRegistration />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/verify-account-reset-password/:email" element={<VerifyAccountResetPassword />} />
                            <Route path="/reset-password/:email" element={<ResetPassword />} />
                        </Route>
                    </Routes>
                )}
                {/* <Routes>
                    <Route element={<MainLayout currentUser={currentUser} />}>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Route>
                    <Route path="/verify-account-registration/:username" element={<VerifyAccountRegistration />} />
                    <Route path="/verify-account-reset-password/:email" element={<VerifyAccountResetPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/reset-password/:email" element={<ResetPassword />} />
                </Routes> */}
            </Router>
        </>
    );
};

export default AppRouter;