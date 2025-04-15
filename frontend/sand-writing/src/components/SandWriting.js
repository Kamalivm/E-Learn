import React, { useRef, useState } from "react";
import axios from "axios";

const SandWriting = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [penSize, setPenSize] = useState(5); // ✅ Default pen size

  // Start drawing
  const startDrawing = (event) => {
    setDrawing(true);
    draw(event);
  };

  // Drawing function
  const draw = (event) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.fillStyle = "rgb(255, 255, 255)"; // ✅ Pen color: Half white
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(255, 255, 255, 0.3)"; // ✅ Light glow effect
    ctx.beginPath();
    ctx.arc(x, y, penSize / 2, 0, Math.PI * 2); // ✅ Draw a smooth circle
    ctx.fill();
  };

  // Stop drawing
  const stopDrawing = () => {
    setDrawing(false);
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Convert canvas to image and send to backend
  const handleExtractText = async () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png");
    const blob = await fetch(imageData).then((res) => res.blob());

    const formData = new FormData();
    formData.append("image", blob, "sandwriting.png");

    try {
      const response = await axios.post("http://localhost:5000/recognize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Extracted Text:", response.data.text); // Log text in console
    } catch (error) {
      console.error("❌ Error extracting text:", error);
    }
  };

  return (
    <div   style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "rgba(194, 163, 132, 0.9)", // ✅ Outside canvas background color
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ color: "#FFF", fontSize: "32px", textShadow: "2px 2px 5px rgba(0,0,0,0.5)" }}>
        Sand Writing Recognition
      </h1>

      {/* ✅ Pen Size Slider */}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ color: "white", fontSize: "18px", marginRight: "10px" }}>Pen Size:</label>
        <input
          type="range"
          min="2"
          max="20"
          value={penSize}
          onChange={(e) => setPenSize(e.target.value)}
          style={{ width: "150px", cursor: "pointer" }}
        />
        <span style={{ color: "white", marginLeft: "10px", fontSize: "18px" }}>{penSize}px</span>
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        style={{
          border: "4px solid #6D4C41",
          backgroundImage: "url('/sand.jpg')", // ✅ Background image for canvas (writing area)
          backgroundSize: "cover",
          borderRadius: "10px",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
          cursor: "crosshair",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
      />

      <div style={{ marginTop: "15px" }}>
        <button
          onClick={handleExtractText}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6D4C41",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginRight: "10px",
            boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          ✨ Recognize Text
        </button>

        <button
          onClick={clearCanvas}
          style={{
            padding: "10px 20px",
            backgroundColor: "#D2691E",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "3px 3px 8px rgba(83, 72, 72, 0.2)",
          }}
        >
          ❌ Clear
        </button>
      </div>
    </div>
  );
};

export default SandWriting;
