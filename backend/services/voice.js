import "../config.js";

export async function generateVoice(text) {
  const res = await fetch("https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": process.env.ELEVENLABS_KEY || "",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error(`Voice generation failed with status ${res.status}`);
  }

  return res.arrayBuffer();
}
