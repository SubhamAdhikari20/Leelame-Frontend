// frontend/src/api/Api.js
import axios from "axios";

const Api = axios.create({
    baseURL: `http://localhost:7777/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

const token = localStorage.getItem("leelame-app-token");

// ------------------------------------------ User Authentication ----------------------------------------------
// Sign Up User
export const registerUser = async (data) => Api.post("/user/register-user", data);
export const validateUsernameUnique = async (username) => Api.get(`/user/check-username-unique?username=${username}`);
export const verifyAccountForRegistration = async (data) => Api.put("/user/verify-account-registration", data);

// Login User
export const loginUser = async (data) => Api.post("/user/login-user", data);
export const sendVerificationEmailForRegistration = async (email) => Api.put("/user/send-verification-email-registration", { email });
export const loginUserWithGoogle = async (access_token) => Api.post("/user/google-login", { access_token });

// Forgot Password
export const forgotPassword = async (data) => Api.put("/user/forgot-password", data);
export const verifyAccountForResetPassword = async (data) => Api.put("/user/verify-account-reset-password", data);
export const resetPassword = async (data) => Api.put("/user/reset-password", data);

// Get Current User
// export const fetchCurrentUser = async () => Api.get("/user/get-current-user");
export const fetchCurrentUser = async () => {
    if (!token) {
        throw new Error("No authentication token found");
    }
    return await Api.get("/user/get-current-user", {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Validate Username for Protected Routes
export const validateUsernameProtectedRoutes = async (username) => Api.get(`/user/check-username?username=${username}`);

// Edit User Details
export const editUserDetails = async (userId, data) => {
    if (!token) {
        throw new Error("No authentication token found");
    }
    return await Api.put(`/user/update-user-details/${userId}`, {
        data,
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Delete User
export const deleteUser = async (userId) => {
    if (!token) {
        throw new Error("No authentication token found");
    }
    return await Api.delete(`/user/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// Public profile fetch
export const fetchPublicProfile = async (username)   => Api.get(`/user/public-profile?username=${username}`);

// export const fetchPublicProfile = async (username)   => {
//     if (!token) {
//         throw new Error("No authentication token found");
//     }
//     return await Api.get(`/user/public-profile?username=${username}`, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
// };


export default Api;