const express = require('express');
const bcrypt = require('bcrypt');
const LoginRouter = express.Router();
const StudentContactInfo = require("../Models/StudentModel/StudentContactInfo");
const FacultyDetails = require('../Models/FacultyDetails');
const TTODetails = require("../Models/TTODetails");
const TPODetails = require("../Models/TPODetails");
const AdminDetails = require("../Models/AdminDetails");
const LoginModel = require('../Models/Login_Auth/LoginModel');
const HODDetails = require('../Models/HODDetails');
const { LocalStorage } = require('node-localstorage');
localStorage = new LocalStorage('./scratch');

LoginRouter.post('/', async (req, res) => {
    const { user_id, role, password } = req.body;
    try {
        // Find the user based on the provided user_id
        const login = await LoginModel.findOne({ user_id });

        if (login) {
            // Compare the provided password with the hashed password from the database
            const isMatch = await bcrypt.compare(password, login.password);

            if (isMatch === true) {
                let email = null;
                
                if (role === 'student') {
                    const Student = await StudentContactInfo.findOne({ student_id: user_id });
                    email = Student.email;
                }
                else if (role === 'faculty') {
                    const Faculty = await FacultyDetails.findOne({ faculty_id: user_id });
                    email = Faculty.faculty_email;
                }
                else if (role === 'tto') {
                    const TTO = await TTODetails.findOne({ tto_id: user_id });
                    email = TTO.tto_email;
                }
                else if (role === 'tpo') {
                    const TPO = await TPODetails.findOne({ tpo_id: user_id });
                    email = TPO.tpo_email;
                }
                else if (role === 'admin') {
                    const Admin = await AdminDetails.findOne({ admin_id: user_id });
                    email = Admin.admin_email;
                }
                else if (role === 'hod') {
                    const HOD = await HODDetails.findOne({ hod_id: user_id });
                    console.log(HOD);
                    email = HOD.hod_email;
                }
                console.log(email);
                // Login successful
                res.json({
                    status: 'success',
                    message: 'Login successful',
                    isLoggedIn: true,
                    role: role,  // Assuming the user's role is stored in the database
                    email: email,
                    id: user_id,
                    password : password,
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
