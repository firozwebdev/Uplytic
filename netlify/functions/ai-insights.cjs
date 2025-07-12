const { GoogleGenAI } = require("@google/genai");

exports.handler = async function(event, context) {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: "Method Not Allowed"
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: "Invalid JSON"
    };
  }

  const { prompt, logs, stats, cost } = body;

  // Support multiple keys (comma-separated)
  const keys = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "")
    .split(",")
    .map(k => k.trim())
    .filter(Boolean);

  if (!keys.length) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "No Gemini API keys set" })
    };
  }

  const apiUrl = process.env.GEMINI_API_URL;
  const aiPrompt = prompt || `Analyze these API logs and stats: ${JSON.stringify({ logs, stats, cost })}`;

  let lastError;
  for (const apiKey of keys) {
    try {
      const ai = apiUrl
        ? new GoogleGenAI({ apiKey, apiUrl })
        : new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: aiPrompt,
      });

      // If successful, return the result
      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ text: response.text })
      };
    } catch (err) {
      lastError = err;
      // Try next key
    }
  }

  // If all keys fail, return the last error
  return {
    statusCode: 500,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ error: lastError ? lastError.message : "All Gemini API keys failed" })
  };
}; 