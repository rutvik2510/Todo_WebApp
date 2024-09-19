const Task = require('../models/Task');

// Add Task
exports.addTask = async(req, res) => {
    const { title, description, dueDate, priority } = req.body;
    try {
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            user: req.user.id,
        });
        await task.save();
        res.status(201).json({ message: 'Task added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get User's Tasks
exports.getTasks = async(req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};