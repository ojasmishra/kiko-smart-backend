const express = require('express');
const router = express.Router();
const { addChild, getChildren } = require('../controllers/childController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addChild);
router.get('/children/:childId', authMiddleware, getChildren);

module.exports = router;
