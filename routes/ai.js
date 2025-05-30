const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const generateFlaskRecommendation = require('../utils/flask');

router.get('/generateplan', authMiddleware, generateFlaskRecommendation );

module.exports = router;
