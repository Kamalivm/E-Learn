
import React from "react";
import SandWriting from "./components/SandWriting.jsx";

function SandApp() {
  return (
    <div style={{ textAlign: "center", padding: "20px", background: "#f8e4c1", minHeight: "100vh" }}>
      <h1 style={{ color: "#a57c55" }}>Sand Writing Recognition</h1>
      
      <SandWriting correctAnswer="cat" />
    </div>
  );
}

export default SandApp;
