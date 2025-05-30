import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
    
        if (!username || !password) {
            setError("⚠️ Please fill in all fields.");
            return;
        }

        console.log(username , password);
    
        try {
            const response = await fetch("http://localhost:8000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
 console.log("everything ok");
           
    
            if (!response.ok) {
                // If response is not ok, get the error message from the server
                const errorData = await response.json();
                setError(errorData.error || "Login failed. Please try again.");
                return;
            }
    
            const data = await response.json();
            alert(data.message);
    
            localStorage.setItem("token", data.token);
            navigate("/home");
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again.");
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-10 rounded-xl shadow-2xl w-[450px] text-center border border-gray-200">
                
                <h2 className="text-3xl font-bold text-blue-600">Welcome Back! 👋</h2>
                <p className="text-gray-500 text-lg mt-2">Sign in to continue</p>

                {error && (
                    <div className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md text-sm font-medium">
                        {error}
                    </div>
                )}

                <form className="mt-6" onSubmit={handleSignIn}>
                    
                    <div className="relative mt-4">
                        <FaUser className="absolute left-4 top-3 text-blue-400 text-xl" />
                        <input
                            type="text"
                            className="w-full px-12 py-3 border border-blue-300 rounded-lg bg-blue-50 text-gray-700 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-lg"
                            placeholder="Enter your Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="relative mt-4">
                        <FaLock className="absolute left-4 top-3 text-blue-400 text-xl" />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-12 py-3 border border-blue-300 rounded-lg bg-blue-50 text-gray-700 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-lg"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-3 text-blue-400 text-xl"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 mt-6 rounded-lg text-lg font-semibold hover:scale-105 transition-transform shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-lg text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 font-bold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;