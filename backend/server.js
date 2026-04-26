import "./config.js";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import billingRoute from "./routes/billing.js";
import researchRoute from "./routes/research.js";

// Simple auth middleware (replace with Clerk verifyToken in production)
export const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  // Allow admin token or any non-empty token for now (Clerk integration placeholder)
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  req.user = { id: token.slice(0, 12), token };
  next();
};

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

// Memory store for simple AI memory (in-memory, replace with Redis/DB in production)
const memoryStore = new Map();
app.post("/api/memory/save", express.json(), (req, res) => {
  const { userId, data } = req.body;
  if (!userId || !data) return res.status(400).json({ error: "userId and data required" });
  const existing = memoryStore.get(userId) || [];
  existing.push({ ...data, timestamp: new Date().toISOString() });
  memoryStore.set(userId, existing.slice(-50)); // Keep last 50 memories
  res.json({ saved: true });
});
app.post("/api/memory/get", express.json(), (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "userId required" });
  res.json({ memories: memoryStore.get(userId) || [] });
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
