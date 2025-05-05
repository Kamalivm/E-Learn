import { useState } from "react";
import { FaVolumeUp, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Animal and concept images
import catImage from "/src/assets/cat.jpg";
import dogImage from "/src/assets/dog.jpg";
import elephantImage from "/src/assets/elephant.jpg";
import appleImage from "/src/assets/apple.jpg";
import mangoImage from "/src/assets/mango.webp";
import carImage from "/src/assets/car.jpg";
import pencilImage from "/src/assets/pencil.jpeg";
import bookImage from "/src/assets/book.jpeg";
import batImage from "/src/assets/bat.jpeg";
import sunImage from "/src/assets/sun.jpeg";
import moonImage from "/src/assets/moon.jpeg";
import starImage from "/src/assets/star.jpeg";
import aImg from "/src/assets/a.png";
import bImg from "/src/assets/b.png";
import cImg from "/src/assets/c.png";
import dImg from "/src/assets/d.png";
import happyImg from "/src/assets/happy.jpg";
import sadImg from "/src/assets/sad.jpg";
import angryImg from "/src/assets/angry.jpg";
import redImg from "/src/assets/red.jpg"
import blueImg from "/src/assets/blue.jpg"
import yellowImg from "/src/assets/yellow.jpeg"
import circleImg from "/src/assets/circle.jpeg"
import triangleImg from "/src/assets/triangle.jpg"
import squareImg from "/src/assets/square.jpg"


const questions = [
    {
        question: "Which one is a cat? (Visual recognition)",
        imageOptions: [
            { img: dogImage },
            { img: catImage },
            { img: elephantImage },
        ],
        correctAnswer: catImage,
    },
    {
        question: "Which one is a fruit? (Academic & language)",
        imageOptions: [
            { img: appleImage },
            { img: mangoImage },
            { img: carImage },
        ],
        correctAnswer: appleImage,
    },
    {
        question: "Which is used to write? (Academic & language)",
        imageOptions: [
            { img: bookImage },
            { img: pencilImage },
            { img: batImage },
        ],
        correctAnswer: pencilImage,
    },
    {
        question: "Which shines in the day? (Academic & language)",
        imageOptions: [
            { img: sunImage },
            { img: moonImage },
            { img: starImage },
        ],
        correctAnswer: sunImage,
    },
    {
        question: "Which is the letter A? (Academic & language)",
        imageOptions: [
            { img: aImg },
            { img: bImg },
            { img: cImg },
        ],
        correctAnswer: aImg,
    },
    {
        question: "Which face is happy? (Emotional & social)",
        imageOptions: [
            { img: sadImg },
            { img: happyImg },
            { img: angryImg },
        ],
        correctAnswer: happyImg,
    },
    {
        question: "Pick the blue color (Visual recognition)",
        imageOptions: [
            { img: redImg },
            { img: blueImg },
            { img: yellowImg },
        ],
        correctAnswer: blueImg,
    },
    {
        question: "Which is round? (Visual recognition)",
        imageOptions: [
            { img: circleImg },
            { img: triangleImg },
            { img: squareImg },
        ],
        correctAnswer: happyImg,
    },
    {
        question: "Which letter comes first? (Sequencing)",
        imageOptions: [
            { img: aImg },
            { img: bImg },
            { img: cImg },
            { img: dImg }
        ],
        correctAnswer: aImg,
    },
    {
        question: "Which color is different? (Pattern recognition)",
        imageOptions: [
            { img: blueImg },
            { img: blueImg },
            { img: redImg },
            { img: blueImg },
        ],
        correctAnswer: redImg,
    },
];

const EasyLevel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImg, setSelectedImg] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [stars, setStars] = useState(0);

    const currentQuestion = questions[currentIndex];

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
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedImg(null);
        }
    };

    // Handle previous question
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedImg(null);
        }
    };

    const speakQuestion = () => {
        const speech = new SpeechSynthesisUtterance("Find the right option");
        speech.lang = "en-US";
        speech.rate = 0.8;
        window.speechSynthesis.speak(speech);
    };

    return (
        <div className="min-h-screen bg-white px-4 py-6 flex flex-col items-center">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 text-center drop-shadow-sm">
                🎈 Let's Play & Learn!
            </h1>
    
            {/* Progress Bar */}
            <div className="w-full max-w-2xl bg-gray-200 rounded-full h-5 mb-8 shadow-inner relative">
                <div
                    className="bg-green-400 h-5 rounded-full transition-all duration-500"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
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
                {currentIndex < questions.length - 1 && (
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
}

export default EasyLevel;

