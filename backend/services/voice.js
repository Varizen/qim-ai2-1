import "../config.js";
import axios from "axios";

export async function generateVoice(text) {
  const res = await axios.post(
    "https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID",
    { text },
    {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_KEY,
      },
    }
  );

  return res.data;
}
