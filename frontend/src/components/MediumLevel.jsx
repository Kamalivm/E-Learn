import { useState } from "react";
import { FaVolumeUp, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Image imports
import number6Img from "/src/assets/number6.png";
import number7Img from "/src/assets/number7.jpeg";
import number8Img from "/src/assets/number8.jpeg";
import number10Img from "/src/assets/number10.jpg";
import triangleImg from "/src/assets/triangle.jpg";
import circleImg from "/src/assets/circle.jpeg";
import squareImg from "/src/assets/square.jpg";
import carImg from "/src/assets/car.jpg";
import tigerImg from "/src/assets/tiger.jpeg";
import chairImg from "/src/assets/chair.jpg";
import coldImg from "/src/assets/cold.jpg";
import warmImg from "/src/assets/warm.jpg";
import fireImg from "/src/assets/fire.jpg";
import helpImg from "/src/assets/help.jpeg";
import laughImg from "/src/assets/laugh.jpeg";
import ignoreImg from "/src/assets/ignore.png";
import potatoImg from "/src/assets/potato.jpeg";
import appleImg from "/src/assets/apple.jpg";
import orangeImg from "/src/assets/orange.jpeg";
import bImg from "/src/assets/b.png";
import aImg from "/src/assets/a.png";
import lImg from "/src/assets/l.png";
import starImg from "/src/assets/star.jpeg";
import pencilImg from "/src/assets/pencil.jpeg";

const mediumQuestions = [
    {
        question: "What comes after 5?",
        imageOptions: [{ img: number6Img }, { img: number7Img }, { img: number8Img }],
        correctAnswer: number6Img,
    },
    {
        question: "Which shape has 3 sides?",
        imageOptions: [{ img: circleImg }, { img: squareImg }, { img: triangleImg }],
        correctAnswer: triangleImg,
    },
    {
        question: "Which is a vehicle?",
        imageOptions: [{ img: tigerImg }, { img: carImg }, { img: chairImg }],
        correctAnswer: carImg,
    },
    {
        question: "What is opposite of hot?",
        imageOptions: [{ img: coldImg }, { img: warmImg }, { img: fireImg }],
        correctAnswer: coldImg,
    },
    {
        question: "If your friend is crying, what should you do?",
        imageOptions: [{ img: laughImg }, { img: ignoreImg }, { img: helpImg }],
        correctAnswer: helpImg,
    },
    {
        question: "Apple, Orange, Potato – Pick the odd one",
        imageOptions: [{ img: appleImg }, { img: orangeImg }, { img: potatoImg }],
        correctAnswer: potatoImg,
    },
    {
        question: "2, 4, 6, __?",
        imageOptions: [{ img: number7Img }, { img: number8Img }, { img: number10Img }],
        correctAnswer: number8Img,
    },
    {
        question: "What is the first letter of 'Ball'?",
        imageOptions: [{ img: bImg }, { img: aImg }, { img: lImg }],
        correctAnswer: bImg,
    },
    {
        question: "Which one is a shape?",
        imageOptions: [{ img: appleImg }, { img: starImg }, { img: pencilImg }],
        correctAnswer: starImg,
    },
    ];

const MediumLevel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImg, setSelectedImg] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [stars, setStars] = useState(0);

    const currentQuestion = mediumQuestions[currentIndex];

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
        if (currentIndex < mediumQuestions.length - 1) {
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
            🎯 Medium Level Quiz
        </h1>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl bg-gray-200 rounded-full h-5 mb-8 shadow-inner relative">
            <div
            className="bg-green-400 h-5 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / mediumQuestions.length) * 100}%` }}
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
            {currentIndex < mediumQuestions.length - 1 && (
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

export default MediumLevel;
