import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaHome, FaGraduationCap, FaUser, FaBell, FaGift,
    FaCog, FaSignOutAlt, FaMoon, FaSun, FaGem,
    FaCheckCircle, FaTrashAlt
} from "react-icons/fa";

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [gems, setGems] = useState(250);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const location = useLocation();

    // Ref for detecting clicks outside
    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);

    // Sample Notification Data
    const [notifications, setNotifications] = useState([
        { id: 1, message: "You have earned 50 gems! 🎯", isRead: false, time: "5 mins ago" },
        { id: 2, message: "Daily Challenge unlocked! 🚀", isRead: true, time: "1 hour ago" },
        { id: 3, message: "New achievement unlocked: 'Streak Master' 🏆", isRead: false, time: "Yesterday" },
    ]);

    // Sample Profile Data
    const userProfile = {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    };

    // Toggle Functions
    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

    // Auto-hide logic
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav
            className={`p-4 rounded-full mx-4 mt-4 shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] 
                ${darkMode ? "bg-blue-100 text-blue-700" : "bg-blue-100 text-blue-700"}`}
        >
            <div className="flex justify-between items-center">

                {/* Animated Logo */}
                <Link
                    to="/"
                    className="text-3xl font-extrabold tracking-wider flex items-center gap-2"
                >
                    🧠 KidsLearn
                </Link>

                {/* Navigation Links */}
                <ul className="flex items-center gap-8">
                    {[
                        { icon: <FaHome />, text: "Home", path: "/" },
                        { icon: <FaGraduationCap />, text: "Learning", path: "/learning" },
                        { icon: <FaGift />, text: "Rewards", path: "/rewards" },
                    ].map(({ icon, text, path }) => (
                        <li
                            key={text}
                            className={`flex items-center gap-3 px-4 py-2 rounded-full shadow-[4px_4px_10px_#b8bcc6,-4px_-4px_10px_#ffffff]
                                ${
                                    location.pathname === path
                                        ? "bg-blue-400 text-white"
                                        : "hover:shadow-[6px_6px_12px_#b8bcc6,-6px_-6px_12px_#ffffff]"
                                }`}
                        >
                            {React.cloneElement(icon, {
                                className: "text-blue-500 hover:text-blue-700",
                            })}

                            <Link
                                to={path}
                                className="text-lg font-medium"
                            >
                                {text}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Additional Features */}
                <div className="flex items-center gap-4">
                    {/* Gems Counter */}
                    <div
                        className="flex items-center gap-2 bg-blue-400 text-white px-3 py-2 rounded-full"
                    >
                        <FaGem size={22} className="text-yellow-400" />
                        <span className="font-bold text-lg">{gems}</span>
                    </div>

                    {/* Notification Icon with Dropdown */}
                    <div className="relative" ref={notificationRef}>
                        <button
                            onClick={toggleNotification}
                            className="relative rounded-full p-2 shadow hover:scale-110 transition-transform"
                        >
                            <FaBell size={24} />
                            {notifications.some((n) => !n.isRead) && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 animate-bounce">
                                    {notifications.filter((n) => !n.isRead).length}
                                </span>
                            )}
                        </button>

                        {/* Notification Dropdown */}
                        {isNotificationOpen && (
                            <div
                                className="absolute bg-white text-blue-700 rounded-lg shadow-md p-3 top-12 right-0 w-72 z-10 max-h-80 overflow-y-auto"
                            >
                                {notifications.length > 0 ? (
                                    notifications.map(({ id, message, isRead, time }) => (
                                        <div
                                            key={id}
                                            className={`flex items-center justify-between p-3 rounded-lg border-b-2
                                            ${isRead ? "bg-blue-50" : "bg-blue-200"}`}
                                        >
                                            <div>
                                                <p className={`text-md ${isRead ? "text-blue-500" : "text-blue-700 font-bold"}`}>
                                                    {message}
                                                </p>
                                                <span className="text-sm text-gray-500">{time}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-blue-500 italic">
                                        No new notifications 🎉
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* Dark Mode Toggle */}
                    <button
                        className={`rounded-full p-2 shadow hover:scale-110 transition-transform`}
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? <FaSun size={24} className="text-yellow-400" /> : <FaMoon size={24} className="text-blue-500" />}
                    </button>

                    {/* Profile Dropdown with Click Toggle */}
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            <img
                                src={userProfile.avatar}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <span className="font-semibold">{userProfile.name.split(" ")[0]}</span>
                        </div>

                        {/* Profile Dropdown Menu */}
                        {isDropdownOpen && (
                            <div
                                className="absolute bg-white text-blue-700 rounded-lg shadow-md p-4 top-12 right-0 w-72 z-10"
                            >
                                <div className="flex items-center gap-3 border-b pb-3">
                                    <img
                                        src={userProfile.avatar}
                                        alt="User Avatar"
                                        className="w-14 h-14 rounded-full border-2 border-blue-400"
                                    />
                                    <div>
                                        <h3 className="font-bold text-lg">{userProfile.name}</h3>
                                        <p className="text-sm text-gray-500">{userProfile.email}</p>
                                    </div>
                                </div>
                                <Link to="/profile" className="flex items-center gap-2 p-3 hover:bg-blue-100 rounded-md">
                                    <FaUser /> Profile
                                </Link>
                                <Link to="/settings" className="flex items-center gap-2 p-3 hover:bg-blue-100 rounded-md">
                                    <FaCog /> Settings
                                </Link>
                                <Link to="/logout" className="flex items-center gap-2 p-3 text-red-500 hover:bg-red-100 rounded-md">
                                    <FaSignOutAlt /> Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
