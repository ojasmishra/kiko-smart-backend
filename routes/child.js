const express = require('express');
const router = express.Router();
const { addChild, getChildren } = require('../controllers/childController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addchildren', authMiddleware, addChild);
router.get('/children/:childId', authMiddleware, getChildren);

module.exports = router;
