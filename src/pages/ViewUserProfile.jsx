// frontend/src/pages/ViewUserProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, View } from "lucide-react";
import { fetchPublicProfile } from "../api/Api.js";
import NotFoundPage from "./NotFoundPage.jsx";

const ViewUserProfile = ({ currentUser }) => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchPublicProfile(username);
                setUser(response.data.user);
            }
            catch (error) {
                if (error?.response?.status === 404) {
                    setUser(null);
                }
                else {
                    setError("Failed to load profile");
                }
            }
            finally {
                setLoading(false);
            }
        };

        if (username) loadProfile();
    }, [username]);

    if (loading) {
        return (
            <section className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin w-10 h-10 text-gray-600" />
            </section>
        );
    }

    if (!user) {
        return <NotFoundPage />;
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
                <div className="flex items-center gap-4">
                    <img
                        src={user.profilePictureUrl || "/images/default-avatar.png"}
                        alt={user.fullName ?? user.username}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">{user.fullName ?? user.username}</h1>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                        {user.role && <p className="mt-1 text-xs text-muted-foreground">Role: {user.role}</p>}
                    </div>
                </div>

                <section className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">About</h2>
                    <p className="text-sm text-muted-foreground">{user.bio ?? "This user hasn't added a bio yet."}</p>
                </section>

                {/* Add public lists / items (optional): link to user's public items if you have endpoint */}
                <section className="mt-6">
                    <h3 className="font-medium">Public items</h3>
                    <p className="text-sm text-muted-foreground">(If you have items endpoint, load them here.)</p>
                </section>

                <div className="mt-6 flex gap-3">
                    {/** If logged-in user equals this profile, show link to dashboard/profile edit */}
                    {currentUser?.username === user.username ? (
                        <Link to={`/${user.username}/my-profile`} className="btn">
                            My Dashboard
                        </Link>
                    ) : (
                        <>
                            {/* Follow/message buttons etc. (optional) */}
                            <button className="btn-outline">Follow</button>
                            <button className="btn">Message</button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ViewUserProfile;