// frontend/src/router/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout.jsx";
import SignUp from "../auth/SignUp.jsx";
import Login from "../auth/Login.jsx";
// import ForgotPassword from "../auth/ForgotPassword.jsx";
// import VerifyAccountRegistration from "../auth/VerifyAccountRegistration.jsx";
// import VerifyAccountResetPassword from "../auth/VerifyAccountResetPassword.jsx";
// import ResetPassword from "../auth/ResetPassword.jsx";


const AppRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <>
            <Router>
                {currentUser ? (
                    currentUser.role === "bidder" ? (
                        <Routes>
                            <Route element={<MainLayout currentUser={currentUser} />}>
                                {/* <Route path="/" element={<Homepage />} /> */}
                            </Route>
                        </Routes>
                    ) : (
                        {/* currentUser.role === "admin" */ }
                    )
                ) : (
                    <Routes>
                        <Route element={<MainLayout currentUser={currentUser} />}>
                            {/* <Route path="/" element={<Homepage />} /> */}
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
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