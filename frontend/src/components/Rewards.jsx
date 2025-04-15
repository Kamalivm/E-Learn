import React from 'react';
import { FaGem, FaMedal, FaTrophy, FaGift, FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Rewards = () => {
    const rewards = [
        {
            icon: <FaMedal size={40} className="text-blue-500" />,
            title: "🎖️ Badges",
            description: "Earn unique badges for completing levels and streaks.",
            example: "Example: Math Master, Alphabet Ace"
        },
        {
            icon: <FaGem size={40} className="text-yellow-400" />,
            title: "💎 Gems",
            description: "Collect gems by answering questions correctly and completing challenges.",
            example: "Example: Earn 100 Gems for a 7-Day Streak!"
        },
        {
            icon: <FaTrophy size={40} className="text-orange-500" />,
            title: "🏆 Trophies",
            description: "Unlock trophies by achieving milestones like 100% progress in a topic.",
            example: "Example: Counting Champion Trophy"
        },
        {
            icon: <FaGift size={40} className="text-pink-400 animate-spin-slow" />,
            title: "🎁 Surprise Gifts",
            description: "Complete bonus challenges or milestones for special surprises.",
            example: "Example: Mystery Gift Box — Open to Reveal!"
        }
    ];

    const streakRewards = [
        { days: "3-Day Streak", reward: "+20 Gems" },
        { days: "7-Day Streak", reward: "+1 Special Badge" },
        { days: "14-Day Streak", reward: "+1 Surprise Gift" },
        { days: "30-Day Streak", reward: "+1 Golden Trophy + 100 Gems" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-6">
            {/* Heading */}
            <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-6">
                🌟 Unlock Achievements & Earn Exciting Rewards!
            </h2>

            {/* Introduction */}
            <p className="text-center text-lg text-blue-600 mb-8">
                "Your hard work deserves a celebration! Earn gems, badges, and trophies as you progress. Stay consistent and watch your achievements grow!"
            </p>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rewards.map((reward, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-md border border-blue-300/60 text-center transform hover:scale-105
                                    transition duration-300"
                    >
                        <div className="mb-4">{reward.icon}</div>
                        <h3 className="text-xl font-bold text-blue-700">{reward.title}</h3>
                        <p className="text-gray-600 mt-2">{reward.description}</p>
                        <p className="text-sm text-blue-500 mt-1 italic">{reward.example}</p>
                    </div>
                ))}
            </div>

            {/* Streak Rewards Section */}
            <div className="mt-12 bg-white p-6 rounded-xl shadow-md border border-blue-300/60">
                <h3 className="text-3xl font-bold text-blue-700 text-center mb-4">
                    🔥 Streak Milestones
                </h3>
                <p className="text-center text-blue-600 mb-6">
                    "Maintain a daily streak to win exclusive rewards!"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {streakRewards.map((streak, index) => (
                        <div
                            key={index}
                            className="bg-blue-50 p-4 rounded-lg flex justify-between 
                                        items-center shadow-md border border-blue-300/60"
                        >
                            <span className="font-semibold text-blue-600">{streak.days}</span>
                            <span className="font-bold text-blue-700">{streak.reward}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 text-center">
                <Link to="/">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg 
                                        hover:bg-blue-600 transform hover:scale-105 
                                        transition">
                        Start Learning & Collect Rewards 🚀
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Rewards;
