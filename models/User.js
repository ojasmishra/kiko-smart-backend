const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: { type: String, required: true, unique: true },
    password: String,

    children: [
      {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        gender: { type: String, enum: ["male", "female"], required: true },
        interests: [{ type: String }],
        recommendation: {
             diet: String,
             extracurricular: String,
             exercise: String
    },

        todayPlan: {
          diet: { type: [String], default: [] },         
          exercise: { type: [String], default: [] }, 
          activities: { type: [String], default: [] },
          date: { type: Date, default: Date.now } 
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
