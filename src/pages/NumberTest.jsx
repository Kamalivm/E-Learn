import { useState } from "react";
import { FaVolumeUp, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

import applesImage from "/src/assets/apples.webp";
import starsImage from "/src/assets/stars.webp";
import handImage from "/src/assets/hand.webp";

const numberQuestions = [
    {
        question: "How many apples are there?",
        image: applesImage,
        correctAnswer: "3",
        options: ["2", "3", "4", "5"]
    },
    {
        question: "Count the stars!",
        image: starsImage,
        correctAnswer: "4",
        options: ["3", "4", "5", "6"]
    },
    {
        question: "How many fingers am I holding up?",
        image: handImage,
        correctAnswer: "5",
        options: ["4", "5", "6", "7"]
    }
];

const NumberTest = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [stars, setStars] = useState(0);

    const handleOptionClick = (option) => {
        setSelectedOption(option);

        if (option === numberQuestions[currentIndex].correctAnswer) {
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

    const handleNext = () => {
        if (currentIndex < numberQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption("");
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedOption("");
        }
    };

    const speakQuestion = () => {
        const speech = new SpeechSynthesisUtterance(numberQuestions[currentIndex].question);
        speech.lang = "en-US";
        speech.rate = 0.8;
        window.speechSynthesis.speak(speech);
    };

    return (
        <div className="bg-white min-h-screen p-6 text-center">
            
            <h2 className="text-5xl font-extrabold text-blue-800 mb-6 drop-shadow-lg">
                🔢 Number Testing Quiz
            </h2>

            <div className="w-full bg-gray-300 rounded-full h-4 mb-6 shadow-inner">
                <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${((currentIndex + 1) / numberQuestions.length) * 100}%` }}
                ></div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-xl border-4 border-blue-400 relative w-80 h-80 mx-auto mb-6">
                <img
                    src={numberQuestions[currentIndex].image}
                    alt="Visual clue"
                    className="w-full h-full object-cover rounded-xl"
                />
                <button
                    onClick={speakQuestion}
                    className="absolute top-3 right-3 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600"
                >
                    <FaVolumeUp size={24} />
                </button>
            </div>

            <h3 className="text-2xl font-bold text-blue-600 mb-4">
                {numberQuestions[currentIndex].question}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {numberQuestions[currentIndex].options.map((option) => (
                    <button
                        key={option}
                        className={`px-6 py-3 text-lg font-bold rounded-lg transition-transform transform hover:scale-105 ${
                            selectedOption === option
                                ? option === numberQuestions[currentIndex].correctAnswer
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

                {currentIndex < numberQuestions.length - 1 && (
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
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
        </div>
    );
};

export default NumberTest;
