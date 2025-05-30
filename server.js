const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(`MongoDB Connected ${PORT} and URI is ${process.env.MONGO_URI}`))
.catch(err => console.error('MongoDB Error:', err));
require('./jobs/dailyRecommendationUpdate'); 
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/children', require('./routes/child'));
app.use('/api/ai', require('./routes/ai'));
app.get('/', (req,res)=>{
  res.json("Server is Running")
})


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
