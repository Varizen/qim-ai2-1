import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });

export const isProduction = process.env.NODE_ENV === "production";

export const getEnv = (primary, fallback) => process.env[primary] || (fallback ? process.env[fallback] : undefined);

export const hasEnv = (primary, fallback) => !!getEnv(primary, fallback);

export const envStatus = () => {
  const required = [
    { key: "OPENAI_API_KEY", fallback: "OPENAI_KEY" },
    { key: "ADMIN_TOKEN" },
    { key: "FRONTEND_URL" },
  ];
  const optional = [
    { key: "STRIPE_SECRET_KEY", fallback: "STRIPE_KEY" },
    { key: "STRIPE_PRICE_ID" },
    { key: "ELEVENLABS_KEY" },
  ];

  return {
    required: required.map(({ key, fallback }) => ({ key, fallback, present: hasEnv(key, fallback) })),
    optional: optional.map(({ key, fallback }) => ({ key, fallback, present: hasEnv(key, fallback) })),
    healthy: required.every(({ key, fallback }) => hasEnv(key, fallback)),
  };
};

export const assertProductionEnv = () => {
  if (!isProduction) return;

  const missing = envStatus().required
    .filter(({ present }) => !present)
    .map(({ key, fallback }) => (fallback ? `${key} or ${fallback}` : key));

  if (missing.length > 0) {
    throw new Error(`Missing required production environment variables: ${missing.join(", ")}`);
  }
};

export const frontendUrl = () => getEnv("FRONTEND_URL") || "http://localhost:3000";

export const allowedOrigins = () => {
  const origins = new Set([frontendUrl()]);
  if (!isProduction) origins.add("http://localhost:3000");
  return Array.from(origins);
};

assertProductionEnv();
