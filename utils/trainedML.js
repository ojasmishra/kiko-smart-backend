// utils/chatGPT.js
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Sends a prompt to GPT and gets a structured JSON response.
 * @param {Object} data - The input with `desc` and other child fields.
 */
async function generateChatGPTResponse(data) {
  const { desc, ...params } = data;

  const messages = [
    {
      role: "system",
      content: "You are an expert child wellness advisor. Respond in JSON format only.",
    },
    {
      role: "user",
      content: `
Description: ${desc}
Details:
${JSON.stringify(params, null, 2)}

Format:
{
  "dietPlan": { "breakfast": "", "lunch": "", "dinner": "" },
  "exercise": [],
  "extracurricular": []
}
      `,
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const resultText = response.choices[0].message.content.trim();

    // Clean and parse JSON response
    const cleaned = resultText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("❌ ChatGPT API Error:", err);
    throw new Error("AI generation failed");
  }
}

module.exports = generateChatGPTResponse;
