// frontend/src/redux/reducers/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            localStorage.setItem("leelame-app-token", action.payload.token);
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload.user;    // user object must include a 'role' property
            localStorage.setItem("leelame-app-token", action.payload.token);
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("leelame-app-token");
        },
        updateUserDetails: (state, action) => {
            if (state.currentUser) {
                state.currentUser = { ...state.user, ...action.payload };
            }
        },
        updateProfilePictureSuccess: (state, action) => {
            if (state.currentUser) {
                state.currentUser.profilePicture = action.payload;
            }
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            localStorage.removeItem("leelame-app-token");
        }
    },
});

export const { registerSuccess, loginSuccess, logout, deleteUserSuccess, updateProfilePictureSuccess, updateUserDetails} = userSlice.actions;

export default userSlice.reducer;