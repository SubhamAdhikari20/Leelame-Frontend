// frontend/src/pages/ProfileDashboard.jsx
import React from "react";
import { IndianRupee, Medal, Star } from "lucide-react";


const ProfileDashboard = ({ currentUser }) => {
    const activityData = [
        {
            title: "Balance",
            value: 0,
            icon: <IndianRupee className="h-8 w-8 text-green-600" />,
        },
        {
            title: "Items Won",
            value: 0,
            icon: <Medal className="h-8 w-8 text-green-600" />,
        },
        {
            title: "Your Products",
            value: 0,
            icon: <Star className="h-8 w-8 text-green-600" />,
        },
    ];

    return (
        <section className="w-full bg-[#d3ecdc] rounded-xl shadow-lg p-5 xl:max-w-7xl mx-auto">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Activity</h2>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activityData.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-6 shadow-sm transition hover:shadow-md hover:border-green-300"
                    >
                        <div className="flex justify-center items-center">{item.icon}</div>
                        <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                        <span className="text-gray-700 font-medium">{item.title}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProfileDashboard;