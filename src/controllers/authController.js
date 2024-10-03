// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ name, email, password });
        await user.save();

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            status: 1,
            data: user,
            token,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            token,
            status: 1,
            data: user
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.list = async (req, res) => {
    try {
        // Get the user ID from the query parameters
        const id = req?.params._id;
        console.log(id, 'req?.query._id');

        let user;
        
        // If an ID is provided, find the specific user by ID
        if (id) {
            user = await User.findOne({ _id: id });
            
            // If user not found, return an error
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        } else {
            // If no ID is provided, fetch all users
            user = await User.find();
        }

        // Send the found user(s) as a response
        res.status(200).json({
            status: 1,
            data: user
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
