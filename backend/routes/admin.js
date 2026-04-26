import "../config.js";
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

// Ensure storage directory exists
const storageDir = path.join(process.cwd(), "storage");
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

const upload = multer({
  dest: storageDir,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "audio/mpeg",
      "audio/wav",
      "video/mp4",
      "video/webm",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed: ${file.mimetype}`));
    }
  },
});

// Simple admin token auth middleware
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

router.post("/upload", requireAuth, upload.single("file"), async (req, res) => {
  try {
    const { purpose } = req.body;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    console.log("Uploaded:", req.file.filename, purpose);
    res.json({ success: true, filename: req.file.filename, size: req.file.size });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Upload failed." });
  }
});

router.delete("/delete/:id", requireAuth, async (req, res) => {
  try {
    const filePath = path.join(storageDir, req.params.id);
    if (!filePath.startsWith(storageDir)) {
      return res.status(400).json({ error: "Invalid file ID" });
    }
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    // TODO: remove from vector store
    res.json({ removed: true });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ error: "Delete failed." });
  }
});

// List all uploaded files
router.get("/files", requireAuth, async (_req, res) => {
  try {
    const files = fs.readdirSync(storageDir).map((filename) => {
      const stats = fs.statSync(path.join(storageDir, filename));
      return {
        id: filename,
        filename,
        size: stats.size,
        createdAt: stats.birthtime,
      };
    });
    res.json({ files });
  } catch (err) {
    console.error("List files error:", err.message);
    res.status(500).json({ error: "Failed to list files." });
  }
});

export default router;
