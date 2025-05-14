const User = require("../models/User");

exports.addChild = async (req, res) => {
  const { name, age, height, weight, interests } = req.body;
  const userId = req.user.id
  try {
 const parent = await User.findById(userId);
console.log(userId)
 parent.children.push({name, age, height, weight, interests});
 await parent.save();
 const savedChild = {
    name, age, height, weight, interests
 }
    res.status(201).json(savedChild);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add child', error: err.message });
  }
};


exports.getChildren = async (req, res) => {
  const { childId } = req.params;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If childId is present → return one child's full data
    if (childId) {
      const child = user.children.id(childId);
      if (!child) {
        return res.status(404).json({ message: 'Child not found' });
      }
      return res.status(200).json(child);
    }

    // Else → return all children with basic info + childId
    const children = user.children.map(child => ({
      childId: child._id,
      name: child.name,
      age: child.age,
      height: child.height,
      weight: child.weight,
      interests: child.interests
    }));

    res.status(200).json(children);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch children', error: err.message });
  }
};

