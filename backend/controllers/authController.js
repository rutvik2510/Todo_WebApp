const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.register = async(req, res) => {

    try {
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Login user
exports.login = async(req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(500).send(error);
    }
};