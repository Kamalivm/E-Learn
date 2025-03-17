import React, { useState } from "react";
import {
    FaUser, FaLock, FaBell, FaPalette, FaShieldAlt,
    FaSave, FaUndo, FaUpload, FaCamera
} from "react-icons/fa";

const Settings = () => {
    const [settings, setSettings] = useState({
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        password: "",
        newPassword: "",
        confirmPassword: "",
        notifications: true,
        theme: "light",
        activityVisibility: true,
        dataSharing: false,
    });

    // Handle Change for Inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle Profile Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSettings((prevSettings) => ({
                    ...prevSettings,
                    avatar: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Save Changes
    const handleSave = () => {
        alert("Settings saved successfully! 🎉");
    };

    // Reset Changes
    const handleReset = () => {
        alert("Settings reset to default. 🔄");
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-8 flex items-center justify-center">
            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl border-4 border-blue-400 transform hover:scale-[1.02] transition-all duration-300">

                {/* Title Section */}
                <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">⚙️ Settings</h2>

                {/* Profile Settings */}
                <div className="mb-6 bg-blue-50 p-4 rounded-lg border-2 border-blue-300 shadow-md">
                    <h3 className="text-2xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                        <FaUser /> Profile Settings
                    </h3>

                    {/* Avatar with Upload Icon */}
                    <div className="relative w-24 h-24 mb-4">
                        <img
                            src={settings.avatar}
                            alt="Avatar"
                            className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-md"
                        />
                        <label htmlFor="avatarUpload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600">
                            <FaCamera />
                        </label>
                        <input
                            id="avatarUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>

                    {/* Name and Email */}
                    <input
                        type="text"
                        name="name"
                        value={settings.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full mb-3 px-3 py-2 rounded-lg border-2 border-blue-300"
                    />
                    <input
                        type="email"
                        name="email"
                        value={settings.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 rounded-lg border-2 border-blue-300"
                    />
                </div>

                {/* Password Settings */}
                <div className="mb-6 bg-blue-50 p-4 rounded-lg border-2 border-blue-300 shadow-md">
                    <h3 className="text-2xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                        <FaLock /> Account Security
                    </h3>

                    <input
                        type="password"
                        name="password"
                        value={settings.password}
                        onChange={handleChange}
                        placeholder="Current Password"
                        className="w-full mb-3 px-3 py-2 rounded-lg border-2 border-blue-300"
                    />

                    <input
                        type="password"
                        name="newPassword"
                        value={settings.newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                        className="w-full mb-3 px-3 py-2 rounded-lg border-2 border-blue-300"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        value={settings.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                        className="w-full px-3 py-2 rounded-lg border-2 border-blue-300"
                    />
                </div>

                {/* Notification Settings */}
                <div className="mb-6 bg-blue-50 p-4 rounded-lg border-2 border-blue-300 shadow-md">
                    <h3 className="text-2xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                        <FaBell /> Notification Preferences
                    </h3>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={settings.notifications}
                            onChange={handleChange}
                        />
                        Enable Email & Push Notifications
                    </label>
                </div>

                {/* Theme Settings */}
                <div className="mb-6 bg-blue-50 p-4 rounded-lg border-2 border-blue-300 shadow-md">
                    <h3 className="text-2xl font-bold text-blue-600 mb-3 flex items-center gap-2">
                        <FaPalette /> Theme Preferences
                    </h3>

                    <select
                        name="theme"
                        value={settings.theme}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border-2 border-blue-300"
                    >
                        <option value="light">🌞 Light Mode</option>
                        <option value="dark">🌙 Dark Mode</option>
                    </select>
                </div>

                {/* Save & Reset Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600"
                    >
                        <FaSave /> Save Changes
                    </button>

                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
                    >
                        <FaUndo /> Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
