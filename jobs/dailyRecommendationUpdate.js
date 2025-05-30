// const cron = require('node-cron');
// const User = require('../models/User');
// const axios = require('axios');

// // Daily job at 6 AM
// cron.schedule('0 6 * * *', async () => {

//   console.log("🔄 Running daily recommendation update...");

//   try {
//     const users = await User.find({});

//     for (const user of users) {
//       for (const child of user.children) {
//         const { age, gender, height, weight } = child;

//         try {
//           const response = await axios.post("https://my-model-flask.onrender.com/recommend", {
            // age,
//             gender,
//             height,
//             weight
//           });

//           child.recommendation = response.data;
//         } catch (err) {
//           console.error(`⚠️ Failed to update child ${child._id}:`, err.message);
//         }
//       }

//       await user.save(); // Save all children updates
//     }

//     console.log("✅ Daily recommendation update completed.");
//   } catch (err) {
//     console.error("❌ Failed to run daily job:", err.message);
//   }
// });
