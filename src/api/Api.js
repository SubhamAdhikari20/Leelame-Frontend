// frontend/src/api/Api.js
import axios from "axios";

const Api = axios.create({
  baseURL: `http://localhost:7777/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

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



export default Api;