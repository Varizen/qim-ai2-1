import "./config.js";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import billingRoute from "./routes/billing.js";
import researchRoute from "./routes/research.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Trust proxy in production (Render, Railway, etc.)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// CORS — allow frontend origin in production
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, "http://localhost:3000"]
  : ["http://localhost:3000"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));

// Request logging
app.use((req, _res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} — ${req.ip}`);
  next();
});

// Global rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

// Stricter rate limit for AI endpoints
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "AI rate limit exceeded. Please slow down." },
});
app.use("/api/chat", aiLimiter);
app.use("/api/admin", aiLimiter);

// Health check for Render / Railway / UptimeRobot / Docker
app.get("/health", async (_req, res) => {
  const checks = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV || "development",
  };

  // Check critical env vars (without exposing values)
  const requiredEnv = ["OPENAI_API_KEY"];
  const optionalEnv = ["STRIPE_SECRET_KEY", "ADMIN_TOKEN"];
  checks.envStatus = {
    required: requiredEnv.map((k) => ({ key: k, present: !!process.env[k] })),
    optional: optionalEnv.map((k) => ({ key: k, present: !!process.env[k] })),
    healthy: requiredEnv.every((k) => !!process.env[k]),
  };

  const statusCode = checks.envStatus.healthy ? 200 : 503;
  res.status(statusCode).json({
    status: checks.envStatus.healthy ? "ok" : "degraded",
    ...checks,
  });
});

app.use("/api/chat", chatRoute);
app.use("/api/admin", adminRoute);
app.use("/api/billing", billingRoute);
app.use("/api/research", researchRoute);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

const server = app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
