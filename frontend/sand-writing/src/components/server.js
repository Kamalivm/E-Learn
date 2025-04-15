

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const Tesseract = require("tesseract.js");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" })); // Increase payload size limit

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Image upload and text recognition route
app.post("/recognize", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imagePath = req.file.path;

  // Run OCR on the uploaded image
  Tesseract.recognize(imagePath, "eng")
    .then(({ data: { text } }) => {
      console.log("✅ Extracted Text:", text); 
      res.json({ text });
    })
    .catch((error) => {
      console.error("❌ Error extracting text:", error);
      res.status(500).json({ error: "Text extraction failed" });
    })
    .finally(() => {
      fs.unlinkSync(imagePath); // Remove the uploaded image after processing
    });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
