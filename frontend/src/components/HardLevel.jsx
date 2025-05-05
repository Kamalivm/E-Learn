import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const HardLevel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [stars, setStars] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem('username') || "");
    const [timeLeft, setTimeLeft] = useState(10); // Timer starts with 10 seconds per question
    const [timerActive, setTimerActive] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUsername(decoded.username);
        }
    }, []);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("http://localhost:8000/ques/questions");
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    // Timer logic for the harder level
    useEffect(() => {
        let timer;
        if (timerActive && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            handleNext();
        }

        return () => clearInterval(timer);
    }, [timeLeft, timerActive]);

    // Update gems when stars change
    useEffect(() => {
        if (stars > 0) {
            const updateGems = async () => {
                try {
                    const response = await fetch("http://localhost:8000/user/update-gems", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username, points: stars }),
                    });

                    if (!response.ok) {
                        throw new Error("Failed to update gems");
                    }

                    const data = await response.json();
                    console.log(data.message); // Handle the response data
                } catch (error) {
                    console.error("Error updating gems:", error);
                }
            };

            updateGems();
        }
    }, [stars, username]);

    // Handle option selection
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        const currentQuestion = questions[currentIndex];

        if (currentQuestion && option === currentQuestion.answer) {
            setIsCorrect(true);
            setStars(stars + 1);
            setTimeout(() => {
                setIsCorrect(false);
                handleNext();
            }, 2000);
        } else {
            setIsCorrect(false);
        }
    };

    // Handle next question
    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption("");
            setTimeLeft(10); // Reset the timer for the next question
        }
    };

    // Handle previous question
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedOption("");
            setTimeLeft(10); // Reset the timer for the previous question
        }
    };

    // If no questions are loaded yet, show loading message
    if (questions.length === 0) {
        return (
            <div className="bg-white min-h-screen p-6 text-center">
                <h2 className="text-3xl font-extrabold text-blue-800 mb-6 drop-shadow-lg">
                    🐾 Loading Questions...
                </h2>
            </div>
        );
    }

    // Handle current question
    const currentQuestion = questions[currentIndex];

    return (
        <div className="bg-white min-h-screen p-6 text-center">
            <h2 className="text-5xl font-extrabold text-blue-800 mb-6 drop-shadow-lg">
                🐾 Identify the Answer (Hard Mode)!
            </h2>

            <div className="w-full bg-gray-300 rounded-full h-4 mb-6 shadow-inner">
                <div
                    className="bg-red-500 h-4 rounded-full"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-xl border-4 border-blue-400 relative w-80 mx-auto mb-6">
                <h3 className="text-2xl font-bold text-center mb-4">
                    {currentQuestion?.question}
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {currentQuestion?.options.map((option) => (
                    <button
                        key={option}
                        className={`px-6 py-3 text-lg font-bold rounded-lg transition-transform transform hover:scale-105 ${
                            selectedOption === option
                                ? option === currentQuestion.answer
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                : "bg-blue-200 text-blue-800 hover:bg-blue-300"
                        }`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="flex justify-center items-center gap-6">
                {currentIndex > 0 && (
                    <button
                        onClick={handlePrev}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
                    >
                        <FaArrowLeft /> Prev
                    </button>
                )}

                {currentIndex < questions.length - 1 && (
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                    >
                        Next <FaArrowRight />
                    </button>
                )}
            </div>

            {isCorrect && (
                <div className="mt-4 text-3xl text-green-500 font-bold animate-bounce">
                    🎉 Awesome! 🎉
                </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-2 text-yellow-500 text-3xl font-bold">
                ⭐ {stars} Stars Collected
            </div>

            {/* Timer */}
            <div className="mt-4 text-2xl font-bold text-red-600">
                Time Left: {timeLeft}s
            </div>
        </div>
    );
};

export default HardLevel;
