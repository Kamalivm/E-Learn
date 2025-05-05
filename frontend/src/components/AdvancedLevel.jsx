import { useState } from "react";
import { FaVolumeUp, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

import number1Img from "/src/assets/number1.png"
import number2Img from "/src/assets/number2.png"
import number3Img from "/src/assets/number3.png"
import number5Img from "/src/assets/number5.png"
import number6Img from "/src/assets/number6.png"
import number7Img from "/src/assets/number7.jpeg"
import number8Img from "/src/assets/number8.jpeg"
import number9Img from "/src/assets/number9.png"
import blueImg from "/src/assets/blue.jpg"
import yellowImg from "/src/assets/yellow.jpeg"
import redImg from "/src/assets/red.jpg"
import bImg from "/src/assets/b.png"
import cImg from "/src/assets/c.png"
import dImg from "/src/assets/d.png"


const advancedQuestions = [
    {
        question: "What is 4 + 3?",
        imageOptions: [
            { img: number6Img },
            { img: number7Img },
            { img: number8Img }
        ],
        correctAnswer: number7Img,
    },
    {
        question: "Which is greater: 8 or 5?",
        imageOptions: [
            { img: number5Img },
            { img: number8Img },
            { img: number3Img }
        ],
        correctAnswer: number8Img,
    },
    {
        question: "Fill in the blank: A, B, C, __?",
        imageOptions: [
            { img: bImg },
            { img: dImg },
            { img: cImg }
        ],
        correctAnswer: dImg,
    },
    // {
    //     question: "Arrange: Brush → Eat → School → Sleep",
    //     imageOptions: [
    //         { img: routineImg1 }, // Image showing the correct sequence visually
    //         { img: routineImg2 }, // Incorrect
    //         { img: routineImg3 }  // Incorrect
    //     ],
    //     correctAnswer: routineImg1,
    // },
    {
        question: "10 - 4 = ?",
        imageOptions: [
            { img: number6Img },
            { img: number5Img },
            { img: number7Img }
        ],
        correctAnswer: number6Img,
    },
    // {
    //     question: "Match: Cat → Meow, Dog → Bark, Duck → Quack",
    //     imageOptions: [
    //         { img: matchCorrectImg }, // Image showing the correct matching
    //         { img: matchWrong1Img },
    //         { img: matchWrong2Img }
    //     ],
    //     correctAnswer: matchCorrectImg,
    // },
    {
        question: "Pattern: 🔵🔴🔵🔴 __?",
        imageOptions: [
            { img: blueImg },
            { img: redImg },
            { img: yellowImg }
        ],
        correctAnswer: blueImg,
    },
    {
        question: "3 apples, eat 1. How many left?",
        imageOptions: [
            { img: number1Img },
            { img: number2Img },
            { img: number3Img }
        ],
        correctAnswer: number2Img,
    },
    // {
    //     question: "What is the plural of 'Toy'?",
    //     imageOptions: [
    //         { img: toyImg },
    //         { img: toysImg },
    //         { img: toyzImg }
    //     ],
    //     correctAnswer: toysImg,
    // },
    {
        question: "Which number is even?",
        imageOptions: [
            { img: number3Img },
            { img: number6Img },
            { img: number9Img }
        ],
        correctAnswer: number6Img,
    },
];

const AdvancedLevel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImg, setSelectedImg] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [stars, setStars] = useState(0);

    const currentQuestion = advancedQuestions[currentIndex];

    const handleOptionClick = (img) => {
        setSelectedImg(img);
        if (img === currentQuestion.correctAnswer) {
        setIsCorrect(true);
        setStars((prev) => prev + 1);
        setTimeout(() => {
            setIsCorrect(false);
            handleNext();
        }, 2000);
        } else {
        setIsCorrect(false);
        }
    };

    const handleNext = () => {
        if (currentIndex < advancedQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedImg(null);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setSelectedImg(null);
        }
    };

    const speakQuestion = () => {
        const speech = new SpeechSynthesisUtterance(currentQuestion.question);
        speech.lang = "en-US";
        speech.rate = 0.8;
        window.speechSynthesis.speak(speech);
    };

    return (
        <div className="min-h-screen bg-white px-4 py-6 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 text-center drop-shadow-sm">
            🎯 Advanced Level Quiz
        </h1>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl bg-gray-200 rounded-full h-5 mb-8 shadow-inner relative">
            <div
            className="bg-green-400 h-5 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / advancedQuestions.length) * 100}%` }}
            ></div>
        </div>

        {/* Question Box */}
        <div className="bg-yellow-100 border-4 border-yellow-300 rounded-xl px-6 py-4 mb-6 shadow-lg max-w-3xl text-center">
            <div className="flex justify-center items-center gap-4 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {currentQuestion.question}
                </h2>
                <button
                    onClick={speakQuestion}
                    className="bg-blue-400 text-white px-4 py-2 rounded-full shadow hover:bg-blue-500 transition"
                >
                    <FaVolumeUp className="inline-block" />
                </button>
            </div>
        </div>

        {/* Image Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
            {currentQuestion.imageOptions.map(({ img }, index) => (
            <button
                key={index}
                onClick={() => handleOptionClick(img)}
                className={`rounded-2xl p-3 border-4 transition-transform transform hover:scale-105 shadow-lg ${
                selectedImg === img
                    ? img === currentQuestion.correctAnswer
                    ? "border-green-500"
                    : "border-red-500"
                    : "border-transparent"
                }`}
            >
                <img
                src={img}
                alt="Option"
                className="w-64 h-64 object-cover rounded-xl"
                />
            </button>
            ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-6 mb-6">
            {currentIndex > 0 && (
            <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-6 py-3 bg-gray-400 text-white rounded-full shadow-md hover:bg-gray-500 transition"
            >
                <FaArrowLeft /> Prev
            </button>
            )}
            {currentIndex < advancedQuestions.length - 1 && (
                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
                >
                    Next <FaArrowRight />
                </button>
            )}
        </div>

        {/* Correct Answer Feedback */}
        {isCorrect && (
            <div className="mt-4 text-3xl text-green-600 font-bold animate-bounce">
                🎉 Awesome! 🎉
            </div>
        )}

        {/* Star Counter */}
        <div className="mt-8 flex items-center justify-center gap-3 text-yellow-500 text-3xl font-bold bg-yellow-100 px-6 py-3 rounded-full shadow">
            <FaStar /> {stars} Stars Collected
        </div>
        </div>
    );
};

export default AdvancedLevel;
