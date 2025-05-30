const axios = require("axios");

async function generateFlaskRecommendation({ age, height, weight, gender }) {
  const response = await axios.post("https://my-model-flask.onrender.com/recommend", {
    age,
    height,
    weight,
    gender
  });

  return response.data; // { diet: "...", exercise: "...", extracurricular: "..." }
}

module.exports = generateFlaskRecommendation;
