const express = require('express');
const bcrypt = require('bcrypt');

const LoginRouter = express.Router();

const LoginModel = require('../Models/Login_Auth/LoginModel');

LoginRouter.post('/', async (req, res) => {
    const { user_id, role, password } = req.body;

    try {
        // Find the user based on the provided user_id
        const login = await LoginModel.findOne({ user_id });

        if (login) {
            // Compare the provided password with the hashed password from the database
            const isMatch = await bcrypt.compare(password, login.password);

            if (isMatch) {
                // Login successful
                res.json({
                    status: 'success',
                    message: 'Login successful',
                    isLoggedIn: true,
                    role: login.role,  // Assuming the user's role is stored in the database
                });
            } else {
                // Invalid credentials
                res.json({
                    status: 'error',
                    message: 'Invalid credentials',
                    isLoggedIn: false,
                });
            }
        } else {
            // User not found (Invalid credentials)
            res.json({
                status: 'error',
                message: 'Invalid credentials',
                isLoggedIn: false,
            });
        }
    } catch (error) {
        // Server error
        res.json({
            status: 'error',
            message: 'Server error',
            isLoggedIn: false,
        });
    }
});

module.exports = LoginRouter;
