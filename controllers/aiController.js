// controllers/aiController.js
const generateChatGPTResponse = require("../utils/trainedML");

exports.getWellnessPlan = async (req, res) => {
  
const data = {
  desc: "Generate a daily wellness plan for this child",
  name: "Aryan",
  age: 7,
  height: 120,
  weight: 25,
  interests: ["drawing", "running"]
};

  try {
    const result = await generateChatGPTResponse(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "AI generation failed", error: error.message });
  }
};
