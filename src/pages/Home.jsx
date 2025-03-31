import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVolumeUp } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/signin");
        }
    }, [navigate]);

    const speakText = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speech.rate = 0.9;
        window.speechSynthesis.speak(speech);
    };

    const LearningCard = ({ title, desc, progress, icon, color, onClick }) => (
        <div
            className={`relative ${color} p-6 rounded-xl shadow-md
                        bg-white border border-blue-400/40 
                        text-center w-full transform hover:scale-105 transition
                        cursor-pointer overflow-hidden`}
            onClick={onClick}
        >
            <div className="absolute top-3 right-3 text-3xl text-blue-500">{icon}</div>
            <h4 className="text-2xl font-bold text-blue-700">{title}</h4>
            <p className="text-lg text-gray-600">{desc}</p>

            <div className="bg-blue-100 w-full h-4 rounded-full mt-3 overflow-hidden shadow-inner">
                <div
                    className="bg-gradient-to-r from-blue-500 to-blue-700 h-4 rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <p className="text-md text-blue-600 mt-2">{progress}% complete</p>

            <button
                className="absolute bottom-3 right-3 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                onClick={(e) => {
                    e.stopPropagation();
                    speakText(`${title} - ${desc}`);
                }}
            >
                <FaVolumeUp />
            </button>
        </div>
    );

    if (!user) return null;

    return (
        <div className="bg-white min-h-screen p-6">
            
            <div
                className="bg-blue-500 text-white text-center py-6 px-6 rounded-xl shadow-md mt-4"
                onClick={() => speakText(`Welcome back, ${user.name}! Let's continue your learning journey.`)}
            >
                <h2 className="text-3xl font-bold">👋 Welcome back, {user.name}! 🌟</h2>
                <p className="text-lg">Let's continue your learning journey.</p>
            </div>

            <section className="mt-6 bg-white p-4 rounded-xl shadow-md border border-blue-400/40">
                <h3 className="text-3xl font-bold text-blue-700 mb-4">📚 Continue Learning</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <LearningCard title="123" desc="Numbers" progress={75} icon="🔢" color="bg-blue-50" onClick={() => navigate('/number-test')} />
                    <LearningCard title="ABC" desc="Alphabet" progress={40} icon="🔤" color="bg-blue-50" onClick={() => speakText('Alphabet - 40% complete')} />
                    <LearningCard title="Nature" desc="Nature" progress={10} icon="🌿" color="bg-blue-50" onClick={() => speakText('Nature - 10% complete')} />
                </div>
            </section>

            <section className="mt-6 bg-white p-4 rounded-xl shadow-md border border-blue-400/40">
                <h3 className="text-3xl font-bold text-red-500 mb-4">🔥 Daily Challenge</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <LearningCard title="Counting Adventure" desc="Count the animals and win a badge!" progress={50} icon="🦓" color="bg-blue-50" onClick={() => speakText('Counting Adventure - 50% complete')} />
                    <LearningCard title="Memory Master" desc="Match the pairs to win 100 gems!" progress={30} icon="🧠" color="bg-blue-50" onClick={() => speakText('Memory Master - 30% complete')} />
                    <LearningCard title="Shape Sorter" desc="Sort the shapes by color and size!" progress={60} icon="🔷" color="bg-blue-50" onClick={() => speakText('Shape Sorter - 60% complete')} />
                </div>
            </section>
        </div>
    );
};

export default Home;
