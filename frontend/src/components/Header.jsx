import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {FaHome, FaGraduationCap, FaUser, FaGift, FaCog, 
    FaSignOutAlt, FaMoon, FaSun, FaGem, FaSignInAlt
} from "react-icons/fa";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    const [gems, setGems] = useState(250);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
    const [userProfile, setUserProfile] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || {
            name: "Guest",
            email: "guest@example.com",
            avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        };
    });

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUserProfile({
            name: "Guest",
            email: "guest@example.com",
            avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        });
        setIsDropdownOpen(false);
        setTimeout(() => {
            navigate("/");
        }, 100);
    };

    useEffect(() => {
        const checkLoginStatus = () => {
            const user = JSON.parse(localStorage.getItem("user"));
            setIsLoggedIn(!!user);
            if (user) setUserProfile(user);
        };
        checkLoginStatus();
        window.addEventListener("storage", checkLoginStatus);

        return () => window.removeEventListener("storage", checkLoginStatus);
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setIsLoggedIn(true);
            setUserProfile(user);
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className={`p-4 rounded-full mx-4 mt-4 shadow-md transition-colors 
                            ${darkMode ? "bg-gray-800 text-white" : "bg-blue-100 text-blue-700"}`}>
            <div className="flex justify-between items-center">
                
                <button onClick={() => navigate("/")} className="text-3xl font-extrabold flex items-center gap-2">
                    🧠 KidsLearn
                </button>

                <ul className="flex items-center gap-8">
                    {[{ icon: <FaHome />, text: "Home", path: "/" },
                        { icon: <FaGraduationCap />, text: "Learning", path: "/learning" },
                        { icon: <FaGift />, text: "Rewards", path: "/rewards" }].map(({ icon, text, path }) => (
                        <li key={text} className={`flex items-center gap-3 px-4 py-2 rounded-full
                                                    ${location.pathname === path ? "bg-blue-400 text-white" : "hover:bg-blue-200"}`}>
                            {icon}
                            <Link to={path} className="text-lg font-medium">{text}</Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4">

                    <div className="flex items-center gap-2 bg-blue-400 text-white px-3 py-2 rounded-full">
                        <FaGem size={22} className="text-yellow-400" />
                        <span className="font-bold text-lg">{gems}</span>
                    </div>

                    <button className="rounded-full p-2 shadow hover:scale-110 transition-transform" onClick={toggleDarkMode}>
                        {darkMode ? <FaSun size={24} className="text-yellow-400" /> : <FaMoon size={24} className="text-blue-500" />}
                    </button>

                    <div className="relative" ref={dropdownRef}>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <img src={userProfile.avatar} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-white" />
                            <span className="font-semibold">{isLoggedIn ? userProfile.name.split(" ")[0] : "Guest"}</span>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute bg-white text-blue-700 rounded-lg shadow-md p-4 top-12 right-0 w-72 z-10">
                                
                                <div className="flex items-center gap-3 border-b pb-3">
                                    <img src={userProfile.avatar} alt="User Avatar" className="w-14 h-14 rounded-full border-2 border-blue-400" />
                                    <div>
                                        <h3 className="font-bold text-lg">{userProfile.name}</h3>
                                        <p className="text-sm text-gray-500">{userProfile.email}</p>
                                    </div>
                                </div>

                                <Link to="/profile" className="flex items-center gap-2 p-3 hover:bg-blue-100 rounded-md" onClick={() => setIsDropdownOpen(false)}>
                                    <FaUser /> Profile
                                </Link>

                                <Link to="/settings" className="flex items-center gap-2 p-3 hover:bg-blue-100 rounded-md" onClick={() => setIsDropdownOpen(false)}>
                                    <FaCog /> Settings
                                </Link>

                                {isLoggedIn ? (
                                    <button onClick={handleLogout} className="flex items-center gap-2 p-3 text-red-500 hover:bg-red-100 rounded-md w-full">
                                        <FaSignOutAlt /> Logout
                                    </button>
                                ) : (
                                    <Link to="/signin" className="flex items-center gap-2 p-3 text-blue-500 hover:bg-blue-100 rounded-md" onClick={() => setIsDropdownOpen(false)}>
                                        <FaSignInAlt /> Login
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;