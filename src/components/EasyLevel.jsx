import { useState } from "react";
import { FaVolumeUp, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

import catImage from "/src/assets/cat.jpg";
import dogImage from "/src/assets/dog.jpg";
import elephantImage from "/src/assets/elephant.jpg";

const animalQuestions = [
    { image: catImage, correctAnswer: "Cat", options: ["Cat", "Dog", "Elephant", "Tiger"] },
    { image: dogImage, correctAnswer: "Dog", options: ["Lion", "Dog", "Bear", "Cow"] },
    { image: elephantImage, correctAnswer: "Elephant", options: ["Elephant", "Zebra", "Giraffe", "Horse"] },
];

const EasyLevel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [stars, setStars] = useState(0);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        if (option === animalQuestions[currentIndex].correctAnswer) {
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
        if (currentIndex < animalQuestions.length - 1) {
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

    const speakAnimalName = () => {
        const speech = new SpeechSynthesisUtterance(animalQuestions[currentIndex].correctAnswer);
        speech.lang = "en-US";
        speech.rate = 0.8;
        window.speechSynthesis.speak(speech);
    };

    return (
        <div className="bg-white min-h-screen p-6 text-center">
            {/* Header */}
            <h2 className="text-5xl font-extrabold text-blue-800 mb-6 drop-shadow-lg">
                🐾 Identify the Animal!
            </h2>

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 rounded-full h-4 mb-6 shadow-inner">
                <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${((currentIndex + 1) / animalQuestions.length) * 100}%` }}
                ></div>
            </div>

            {/* Animal Image & Speaker */}
            <div className="bg-white rounded-2xl p-5 shadow-xl border-4 border-blue-400 relative w-80 h-80 mx-auto mb-6">
                <img
                    src={animalQuestions[currentIndex].image}
                    alt="Animal"
                    className="w-full h-full object-cover rounded-xl"
                />
                <button
                    onClick={speakAnimalName}
                    className="absolute top-3 right-3 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600"
                >
                    <FaVolumeUp size={24} />
                </button>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {animalQuestions[currentIndex].options.map((option) => (
                    <button
                        key={option}
                        className={`px-6 py-3 text-lg font-bold rounded-lg transition-transform transform hover:scale-105 ${
                            selectedOption === option
                                ? option === animalQuestions[currentIndex].correctAnswer
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

            {/* Navigation & Reward System */}
            <div className="flex justify-center items-center gap-6">
                {currentIndex > 0 && (
                    <button
                        onClick={handlePrev}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
                    >
                        <FaArrowLeft /> Prev
                    </button>
                )}

                {currentIndex < animalQuestions.length - 1 && (
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                    >
                        Next <FaArrowRight />
                    </button>
                )}
            </div>

            {/* Feedback & Stars */}
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

export default EasyLevel;