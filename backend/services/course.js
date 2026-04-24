import "../config.js";
import OpenAI from "openai";

export async function generateCourse(syllabusText) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
