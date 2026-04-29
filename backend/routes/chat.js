import "../config.js";
import express from "express";
import OpenAI from "openai";
import { getEnv } from "../config.js";

const router = express.Router();
const client = new OpenAI({ apiKey: getEnv("OPENAI_API_KEY", "OPENAI_KEY") });

const MAX_MESSAGE_LENGTH = 8000;
const VALID_MODES = new Set(["general", "professional"]);

const systemPrompts = {
  general: "You are QiM-AI2.1, a wise and patient professor. Teach simply first, then go deeper. Use analogies, examples, and encourage curiosity.",
  professional: "You are QiM-AI2.1 in Professional Mode. Provide structured, research-backed answers. Cite sources when possible, use academic tone, and include references to relevant papers or theories.",
};

router.post("/", async (req, res) => {
  try {
    const { message, mode = "general" } = req.body;

    // Validation
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required and must be a non-empty string" });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(413).json({ error: `Message exceeds ${MAX_MESSAGE_LENGTH} characters` });
    }

    const safeMode = VALID_MODES.has(mode) ? mode : "general";

    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: systemPrompts[safeMode] },
        { role: "user", content: message.trim() },
      ],
      max_tokens: 4096,
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content?.trim() || "";
    if (!reply) {
      return res.status(502).json({ error: "Empty response from AI provider" });
    }

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err.message);
    const status = err.status || 500;
    res.status(status).json({ error: "AI tutor is unavailable. Please try again later." });
  }
});

export default router;
