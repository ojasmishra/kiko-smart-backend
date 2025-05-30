  const axios = require("axios");

 const generateFlaskRecommendation = require("../utils/flask");

// This MUST be async
exports.addChildWithAI = async (req, res) => {
  const { name, age, height, weight, interests, gender } = req.body;

  try {
    const aiResponse = await generateFlaskRecommendation({
      age,
      height,
      weight,
      gender,
    });

    // Use aiResponse here (e.g., save to DB)
    res.status(200).json({
      message: "AI recommendation fetched successfully",
      data: aiResponse,
    });

  } catch (error) {
    res.status(500).json({ message: "Error generating AI recommendation", error: error.message });
  }
};