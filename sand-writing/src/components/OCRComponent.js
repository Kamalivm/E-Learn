import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OCRComponent = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("Recognized text will appear here...");
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const recognizeText = async () => {
        if (!image) {
            alert("Please upload an image first!");
            return;
        }

        setLoading(true);
        setText("Recognizing...");

        Tesseract.recognize(image, "eng", {
            langPath: "https://tessdata.best/",
            traineddata: "eng.traineddata",
        })
        .then(({ data: { text } }) => {
            setText(text);
        })
        .catch((error) => {
            console.error("OCR Error:", error);
            setText("Error recognizing text.");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div>
            <h2>Image to Text OCR</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <img src={image} alt="Uploaded" width="300" />}
            <br />
            <button onClick={recognizeText} disabled={loading}>
                {loading ? "Processing..." : "Recognize Text"}
            </button>
            <p><strong>Extracted Text:</strong> {text}</p>
        </div>
    );
};

export default OCRComponent;
