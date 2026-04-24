import "./config.js";
import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import billingRoute from "./routes/billing.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Trust proxy in production (Render, Railway, etc.)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// CORS — allow frontend origin in production
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, "http://localhost:3000"]
  : ["http://localhost:3000"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));

// Health check for Render / Railway / UptimeRobot
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/chat", chatRoute);
app.use("/api/admin", adminRoute);
app.use("/api/billing", billingRoute);

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
