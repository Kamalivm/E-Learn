import React, { useState } from "react";
import { FaUserEdit, FaGem, FaFire, FaCogs, FaSignOutAlt, FaSave, FaMedal, FaCrown } from "react-icons/fa";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "Alex Johnson",
        email: "alex@example.com",
        gems: 250,
        streak: 5,
        achievements: ["First Win", "Streak Master", "Animal Expert"],
    });

    // Handles profile data updates
    const handleEditToggle = () => setIsEditing(!isEditing);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-8 flex items-center justify-center">

            <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl text-center border-4 border-blue-500 transform hover:scale-[1.02] transition-all duration-300">

                {/* Profile Image & Name */}
                <div className="mb-8 flex flex-col items-center relative">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
                    />

                    {/* Profile Name */}
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="text-3xl font-bold text-blue-600 bg-blue-100 rounded-lg px-3 py-2 border-2 border-blue-300 mt-3"
                        />
                    ) : (
                        <h2 className="text-3xl font-bold text-blue-700 mt-3">{profileData.name}</h2>
                    )}

                    <p className="text-blue-500 text-md">{profileData.email}</p>
                </div>

                {/* Gem Counter & Streak Progress */}
                <div className="flex justify-center gap-6 mb-8">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-5 py-3 rounded-full shadow-md">
                        <FaGem size={24} />
                        <span className="font-bold text-lg">{profileData.gems} Gems</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-red-600 text-white px-5 py-3 rounded-full shadow-md">
                        <FaFire size={24} />
                        <span className="font-bold text-lg">{profileData.streak}-Day Streak</span>
                    </div>
                </div>

                {/* Streak Progress Bar */}
                <div className="relative w-full bg-gray-300 rounded-full h-5 mb-6 shadow-inner overflow-hidden">
                    <div
                        className="bg-green-500 h-5 rounded-full transition-all"
                        style={{ width: `${(profileData.streak / 10) * 100}%` }}
                    ></div>
                </div>
                <p className="text-sm text-blue-600 italic">🔥 Reach 10 days for a special reward!</p>

                {/* Achievements Section */}
                <div className="mt-8 bg-blue-50 p-5 rounded-lg border-2 border-blue-300 shadow-md">
                    <h3 className="text-2xl font-bold text-blue-700 mb-3">🏆 Achievements</h3>
                    <div className="grid grid-cols-2 gap-3 text-blue-600 font-medium">
                        {profileData.achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-blue-200 rounded-lg px-4 py-3"
                            >
                                {index % 2 === 0 ? <FaMedal /> : <FaCrown />}
                                {achievement}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Edit & Save Button */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={handleEditToggle}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-md
                        ${isEditing ? "bg-green-500 text-white" : "bg-blue-400 text-white"}
                        hover:scale-105 transition-transform`}
                    >
                        {isEditing ? <FaSave /> : <FaUserEdit />}
                        {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>

                    {/* Settings & Logout */}
                    <div className="flex gap-4">
                        <button
                            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
                        >
                            <FaCogs /> Settings
                        </button>

                        <button
                            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
