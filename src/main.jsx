// frontend/src/main.jsx
import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from './components/ui/sonner.jsx';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import KnockClientWrapper from './layouts/KnockClientWrapper.jsx';
import { ThemeProvider, useTheme } from "./context/ThemeProvider.jsx";

const ThemedToaster = () => {
    const { theme } = useTheme();
    const resolvedTheme =
        theme === "system"
            ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
            : theme;

    return (
        <Toaster
            richColors
            closeButton
            theme={resolvedTheme}
        />
    );
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider>
                    <ThemedToaster />
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                        <KnockClientWrapper>
                            <App />
                        </KnockClientWrapper>
                    </GoogleOAuthProvider>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </StrictMode>,
);