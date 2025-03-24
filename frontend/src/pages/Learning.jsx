import { useNavigate } from "react-router-dom";
import { FaStar, FaLightbulb, FaRocket, FaGem } from "react-icons/fa";

const Learning = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-center p-6">

            {/* Title Section */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-blue-700 mb-2">
                    🚀 Choose Your Learning Level
                </h2>
                <p className="text-md text-blue-600 italic">
                    "Learning is an adventure — are you ready to begin?" 🌟
                </p>
            </div>

            {/* Level Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {/* Easy Level */}
                <div
                    className="bg-white shadow-lg border-2 border-green-400 rounded-2xl text-green-700 
                                p-4 flex flex-col items-center cursor-pointer
                                transform hover:scale-105 hover:bg-green-500 hover:text-white transition-all"
                    onClick={() => navigate("/easy")}
                >
                    <FaStar size={50} className="mb-3 text-yellow-400" />
                    <h3 className="text-2xl font-bold">Easy</h3>
                    <p className="text-sm mt-1 italic">"Start small, dream big!"</p>
                </div>

                {/* Medium Level */}
                <div
                    className="bg-white shadow-lg border-2 border-yellow-400 rounded-2xl text-yellow-700 
                                p-4 flex flex-col items-center cursor-pointer 
                                transform hover:scale-105 hover:bg-yellow-500 hover:text-white transition-all"
                    onClick={() => navigate("/medium")}
                >
                    <FaLightbulb size={50} className="mb-3 text-yellow-400 animate-spin-slow" />
                    <h3 className="text-2xl font-bold">Medium</h3>
                    <p className="text-sm mt-1 italic">"Unlock your thinking power!"</p>
                </div>

                {/* Advanced Level */}
                <div
                    className="bg-white shadow-lg border-2 border-red-400 rounded-2xl text-red-700 
                                p-4 flex flex-col items-center cursor-pointer 
                                transform hover:scale-105 hover:bg-red-500 hover:text-white transition-all"
                    onClick={() => navigate("/advanced")}
                >
                    <FaRocket size={50} className="mb-3 text-red-400 animate-zoom" />
                    <h3 className="text-2xl font-bold">Advanced</h3>
                    <p className="text-sm mt-1 italic">"Challenge yourself, be unstoppable!"</p>
                </div>
            </div>

            {/* Rewards Section */}
            <div className="mt-10 p-6 bg-white rounded-2xl shadow-md w-full max-w-3xl border-2 border-blue-400">
                <h3 className="text-3xl font-bold mb-3 text-blue-600">🎯 Earn Rewards!</h3>
                <p className="text-md mb-4">
                    Complete levels to win gems and unlock special achievements.
                </p>

                {/* Progress Bar for Motivation */}
                <div className="relative w-full bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
                    <div
                        className="bg-gradient-to-r from-yellow-400 to-green-400 h-6 rounded-full animate-progress"
                        style={{ width: "70%" }}
                    ></div>
                </div>

                <div className="flex justify-between text-sm text-blue-500 mt-2">
                    <span>Almost there! 🚀</span>
                    <span>70% Complete</span>
                </div>

                {/* Gem Count Display */}
                <div className="flex items-center justify-center mt-6 gap-2">
                    <FaGem size={40} className="text-yellow-400 animate-pulse" />
                    <p className="text-xl font-bold text-blue-600">250 Gems Collected!</p>
                </div>
            </div>
        </div>
    );
};

export default Learning;
