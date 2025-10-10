// frontend/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from './components/ui/sonner.jsx';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import KnockClientWrapper from './layouts/KnockClientWrapper.jsx';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Toaster />
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <KnockClientWrapper>
                        <App />
                    </KnockClientWrapper>
                </GoogleOAuthProvider>
            </PersistGate>
        </Provider>
    </StrictMode>,
)
