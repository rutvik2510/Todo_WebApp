const express = require('express');
const router = express.Router();
const { addTask, getTasks } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addTask);
router.get('/', authMiddleware, getTasks);

module.exports = router;