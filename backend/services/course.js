import "../config.js";
import OpenAI from "openai";
import { getEnv } from "../config.js";

export async function generateCourse(syllabusText) {
  const client = new OpenAI({ apiKey: getEnv("OPENAI_API_KEY", "OPENAI_KEY") });

  const res = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content: "Convert syllabus into structured course with modules.",
      },
      { role: "user", content: syllabusText },
    ],
  });

  return res.choices[0].message.content;
}
