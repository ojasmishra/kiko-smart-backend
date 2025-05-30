const User = require("../models/User");
const generateFlaskRecommendation = require("../utils/flask"); // Import your Flask utility

// ✅ Add Child with AI Recommendation
exports.addChild = async (req, res) => {
  const { name, age, height, weight, interests, gender } = req.body;
  const userId = req.user.id;

  try {
    const parent = await User.findById(userId);
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    // ✅ Call Flask AI service
    const aiResponse = await generateFlaskRecommendation({ age, height, weight, gender });

    // ✅ Push child data including recommendation
    const newChild = {
      name,
      age,
      height,
      weight,
      interests,
      gender,
      recommendation: aiResponse, // will be { diet, exercise, extracurricular }
    };

    parent.children.push(newChild);
    await parent.save();

    res.status(201).json(newChild);
  } catch (err) {
    res.status(500).json({ message: "Failed to add child", error: err.message });
  }
};

// ✅ Get all or one child
exports.getChildren = async (req, res) => {
  const { childId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (childId) {
      const child = user.children.id(childId);
      if (!child) {
        return res.status(404).json({ message: "Child not found" });
      }
      return res.status(200).json(child);
    }

    // All children (with recommendations optional)
    const children = user.children.map(child => ({
      childId: child._id,
      name: child.name,
      age: child.age,
      height: child.height,
      weight: child.weight,
      interests: child.interests,
      recommendation: child.recommendation
    }));

    res.status(200).json(children);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch children", error: err.message });
  }
};
