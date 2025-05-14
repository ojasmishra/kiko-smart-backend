const express = require('express');
const router = express.Router();
const { getWellnessPlan } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/generateplan', authMiddleware, getWellnessPlan);

module.exports = router;
