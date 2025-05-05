import React, { useState, useEffect } from "react";
import { FaUserEdit, FaGem, FaFire, FaCogs, FaSignOutAlt, FaSave, FaMedal, FaCrown } from "react-icons/fa";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        gems: 0
    });
    const [error, setError] = useState(""); 

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch("http://localhost:8000/user/details", {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error("User profile fetch failed");
                    }

                    const data = await response.json();
                    setProfileData({
                        name: data.username,
                        email: data.email,
                        gems: data.gems,
                        streak: data.streak,
                        achievements: data.achievements,
                    });
                } catch (error) {
                    setError("Failed to fetch profile. Please try again.");
                }
            };

            fetchUserProfile();
        } else {
            setError("You need to log in to view this page.");
        }
    }, [token]);

    const handleEditToggle = () => setIsEditing(!isEditing);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch("http://localhost:8000/user/update", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: profileData.name,
                    email: profileData.email,
                    gems: profileData.gems,
                    streak: profileData.streak,
                    achievements: profileData.achievements,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save changes");
            }

            const data = await response.json();
            alert(data.message); // Show success message
            setIsEditing(false); // Disable editing
        } catch (error) {
            setError("Error saving profile changes.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"; 
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-8 flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl text-center border-4 border-blue-500 transform hover:scale-[1.02] transition-all duration-300">
                <div className="mb-8 flex flex-col items-center relative">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
                    />
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="text-3xl font-bold text-blue-600 bg-blue-100 rounded-lg px-3 py-2 border-2 border-blue-300 mt-3"
                        />
                    ) : (
                        <h2 className="text-3xl font-bold text-blue-700 mt-3">Name : {profileData.name}</h2>
                    )}
                    <p className="text-blue-500 text-md">{profileData.email}</p>
                </div>

                <div className="flex justify-center gap-6 mb-8">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-5 py-3 rounded-full shadow-md">
                        <FaGem size={24} />
                        <span className="font-bold text-lg">{profileData.gems} Gems</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-red-600 text-white px-5 py-3 rounded-full shadow-md">
                        <FaFire size={24} />
                        <span className="font-bold text-lg">3-Day Streak</span>
                    </div>
                </div>

                {/* <div className="relative w-full bg-gray-300 rounded-full h-5 mb-6 shadow-inner overflow-hidden">
                    <div
                        className="bg-green-500 h-5 rounded-full transition-all"
                        style={{ width: `${(profileData.streak / 10) * 100}%` }}
                    ></div>
                </div> */}
                <p className="text-sm text-blue-600 italic">🔥 Reach 10 days for a special reward!</p>

                {/* <div className="mt-8 bg-blue-50 p-5 rounded-lg border-2 border-blue-300 shadow-md">
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
                </div> */}

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

                    <div className="flex gap-4">
                        <button
                            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
                        >
                            <FaCogs /> Settings
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default Profile;
