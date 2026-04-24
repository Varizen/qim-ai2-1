import "../config.js";
import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "storage/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { purpose } = req.body;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // TODO: process file → embeddings
    console.log("Uploaded:", req.file.filename, purpose);

    res.json({ success: true, filename: req.file.filename });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Upload failed." });
  }
});

router.delete("/delete/:id", async (req, res) => {
  // remove from DB + vector store
  res.json({ removed: true });
});

export default router;
