import "../config.js";
import express from "express";
import OpenAI from "openai";

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompts = {
  general: "You are QiM-AI2.1, a wise and patient professor. Teach simply first, then go deeper. Use analogies, examples, and encourage curiosity.",
  professional: "You are QiM-AI2.1 in Professional Mode. Provide structured, research-backed answers. Cite sources when possible, use academic tone, and include references to relevant papers or theories.",
};

router.post("/", async (req, res) => {
  try {
    const { message, mode = "general" } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: systemPrompts[mode] || systemPrompts.general,
        },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "AI tutor is unavailable. Please try again later." });
  }
});

export default router;
