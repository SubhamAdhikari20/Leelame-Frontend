// frontend/src/layouts/KnockClientWrapper.jsx
import React, { useEffect } from "react";
import { KnockFeedProvider, KnockProvider } from "@knocklabs/react";
import "@knocklabs/react/dist/index.css";
import { useSelector } from "react-redux";
import { updateKnockUser } from "../api/Api.js";


const KnockClientWrapper = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);

    // Validate environment variables at runtime
    const apiKey = import.meta.env.VITE_KNOCK_PUBLIC_API_KEY;
    const feedId = import.meta.env.VITE_KNOCK_PUBLIC_FEED_ID;

    if (!apiKey) {
        console.error("VITE_KNOCK_PUBLIC_API_KEY is missing. Please set it in your .env file.");
        return <>{children}</>;
    }
    if (!feedId) {
        console.error("VITE_KNOCK_PUBLIC_FEED_ID is missing. Please set it in your .env file.");
        return <>{children}</>;
    }

    useEffect(() => {
        const createAndUpdateKnockUser = async () => {
            if (!currentUser?._id) return;

            try {
                const response = await updateKnockUser({
                    userId: currentUser._id,
                    fullName: currentUser.fullName || currentUser.username || "User",
                    email: currentUser.email,
                });

                if (!response.data.success) {
                    console.error("Failed to update Knock user:", response.data.message);
                }
            }
            catch (error) {
                console.error("Error updating Knock user:", error);
            }
        };

        createAndUpdateKnockUser();
    }, [currentUser]);

    if (!currentUser?._id) {
        return <>{children}</>;
    }

    return (
        <KnockProvider apiKey={apiKey} user={{ id: currentUser._id }}>
            <KnockFeedProvider feedId={feedId}>
                {children}
            </KnockFeedProvider>
        </KnockProvider>
    );
};

export default KnockClientWrapper;